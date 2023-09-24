const connection = require("../databasepg")

exports.customerById = (req, res, next, id) => {
  console.log(id)
  connection.query(`select * from customer where id = ${id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from customer`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.update = (req,res) => {

  var {id, name, email, points, level, password} = {...req.profile, ...req.body}
  connection.query(`update customer set name = '${name}', email = '${email}', password = '${password}' where id = ${id} returning *;`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.updatePoints = (req, res) => {
  var points = req.profile?.points + req.body?.points
  var id = req.profile?.id
  console.log('Update Customer Points')
  connection.query(`update customer set points = ${points} where id = ${id} returning *;`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result })
    } else {
      console.log(err)
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteUser = (req, res) => {
  var id = req.profile.id
  connection.query(`delete from customer where id =${id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
