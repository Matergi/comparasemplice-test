/**
 * Questo file si occupa di creare inizialmente uno store dove andare a prendere i dati
 * ed esporre le API
 */

import express from "express";
const app = express()
const port = 3000

import Store from './store';
const store = new Store();

app.get('/report/customer/:id', (req, res) => {
  const { id: pId } = req.params;
  const id = parseInt(pId);
  res.send(store.getCustomer(id, '€'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})