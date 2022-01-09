module.exports = app => {
    const { productController } = require('../controllers')
    app.get('/product', productController.getProduct)
	app.post('/product/create', productController.createProduct)
	app.post('/product/create', productController.updateProduct)
}