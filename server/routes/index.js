module.exports = app => {
    const { itemController, accountController } = require('../controllers')
    app.get('/', (req, res) => res.status(200).json('API Server is working...'))

    app.get('/account', accountController.getAccount)
    app.post('/account', accountController.signin)
    app.post('/account/update/avatar', accountController.updateAvatar)
    app.post('/account/update/name', accountController.updateName)

    app.get('/raw/item/:address', itemController.getRawItem)
    app.get('/item/newest', itemController.getItems)
    app.get('/item', itemController.getItem)
    app.post('/item/create', itemController.createItem)
    app.put('/item/update', itemController.updateItem)
    app.get('/item/search', itemController.searchItem)

}