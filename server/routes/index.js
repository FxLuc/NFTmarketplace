module.exports = app => {
    const { itemController, personController } = require('../controllers')
    app.get('/', (req, res) => res.status(200).json('API Server is working...'))

    app.post('/signin', personController.signin)
    app.get('/person', personController.getPerson)

    app.get('/item', itemController.getItem)
    app.get('/item/newest', itemController.getItems)
    app.post('/item/create', itemController.createItem)
    app.put('/item/update', itemController.updateItem)
    app.get('/item/search', itemController.searchItem)

}