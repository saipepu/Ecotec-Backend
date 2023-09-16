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
const item = require('./Routes/Item');
const customer_item = require('./Routes/Customer_item');

// const mkdirp = require('mkdirp')
// const uploadDir = './uploads'; // upload path directory
// mkdirp.sync(uploadDir)

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).send('Hello! Welcome to my server.')
})
app.get('/image', (req, res) => {
  console.log('sending image')

  connection.query(`Select * from menu`, (err, result) => {
    if(!err) {
      var src = 'data:image/png;base64,'+result.rows[1].image;
      return res.send(`<img id='imgElem' src=${src} />`)
    } else {
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
app.use('/item', item)
app.use('/customer_item', customer_item)

// auth
app.use('/customer/auth', customerAuth)
app.use('/chef/auth', chefAuth)

// photo
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  res.status(200).send({ success: true, message: imagePath });
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => console.log('Server listens on Port:', port))
