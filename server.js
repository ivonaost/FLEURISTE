const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
// query koji moramo upisat u mysql workbench
// ALTER USER 'ode_ide_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ode_ide_password'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employeedb'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

// app.get('/api/customers', (req, res) => {
//   // const customers = [
//   //   { id: 1, firstName: 'John', lastName: 'Doe' },
//   //   { id: 2, firstName: 'Brad', lastName: 'Traversy' },
//   //   { id: 3, firstName: 'Mary', lastName: 'Swanson' },
//   // ];

//   // res.json(customers);

//   let sql = 'SELECT * FROM employee';
//   let query = db.query(sql, (err, customers) => {
//     if (err) throw err;
//     console.log(customers);
//     res.json(customers);
//   });
// });

app.get('/api/flowers', (req, res) => {
  let sql = 'SELECT * FROM flowers';
  let query = db.query(sql, (err, flowers) => {
    if (err) throw err;
    console.log(flowers);
    res.json(flowers);
  });
});

app.get('/api/bouquets', (req, res) => {
  let sql = 'SELECT * FROM bouquet';
  let query = db.query(sql, (err, bouquet) => {
    if (err) throw err;
    console.log(bouquet);
    res.json(bouquet);
  });
});


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);