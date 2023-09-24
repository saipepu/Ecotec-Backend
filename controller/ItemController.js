const connection = require('../databasepg')

exports.getAll = (req, res) => {
  console.log('Getting Store Item.')
  connection.query(`select * from item`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}