const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000
const connection = require('./databasepg');
const customer = require('./Routes/Customer');
const chef = require('./Routes/Chef');
const restaurant = require('./Routes/Restaurant');
const category = require('./Routes/Category');
const menu = require('./Routes/Menu');
const orders = require('./Routes/Orders');
const order_item = require('./Routes/Orders_item');
const customerAuth = require('./Routes/Auth/CustomerAuth');
const chefAuth = require('./Routes/Auth/ChefAuth')
const path = require('path')

// const mkdirp = require('mkdirp')
// const uploadDir = './uploads'; // upload path directory
// mkdirp.sync(uploadDir)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log('hi')
  return res.status(200).send('Hello! Welcome to my server.')
})
app.get('/image', (req, res) => {
  console.log('sending image')

  connection.query(`Select * from menu`, (err, result) => {
    if(!err) {
      console.log(result.rows)
      var src = 'data:image/png;base64,'+result.rows[1].image;
      return res.send(`<img id='imgElem' src=${src} />`)
    } else {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message })
    }
  })
})

app.use('/customer', customer)
app.use('/chef', chef)
app.use('/restaurant', restaurant)
app.use('/category', category)
app.use('/menu', menu)
app.use('/orders', orders)
app.use('/order_item', order_item)

// auth
app.use('/customer/auth', customerAuth)
app.use('/chef/auth', chefAuth)

// photo
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file)
  const imagePath = req.file.path;
  console.log(imagePath)
  res.status(200).send({ success: true, message: imagePath });
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => console.log('Server listens on Port:', port))


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir); // Specify the destination directory
//   },
//   filename: (req, file, cb) => {
//     const uniqueFilename = Date.now()+'-'+file.originalname;
//     cb(null, uniqueFilename);
//   }
// })