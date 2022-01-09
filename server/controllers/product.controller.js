const { Product } = require('../models')

const getProduct = (req, res) => {
    Product.find().then(products => res.status(200).json(products))
}

const createProduct = (req, res) => {
    const newProduct = new Product(req.body)
    newProduct.save().then(product => {
        res.status(200).json(product)
    }).catch(err => {
        res.status(400).json({ message: err })
    })
}

const updateProduct = (req, res) => {
    Product
        .findByIdAndUpdate(req.body.id, req.body)
        .exec(err =>
            err ? res.status(400).json({ message: err }) : res.status(200).json({ message: 'Update success' })
        )
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
}