const connection = require("../databasepg")

exports.menuById = (req, res, next, id) => {
  connection.query(`select * from menu where id = ${id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getMenuById = (req, res) => {
  var { menu_id } = req.query
  console.log('Getting menu by id ', menu_id)
  connection.query(`select * from menu where id = ${menu_id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.getAll = (req, res) => {
  console.log("Menu: Getting All Menu.")
  connection.query(`select * from menu`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
exports.getAllMenu = (req, res) => {
  const { restaurant_id } = req.query
  connection.query(`select * from menu where restaurant_id = ${restaurant_id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.create = (req, res) => {

  var name = req.body.name
  var points = req.body.points
  var price = req.body.price
  var image_name = req.body.image_name
  var category_id = req.body.category_id
  var restaurant_id = req.body.restaurant_id

  console.log('Creating Menu')
  connection.query(`insert into menu (name, points, price, image_name, category_id, restaurant_id) values ('${name}', ${points}, ${price}, '${image_name}', ${category_id}, ${restaurant_id});`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.update = (req,res) => {

  var {id, name, points, price, image_name, category_id, restaurant_id } = {...req.profile, ...req.body}
  connection.query(`update menu set name = '${name}', points = ${points}, price = ${price}, image_name='${image_name}', category_id = ${category_id}, restaurant_id = ${restaurant_id} where id = ${id};`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteMenu = (req, res) => {

  var id = req.profile.id
  connection.query(`delete from menu where id =${id}`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}