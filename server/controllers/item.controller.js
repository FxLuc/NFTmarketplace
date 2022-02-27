const { Item, Order } = require('../models')
require('dotenv').config({ path: '../.env' })

const ItemManagerContractJSON = require('../contracts/ItemManager.json')
const OrderContractJSON = require('../contracts/Order.json')
const ItemContractJSON = require('../contracts/Item.json')
const Web3 = require('web3')
var web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WS_ENDPOINT))
console.log(`Listening Infura Websocket provider: ${process.env.INFURA_WS_ENDPOINT}`)
var ItemManagerContract

// listenning Item manager contract event
(async () => {
    ItemManagerContract = await new web3.eth.Contract(
        ItemManagerContractJSON.abi,
        process.env.ITEM_MANAGER_ADDRESS
    )
    console.log(`Item manager Smart contract address: ${process.env.ITEM_MANAGER_ADDRESS}`)

    ItemManagerContract.events.ItemStateChanged().on('data', async event => {
        const lastItemIndex = await ItemManagerContract.methods.currentItemIndex().call()

        //  Item created
        if (event.returnValues.state == 0 && event.returnValues.itemIndex == (lastItemIndex - 1)) {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call()
                .then(sItemStruct => new web3.eth.Contract(ItemContractJSON.abi, sItemStruct._item))
                .then(ItemContractInstance => ItemContractInstance.methods.rawDataHash().call()
                    .then(rawDataHash => {
                        //  add item to database include raw data hash
                        Item.findOne({ rawDataHash: rawDataHash }).then(itemhiden => {
                            const newItem = new Item({
                                _id: ItemContractInstance._address,
                                name: itemhiden.name,
                                price: itemhiden.price,
                                owner: itemhiden.owner.toLowerCase(),
                                description: itemhiden.description,
                                specifications: itemhiden.specifications,
                                externalLink: itemhiden.externalLink,
                                rawDataHash: rawDataHash,
                                picture: itemhiden.picture,
                                hiden: false
                            })
                            newItem.save()
                        }).then(() => {
                            // delete old item data
                            Item.findOneAndDelete({ rawDataHash: rawDataHash })
                                .exec(error => {
                                    if (error) {
                                        console.log(error)
                                    }
                                })
                        })
                    })
                ).catch(error => console.log(error))
        }

        // listen Item sold event
        if (event.returnValues.state == 1) {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call().then(sItemStruct => {
                // change item state and hide item
                Item.findByIdAndUpdate(sItemStruct._item, {
                    state: sItemStruct._state,
                    order: sItemStruct._order,
                    hiden: true
                }).exec(error => {
                    if (error) {
                        console.log(error)
                    } else {
                        (async () => {
                            // save order object in the database
                            const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, sItemStruct._order)
                            const newOrder = new Order({
                                _id: OrderContract._address,
                                price: await OrderContract.methods.getBalance().call(),
                                seller: (await OrderContract.methods.seller().call()).toLowerCase(),
                                deadline: await OrderContract.methods.getDeadline().call(),
                                itemContract: await OrderContract.methods.itemContract().call(),
                                purchaser: (await OrderContract.methods.purchaser().call()).toLowerCase(),
                            })
                            newOrder.save()
                        })()
                    }
                })
            })
        }

        // listen Item delivered event
        if (event.returnValues.state == 2) {
            ItemManagerContract.methods.items(event.returnValues.itemIndex).call().then(sItemStruct => {
                (async () => {
                    // change ownership and show item
                    const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, sItemStruct._order)
                    Item.findByIdAndUpdate(await OrderContract.methods.itemContract().call(), {
                        owner: (await OrderContract.methods.purchaser().call()).toLowerCase(),
                        hiden: false
                    }).exec(error => {
                        if (error) console.log(error)
                    })
                })()
            })
        }
    })
})()

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
    Order.find({
        $or: [
            { purchaser: req.query._id },
            { seller: req.query._id }
        ]
    })
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

const delivery = (req, res) => {
    Order
        .findByIdAndUpdate(req.body.id, {
            now: req.body.now,
        })
        .exec(err =>
            err ? res.status(500).json(err) : Order.findById(req.body.id).select('now from to').then(order => res.status(201).json(order))
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
    searchItem,
    delivery
}