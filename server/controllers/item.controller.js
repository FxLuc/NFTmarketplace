const { Item, Order } = require('../models')

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

const getRawItem = (req, res) => {
    Item.findById(req.params.address)
        .select('-_id name description specifications externalLink picture')
        .then(item => res.status(200).json(item))
        .catch(error => res.status(404).json(error))
}

const getItems = (req, res) => {
    Item.find().sort('-createdAt').where({ hiden: false }).select('name picture price owner').limit(12).then(items => res.status(200).json(items))
}

const getMyItems = (req, res) => {
    Item.find().sort('-createdAt').where({ owner: req.query._id }).select('name picture price owner').limit(12).then(items => res.status(200).json(items))
}

const getMyOrders = (req, res) => {
    Order.find({ purchaser: req.query._id })
        .sort('-createdAt').limit(12)
        .populate('itemContract')
        .then(items => {
            res.status(200).json(items)
        })
}

const getMySolds = (req, res) => {
    Order.find({ seller: req.query._id })
        .sort('-createdAt').limit(12)
        .populate('itemContract')
        .then(items => {
            res.status(200).json(items)
        })
}


const getItem = (req, res) => {
    Item.findById(req.query._id).then(item => res.status(200).json(item)).catch(error => res.status(404).json(error))
}

const searchItem = (req, res) => {
    Item.find(({ name: { $regex: req.body.name, $options: 'i' } })).sort('-createdAt').limit(10).then(items => {
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
        req.body._id = req.file.filename.substring(0, 41)
        const newItem = new Item(req.body)
        newItem
            .save()
            .then(item => {
                // return soliditySha3 data
                Item
                    .findById(item._id)
                    .select('-_id name description specifications externalLink picture')
                    .then(rawDataHash => {
                        Item
                            .findByIdAndUpdate(item._id, {
                                rawDataHash: rawDataHash
                            }).exec(error => error ? res.status(500).json(error) : res.status(201).json(rawDataHash))
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(500).json({ error: error })
                    })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: error })
            })
    })
}

const updateOrder = (req, res) => {
    Order
        .findByIdAndUpdate(req.body._id, {
            state: req.body.state,
            deadline: req.body.deadline
        })
        .exec(err =>
            err ? res.status(500).json(err) : Order.findById(req.body._id).then(order => res.status(201).json(order))
        )
}

module.exports = {
    getRawItem,
    getItem,
    getItems,
    getMyItems,
    getMyOrders,
    getMySolds,
    createItem,
    updateOrder,
    searchItem
}