const connection = require("../databasepg")

exports.customerById = (req, res, next, id) => {
  connection.query(`select * from customer where id = ${id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from customer`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.update = (req,res) => {

  var {id, name, email, points, level, password} = {...req.profile, ...req.body}
  connection.query(`update customer set name = '${name}', email = '${email}', password = '${password}' where id = ${id};`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteUser = (req, res) => {
  var id = req.profile.id
  connection.query(`delete from customer where id =${id}`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
