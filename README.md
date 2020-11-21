# Installazione
### Con Docker

comandi per installarlo:
```sh
docker-compose run node npm install
docker-compose up
```
e dopo aprire http://0.0.0.0:3000/report/customer/1
rotta di riferimento: http://0.0.0.0:3000/report/customer/{idCustomer}

#### Test
```sh
docker-compose run node npm run test
```

### Senza Docker

```sh
npm install
npm run start:dev
```

e dopo aprire http://0.0.0.0:3000/report/customer/1
rotta di riferimento: http://0.0.0.0:3000/report/customer/{idCustomer}

#### Test
```sh
npm run test
```

# Progetto

il progetto è stato construito con express e si trova sotto la cartella **src/** e il main file è server.ts, in modo da creare una REST API.
per quanto riguarda i dati di test ho trasformato il file **data.csv** in **data.json** perché mi era molto piu comodo un file json in typescript.

# Test

i test sono stati scritti con jest https://jestjs.io/ e si torvano sotto la cartella **src/test/** non era chiarissimo quali test era necessario eseguire, quindi ho fatto 2 banali test per customer, andando ad inizializzare lo store con un dump di dati per test e controllando le risposte, in modo da capire se lo store funzioni correttamente