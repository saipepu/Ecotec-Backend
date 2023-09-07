const connection = require("../databasepg")

exports.orders_itemById = (req, res, next, id) => {

  var allId = id.split('&')
  var order_id = parseInt(allId[0])
  var menu_id = parseInt(allId[1])
  console.log(order_id, menu_id)

  connection.query(`select * from order_item where order_id = ${order_id} and menu_id = ${menu_id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from order_item`, (err, result) => {
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

  var order_id = req.body.order_id
  var menu_id = req.body.menu_id
  var quantity = req.body.quantity
  console.log(req.body, 'here')

  connection.query(`insert into order_item (order_id, menu_id, quantity) values (${order_id}, ${menu_id}, ${quantity});`, (err, result) => {
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

  var {order_id, menu_id, quantity} = {...req.profile, ...req.body}
  connection.query(`update order_item set quantity = ${quantity} where order_id = ${order_id} and menu_id = ${menu_id};`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteOrderItem = (req, res) => {

  console.log(req.profile)
  var { order_id, menu_id } = req.profile 
  connection.query(`delete from order_item where order_id = ${order_id} and menu_id = ${menu_id}`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
