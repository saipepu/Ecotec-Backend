const connection = require("../../databasepg")

exports.signUp = (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password

  console.log('Sign Up as Chef.')
  connection.query(`insert into chef (name, email, password) values ('${name}', '${email}', ${password})`, (err, result) => {
    if(!err) {
      return res.status(200).json({ success: true, message: result })
    } else {
      return res.status(400).json({ success: false, message: err.message })
    }
  })
}

exports.signIn = (req, res) => {
  var password = req.body.password
  var email = req.body.email
  
  console.log('Sign In as Chef.')
  connection.query(`select * from chef where email = '${email}'`, (err, result) => {
    if(!err && result.rows.length > 0) {
      if(password == result?.rows[0]?.password) {
        return res.status(200).json({ success: true, message: result.rows[0]})
      } else {
        return res.status(200).json({ success: false, message: 'Incorrect Password'})
      }
    } else {
      return res.status(400).json({ success: false, message: 'User with this email does not exist' })
    }
  })
  
}