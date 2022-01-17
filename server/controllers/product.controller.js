const { Product } = require('../models')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    },
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
}).single('file')

const getProduct = (req, res) => {
    Product.find().then(products => res.status(200).json(products))
}

const createProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.')
            res.status(500).json({ error: 'A Multer error occurred when uploading.' })
        } else if (err) {
            console.log('An unknown error occurred when uploading: ' + err)
            res.status(500).json({ error: 'An unknown error occurred when uploading: ' + err })
        }
        const url = req.protocol + '://' + req.get('host')
        req.body.img = url + '/img/' + req.file.filename
        const newProduct = new Product(req.body)
        newProduct.save().then(product => {
            res.status(201).json(product)
        }).catch(error => {
            console.log(error)
            res.status(500).json({ error: error })
        })
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