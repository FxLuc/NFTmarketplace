

const { Item } = require('../models')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/pictures/items/')
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

const getItem = (req, res) => {
    Item.find({id: req.body.id }).then(item => res.status(200).json(item))
}

const getItems = (req, res) => {
    Item.find().sort('-createdAt').limit(10).then(items => res.status(200).json(items))
}

const searchItem = (req, res) => {
    Item.find(({ name: { $regex: req.body.name, $options: 'i' }})).sort('-createdAt').limit(10).then( items => {
        res.status(200).json(items)
    })
}

const createItem = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.')
            res.status(500).json({ error: 'A Multer error occurred when uploading.' })
        } else if (err) {
            console.log('An unknown error occurred when uploading: ' + err)
            res.status(500).json({ error: 'An unknown error occurred when uploading: ' + err })
        }
        const url = req.protocol + '://' + req.get('host')
        req.body.picture = url + '/pictures/items/' + req.file.filename
        console.log(req.body.picture)
        const newItem = new Item(req.body)
        newItem.save().then(product => {
            res.status(201).json(product)
        }).catch(error => {
            console.log(error)
            res.status(500).json({ error: error })
        })
    })
}

const updateItem = (req, res) => {
    Item
        .findByIdAndUpdate(req.body._id, {
            state: req.body.state,
            purchaser: req.body.purchaser
        })
        .exec(err =>
            err ? res.status(500).json(err) : Item.findById(req.body._id).then(product => res.status(201).json(product))
        )
}

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    searchItem
}