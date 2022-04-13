module.exports = app => {
    const { itemController, accountController, orderController } = require('../controllers')
    app.get('/', (_req, res) => res.status(200).json('API Server is working...'))

    app.get('/account', accountController.getAccount)
    app.post('/account', accountController.signin)
    app.get('/account/create', accountController.create)
    app.post('/account/update/avatar', accountController.updateAvatar)
    app.post('/account/update/name', accountController.updateName)

    app.get('/raw/item/:address', itemController.getRawItem)
    app.get('/item/newest', itemController.getItems)
    app.get('/item', itemController.getItem)
    app.post('/item/create', itemController.createItem)
    app.get('/item/search', itemController.searchItem)
    app.post('/item/changeprice', itemController.changePrice)

    app.get('/item/my', itemController.getMyItems)
    
    app.get('/order/purchase', orderController.getPurchaseOrder)
    app.get('/order/sales', orderController.getSalesOrder)
    app.put('/order/update', orderController.updateOrder)

    app.post('/item/delivery', orderController.delivery)
    app.put('/item/deliveryto', orderController.setDeliveryTo)
}