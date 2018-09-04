const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_TAX_QUERY = 'SELECT * FROM tax';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpasswordgiven',
  database: 'react_sql'
});

connection.connect(err => {
  if(err) {
    return err;
  }
});


app.use(cors());

app.get('/', (req, res) => {
  res.send('go to /tax to see tax data')
});

app.get('/tax/add', (req, res) => {
  const {name, price, date } = req.query;
  const INSERT_TAX_QUERY = `INSERT INTO tax (name, price, date) VALUES('${name}', ${price},'${date}')`;
  connection.query(INSERT_TAX_QUERY, (err,results) => {
    if(err) {
      return res.send(err)
    }
    else {
     return res.send('successfully added tax')
    }
  });
});

app.get('/tax', (req,res) => {
  connection.query(SELECT_ALL_TAX_QUERY, (err,results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data:results
      })
    }
  });
});

app.get('/tax', (req, res) => {

});

app.listen(4000, () => {
  console.log('taxserver listening on port 4000')

});
