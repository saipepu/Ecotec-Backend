const { getAll, create, update, menuById, deleteMenu, getAllMenu, getMenuById } = require('../controller/MenuController');

const menu = require('express').Router()

menu.get('/getAll', getAll)
menu.get('/getAllMenu', getAllMenu)
menu.get('/getMenuById', getMenuById)
menu.post('/create', create)
menu.put('/update/:menuId', update)
menu.delete('/delete/:menuId', deleteMenu)

menu.param('menuId', menuById)

module.exports = menu;