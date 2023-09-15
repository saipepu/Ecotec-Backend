const connection = require("../databasepg")

exports.orders_itemById = (req, res, next, id) => {

  var allId = id.split('&')
  var order_id = parseInt(allId[0])
  var menu_id = parseInt(allId[1])

  connection.query(`select * from order_item where order_id = ${order_id} and menu_id = ${menu_id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from order_item`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}


exports.getByOrderId = (req, res) => {
  var { orderIds} = req.query
  connection.query(`select * from order_item where order_id in (${orderIds})`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}


exports.create = async (req, res) => {

  try {
    const promises = req.body.map((item) => {
      const { order_id, menu_id, quantity } = item;

      return new Promise((resolve, reject) => {
        connection.query(`insert into order_item (order_id, menu_id, quantity) values (${order_id}, ${menu_id}, ${quantity});`, (err, result) => {
          if(err) {
            reject(err)
          } else {
            resolve(result)
          }
        })
      })
    })
    await Promise.all(promises)
    
    return res.status(200).json({ success: true, message: 'Created Order Items!'})
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message })
  }

}

exports.update = (req, res) => {

  var {order_id, menu_id, quantity} = {...req.profile, ...req.body}
  connection.query(`update order_item set quantity = ${quantity} where order_id = ${order_id} and menu_id = ${menu_id};`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteOrderItem = (req, res) => {

  var { order_id, menu_id } = req.profile 
  connection.query(`delete from order_item where order_id = ${order_id} and menu_id = ${menu_id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
