import moment from 'moment';
import exangeCurrency from './currency.api';

export type TransactionObject = {
  date: moment.Moment;
  currency: string,
  amount: number
}

/**
 * classe che rappresenta la transazione effettuata dal customer
 */
export default class Transaction {
  private date: moment.Moment;
  private amount: number;
  private currency: string;

  constructor(date: string, value: string) {
    this.date = moment(date, "DD-MM-YYYY");
    this.currency = value[0];
    this.amount = parseFloat(value.substr(1, value.length));
  }

  /**
   * dettaglio della transazione
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale
   */
  get = (currency?: string): TransactionObject => {
    const exange = currency && exangeCurrency(this.amount, this.currency, currency);
    if (!currency || !exange || exange === -1) {
      return {
        date: this.date,
        amount: this.amount,
        currency: this.currency,
      };
    }

    return {
      date: this.date,
      amount: exange,
      currency,
    }
  }
}