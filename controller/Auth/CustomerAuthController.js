const connection = require("../../databasepg")

exports.signUp = (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var points = 0
  var level = 'silver'
  var password = req.body.password

  connection.query(`insert into customer (name, email, points, level, password) values ('${name}', '${email}', '${points}','${level}', ${password})`, (err, result) => {
    if(!err) {
      console.log(result)
      return res.status(200).json({ success: true, message: result })
    } else {
      console.log(err.message)
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.signIn = (req, res) => {
  var password = req.body.password
  var email = req.body.email
  console.log(email, password)
  connection.query(`select * from customer where email = '${email}'`, (err, result) => {
    console.log(result.rows)
    if(!err && result.rows.length > 0) {
      if(password == result?.rows[0]?.password) {
        return res.status(200).json({ success: true, message: 'Sign In Successful!'})
      } else {
        return res.status(200).json({ success: false, message: 'Incorrect Password'})
      }
    } else {
      return res.status(400).json({ success: false, message: 'User with this email does not exist' })
    }
  })
  
}