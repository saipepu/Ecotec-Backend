const connection = require("../databasepg")

exports.getAll = (req, res) => {
  connection.query(`select * from category`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}