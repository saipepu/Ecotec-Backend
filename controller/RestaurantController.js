const connection = require("../databasepg")

exports.restaurantId = (req, res, next, id) => {
  connection.query(`select * from restaurant where id = ${id}`, (err, result) => {
    if( err || result.rows.length == 0) return res.status(400).json({ success: false, message: 'No user found'})
    req.profile = result.rows[0]
    next()
  })
}

exports.getAll = (req, res) => {
  connection.query(`select * from restaurant`, (err, result) => {
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

  var name = req.body.name
  var location = req.body.location
  var schedule = req.body.schedule
  var chef_id = req.body.chef_id
  var image = req.body.image

  connection.query(`insert into restaurant (name, location, schedule, chef_id, image) values ('${name}', '${location}', '${schedule}', '${chef_id}', '${image}')`, (err, result) => {
    if(!err) {
      console.log(result)
      return res.status(200).json({ success: true, message: result })
    } else {
      console.log(err.message)
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.update = (req,res) => {

  var {id, name, location, schedule, chef_id, image } = {...req.profile, ...req.body}
  connection.query(`update restaurant set name = '${name}', location = '${location}', schedule = '${schedule}', image='${image}' where id = ${id};`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.deleteRestaurant = (req, res) => {

  var id = req.profile.id
  connection.query(`delete from restaurant where id =${id}`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      return res.status(200).json({ success: true, message: result.rows })
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}
