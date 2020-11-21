import Store from '../store';
const assert = require('assert');
const data = require('./data.test.json');

const store = new Store(data);

describe('Test Report', () => {
    it('transactions customer 1', () => {
        const customer = store.getCustomer(1);
        assert.equal(customer?.transactions.length, 4);
        const transactionsByDay = customer?.transactionsByDay;
        if (!transactionsByDay) {
            assert(false);
            return;
        }
        assert.equal(transactionsByDay.length, 3)
        transactionsByDay.forEach((transaction) => {
            if (transaction.day === "01-04-2015") {
                assert.equal(transaction.transactions.length, 1);
            } else if (transaction.day === "02-04-2015") {
                assert.equal(transaction.transactions.length, 2);
            } else if (transaction.day === "03-04-2015") {
                assert.equal(transaction.transactions.length, 1);
            } else {
                assert(false);
            }
        });
    });
    it('transactions customer 2', () => {
        const customer = store.getCustomer(2);
        assert.equal(customer?.transactions.length, 6);
        const transactionsByDay = customer?.transactionsByDay;
        if (!transactionsByDay) {
            assert(false);
            return;
        }
        assert.equal(transactionsByDay.length, 3)
        transactionsByDay.forEach((transaction) => {
            if (transaction.day === "01-04-2015") {
                assert.equal(transaction.transactions.length, 1);
            } else if (transaction.day === "02-04-2015") {
                assert.equal(transaction.transactions.length, 2);
            } else if (transaction.day === "04-04-2015") {
                assert.equal(transaction.transactions.length, 3);
            } else {
                assert(false);
            }
        });
    });
});