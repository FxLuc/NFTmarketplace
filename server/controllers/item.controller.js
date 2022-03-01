const { Item, Order } = require('../models')
require('dotenv').config({path: '../.env'})

const ItemManagerContractJSON = require('../contracts/ItemManager.json')
const OrderContractJSON = require('../contracts/Order.json')
const ItemContractJSON = require('../contracts/Item.json')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/e54ee95b63e5433d9c4ea1898e2295cb"))
var ItemManagerContract, lastBlockNumber, lastItemIndex


// listten Item in chain
(async () => {
    ItemManagerContract = await new web3.eth.Contract(
        ItemManagerContractJSON.abi,
        '0xFAb77aD73c64f0365eE87Bcc063f562Bda0A3Da7'
    )
    lastBlockNumber = await web3.eth.getBlockNumber()
    lastItemIndex = await ItemManagerContract.methods.currentItemIndex().call()
    setInterval(() => {
        web3.eth.getBlockNumber()
            .then(currentBlockNumber => {
                if (currentBlockNumber > lastBlockNumber) {
                    ItemManagerContract.methods.currentItemIndex().call()
                        .then(currentItemIndex => {
                            for (lastItemIndex; currentItemIndex > lastItemIndex; lastItemIndex++) {
                                ItemManagerContract.methods.items(lastItemIndex).call()
                                    .then(sItemStruct => new web3.eth.Contract(ItemContractJSON.abi, sItemStruct._item))
                                    .then(ItemContractInstance => ItemContractInstance.methods.rawDataHash().call()
                                        .then(rawDataHash => {
                                            Item.findOne({ rawDataHash: rawDataHash })
                                                .then(itemhiden => {
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
                                                })
                                                .then(() => {
                                                    Item.findOneAndDelete({ rawDataHash: rawDataHash })
                                                        .exec(error => error ? console.log(error) : console.log(rawDataHash))
                                                })
                                        })
                                    )
                            }
                            if (currentItemIndex == lastItemIndex) {
                                ItemManagerContract.getPastEvents().then(event => {
                                    if (typeof (event[0]) != 'undefined') {
                                        ItemManagerContract.methods.items(event[0].returnValues.itemIndex).call()
                                            .then(sItemStruct => {
                                                Item.findByIdAndUpdate(sItemStruct._item, {
                                                    state: sItemStruct._state,
                                                    order: sItemStruct._order
                                                }).exec(error => {
                                                    if (error) console.log(error)
                                                })
                                                return sItemStruct
                                            })
                                            .then(sItemStruct => {
                                                if (sItemStruct._state == 1) {
                                                    (async () => {
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
                                                        Item.findByIdAndUpdate(await OrderContract.methods.itemContract().call(), {
                                                            hiden: true
                                                        }).exec(error => {
                                                            if (error) console.log(error)
                                                        })
                                                    })()
                                                }
                                                if (sItemStruct._state == 2) {
                                                    (async () => {
                                                        const OrderContract = await new web3.eth.Contract(OrderContractJSON.abi, sItemStruct._order)
                                                        Item.findByIdAndUpdate(await OrderContract.methods.itemContract().call(), {
                                                            owner: (await OrderContract.methods.purchaser().call()).toLowerCase(),
                                                            hiden: false
                                                        }).exec(error => {
                                                            if (error) console.log(error)
                                                        })
                                                    })()
                                                }
                                            })
                                    }
                                })
                            }
                        })
                    lastBlockNumber = currentBlockNumber
                }
            })
    }, 1000)
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