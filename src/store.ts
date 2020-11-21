import Customer from './customer';
import Transaction from './transaction';
import dataToImport from './data.json';

type DataImport = {
  customer: number;
  date: string;
  value: string;
}

/**
 * classe che gestisce lo store, in cui ci sono storati tutte le informazioni dei customer e le loro transazioni
 */
export default class Store {
  customers: Array<Customer> = [];

  /**
   * inizializzazione dello store
   * @param dataToInsert i dati da inserire, altrimenti recupera il dump locale
   */
  constructor(dataToInsert: Array<DataImport> = dataToImport) {
    const data = dataToInsert;
    data.forEach(row => {
      let customer = this.customers.find(c => c.getId() === row.customer);

      if (!customer) {
        customer = new Customer(row.customer);
        this.customers.push(customer);
      }

      const transaction = new Transaction(row.date, row.value);
      customer.addTransaction(transaction);
    });
  }

  /**
   * restituisce un certo customer
   * @param customerId id del customer
   * @param currency dichiarare se si vuole in una certa valuta, altrimenti restituisce la valuta originale
   */
  getCustomer = (customerId: number, currency?: string) => {
    const customer = this.customers.find(customer => customer.getId() === customerId);
    if (!customer) {
      return undefined;
    }
    return customer.getReport(currency);
  };
}