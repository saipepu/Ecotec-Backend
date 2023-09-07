const { Client } = require('pg')

// creating connection
const connection = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: '12345',
  database: 'Ecotec'
})
connection.connect((err) => {
  if(err) throw err;
  console.log('Connected!')
})
module.exports = connection

// connection.query(`Select * from users`, (err, res) => {
//   if(!err) {
//     console.log(res.rows)
//   } else {
//     console.log(err.message);
//   }
// })