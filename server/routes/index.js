module.exports = app => {
    const { itemController, accountController } = require('../controllers')
    app.get('/', (req, res) => res.status(200).json('API Server is working...'))

    app.get('/account', accountController.getAccount)
    app.post('/account', accountController.signin)
    app.post('/account/update/avatar', accountController.updateAvatar)
    app.post('/account/update/name', accountController.updateName)

    app.get('/raw/item/:address', itemController.getRawItem)
    app.get('/item/newest', itemController.getItems)
    app.get('/item/my', itemController.getMyItems)
    app.get('/item', itemController.getItem)
    app.post('/item/create', itemController.createItem)
    app.get('/item/search', itemController.searchItem)

    app.get('/order/my', itemController.getMyOrders)
    app.get('/order/sold', itemController.getMySolds)
    app.put('/order/update', itemController.updateOrder)

    app.post('/item/delivery', itemController.delivery)
}