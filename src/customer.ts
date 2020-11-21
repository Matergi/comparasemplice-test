import Transaction from './transaction';
import type {TransactionObject} from './transaction';

type TransactionByDay = {
  day: string;
  transactions: Array<Transaction>,
  total: Array<Total>
}

type Total = {
  currency: string;
  amount: number
}

/**
 * Classe che rappresenta il customer
 */
export default class Customer {
  private id: number;
  private transactions: Array<Transaction> = [];

  constructor(id: number) {
    this.id = id;
  }

  /**
   * aggiunge la transazione al customer
   * @param transaction la transazione
   */
  addTransaction = (transaction: Transaction) => {
    this.transactions.push(transaction);
  }

  /**
   * restituisce tutte le transazioni
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale 
   */
  private getTransactions = (currency?: string) => this.transactions.map(transaction => transaction.get(currency))

  /**
   * restituisce tutte le trasazioni raggruppate per giorno
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale
   */
  private getTransactionsByDay = (currency?: string): Array<TransactionByDay> => this.getTransactions(currency).reduce((arrayOfDays: Array<TransactionByDay>, transaction) => {
    const day = transaction.date.format('DD-MM-YYYY');
    const dayExists = arrayOfDays.find((row: TransactionByDay) => row.day === day);
    if (!dayExists) {
      let dayObject = { day, transactions: [], total: [] };
      arrayOfDays.push(dayObject);
    }

    return arrayOfDays.map((dayObject: any) => {
      if (dayObject.day === day) {
        dayObject.transactions.push(transaction);
        return {
          ...dayObject,
          total: dayObject.transactions.reduce((accTotal: any, transactionTotal: TransactionObject) => this.groupTotal(accTotal, transactionTotal.currency, transactionTotal.amount), []),
        };
      }

      return dayObject;
    });
  }, []);

  /**
   * restituisce l'id del customer
   */
  getId = () => this.id;

  /**
   * restituisce il totale delle transazioni
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale
   */
  private getTotal = (currency?: string) => this.getTransactions(currency).reduce((acc: Array<Total>, transaction) => this.groupTotal(acc, transaction.currency, transaction.amount), [])

  /**
   * raggruppa tutte le transazioni in currency
   * @param accantonamento array dei gruppi delle valute
   * @param currecy la vluta
   * @param amount il valore della transazione
   */
  private groupTotal = (accantonamento: Array<Total>, currecy: string, amount: number) => {
    const currencyExists = accantonamento.find((row: Total) => row.currency === currecy)
    if (!currencyExists) {
      accantonamento.push({
        currency: currecy,
        amount: 0
      })
    }

    return accantonamento.map((row: Total) => {
      if (row.currency === currecy) {
        return {
          ...row,
          amount: row.amount + amount
        }
      }

      return row;
    });
  }

  /**
   * restituisce il report del customer
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale
   */
  getReport = (currency?: string) => ({
    id: this.id,
    total: this.getTotal(currency),
    transactions: this.getTransactions(currency),
    transactionsByDay: this.getTransactionsByDay(currency)
  })
}