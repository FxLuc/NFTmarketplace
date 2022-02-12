module.exports = app => {
    const { itemController } = require('../controllers')
    app.get('/', (req, res) => res.status(200).json('API Server is working...'))

    app.get('/items', itemController.getItems)
    app.post('/item/create', itemController.createItem)
    app.post('/item/update', itemController.updateItem)
    app.post('/item/search', itemController.searchItem)

}