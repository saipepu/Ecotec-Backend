const connection = require("../databasepg")

exports.ordersById = (req, res, next, id) => {
  connection.query(`select * from orders where id = ${id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No id found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from orders`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.create = (req, res) => {

  var total_amount = req.body.total_amount
  var total_points = req.body.total_points
  var pickup_time = req.body.pickup_time
  console.log(req.body, 'here')

  connection.query(`insert into orders (total_amount, total_points, pickup_time) values (${total_amount}, ${total_points}, '${pickup_time}');`, (err, result) => {
    if(!err) {
      console.log(result)
      return res.status(200).json({ success: true, message: result })
    } else {
      console.log(err.message)
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.update = (req, res) => {

  var {id, total_amount, total_points, pickup_time} = {...req.profile, ...req.body}
  connection.query(`update orders set total_amount = ${total_amount}, total_points = ${total_points}, pickup_time = '${pickup_time}' where id = ${id};`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteOrders = (req, res) => {

  var id = req.profile.id
  connection.query(`delete from orders where id =${id}`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}