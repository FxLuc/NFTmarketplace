require('dotenv').config({ path: '../.env' })
const { Item, Order } = require('../models')
const { OrderContractJSON, ItemContractJSON, web3 } = require('./infura.controller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './public/pictures/items/')
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
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

const getItems = (_req, res) => {
    Item
        .find({ state: 0 })
        .sort('-createdAt')
        .select('name picture price owner')
        .limit(12)
        .then(items => res.status(200).json(items))
        .catch(error => res.status(404).json(error))
}

const getMyItems = (req, res) => {
    Item
        .find({ owner: req.query._id })
        .where({ state: { $ne: 4 } })
        .sort('-createdAt')
        .select('name picture price owner')
        .limit(12)
        .then(items => res.status(200).json(items))
        .catch(error => res.status(404).json(error))

}

const getPurchaseOrder = (req, res) => {
    Order
        .find({ purchaser: req.query._id })
        .sort('-createdAt')
        .limit(12)
        .populate('itemContract', '_id name picture price owner')
        .then(items => res.status(200).json(items))
        .catch(error => res.status(404).json(error))
}

const getSalesOrder = (req, res) => {
    Order
        .find({ seller: req.query._id })
        .sort('-createdAt')
        .limit(12)
        .populate('itemContract', '_id name picture price owner')
        .then(items => res.status(200).json(items))
}


const getItem = (req, res) => {
    Item
        .findById(req.query._id)
        .then(item => res.status(200).json(item))
        .catch(error => res.status(404).json(error))
}

const searchItem = (req, res) => {
    Item
        .find(({ name: { $regex: req.query.keywords, $options: 'i' } }))
        .sort('-createdAt')
        .limit(12)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(error => res.status(404).json(error))
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
        req.body.picture = `http://${process.env.ADDRESS}/pictures/items/${req.file.filename}`
        req.body._id = req.file.filename.substring(0, 41)
        const newItem = new Item(req.body)
        newItem
            .save()
            .then(item => {
                // return soliditySha3 data
                Item
                    .findById(item._id)
                    .select('-_id name description specifications externalLink picture')
                    .then(itemRawData => web3.utils.soliditySha3(itemRawData))
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

const updateOrder = async (req, res) => {
    const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, req.body._id)
    const orderState = await OrderContract.methods.state().call()
    const orderDealine = await OrderContract.methods.getDeadline().call()
    Order
        .findByIdAndUpdate(req.body._id, {
            state: orderState,
            deadline: orderDealine
        })
        .exec((err, data) => {
            if (err) res.status(500).json(err)
            else res.status(201).json(data)
        })
}

const changePrice = async (req, res) => {
    const ItemContract = await new web3.eth.Contract(
        ItemContractJSON.abi,
        req.body._id
    )
    const ItemPrice = await ItemContract.methods.price().call()
    Item
        .findByIdAndUpdate(req.body._id, { price: ItemPrice })
        .exec(err => err ? res.status(500).json(err) : res.status(201).json(ItemPrice))
}

const delivery = (req, res) => {
    Order
        .findById(req.body.id)
        .select('nowIn')
        .then(orderNowIn => {
            if (orderNowIn.nowIn === 'Nowhere') {
                Order
                    .findByIdAndUpdate(req.body.id, {
                        from: req.body.nowIn,
                        nowIn: req.body.nowIn
                    })
                    .exec(err =>
                        err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
                    )
            } else {
                Order
                    .findByIdAndUpdate(req.body.id, {
                        nowIn: req.body.nowIn,
                    })
                    .exec(err =>
                        err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
                    )
            }
        })
}

const setDeliveryTo = async (req, res) => {
    Order
        .findByIdAndUpdate(req.body.id, {
            to: req.body.to,
        })
        .exec(err =>
            err ? res.status(500).json(err) : Order.findById(req.body.id).select('nowIn from to').then(order => res.status(201).json(order))
        )
}


module.exports = {
    getRawItem,
    getItem,
    getItems,
    getMyItems,
    getPurchaseOrder,
    getSalesOrder,
    createItem,
    updateOrder,
    searchItem,
    changePrice,
    delivery,
    setDeliveryTo
}