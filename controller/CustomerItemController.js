const connection = require('../databasepg')

exports.getItemByCustomerId = (req, res) => {
  const customer_id = req.profile?.id
  console.log('Getting Item by Customer Id', customer_id)
  connection.query(`select * from customer_item where customer_id = ${customer_id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.create = (req, res) => {

  const customer_id = req.body?.customer_id
  const item_id = req.body?.item_id

  console.log('Customer Buy an Item', customer_id, item_id)
  connection.query(`insert into customer_item (customer_id, item_id) values (${customer_id}, ${item_id})`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}