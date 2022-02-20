const { Item } = require('../models')

const ItemManagerContractJSON = require('../contracts/ItemManager.json')
const ItemContractJSON = require('../contracts/Item.json')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var ItemManagerContract, ItemContract, lastBlockNumber, lastItemIndex

(async () => {
    const networkId = await web3.eth.net.getId()
    ItemManagerContract = await new web3.eth.Contract(
        ItemManagerContractJSON.abi,
        ItemManagerContractJSON.networks[networkId] && ItemManagerContractJSON.networks[networkId].address,
    )
    lastBlockNumber = await web3.eth.getBlockNumber()
    lastItemIndex = await ItemManagerContract.methods.currentItemIndex().call()
    setInterval(() => {
        web3.eth.getBlockNumber()
            .then(currentBlockNumber => {
                if (currentBlockNumber > lastBlockNumber) {
                    // ItemManagerContract.getPastEvents().then(event => {
                    //     ItemManagerContract.methods.items(event[0].returnValues.itemIndex).call().then(sItemStruct => console.log(sItemStruct._item))
                    // })
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
                                                        owner: itemhiden.owner,
                                                        description: itemhiden.description,
                                                        specifications: itemhiden.specifications,
                                                        externalLink: itemhiden.externalLink,
                                                        rawDataHash: rawDataHash,
                                                        hiden: false
                                                    })
                                                    newItem.save()
                                                })
                                                .then(() => {
                                                    Item.findOneAndDelete({ rawDataHash: rawDataHash })
                                                    .exec(error => error ? console.log(error) : console.log('done'))
                                                })

                                        })
                                    )
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
    Item.findById(req.params.address).select({ _id: 0, owner: 0, purchaser: 0, updatedAt: 0, rawDataHash: 0, hide: 0, __v: 0 }).then(item => res.status(200).json(item))
}

const getItems = (req, res) => {
    Item.find().sort('-createdAt').where({ hide: false }).limit(10).then(items => res.status(200).json(items))
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
                Item
                    .findById(item._id)
                    .select({ _id: 0, owner: 0, purchaser: 0, updatedAt: 0, rawDataHash: 0, hide: 0, __v: 0 })
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
    getRawItem,
    getItems,
    createItem,
    updateItem,
    searchItem
}