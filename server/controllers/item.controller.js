require('dotenv').config({ path: '../.env' })
const { Item } = require('../models')
const { ItemContractJSON, web3 } = require('./infura.controller')
const multer = require('multer')

// The function should call `callBack` with a boolean to indicate if the file should be accepted
const storage = multer.diskStorage({
    destination: (_req, _file, callBack) => {
        callBack(null, './public/pictures/items/')
    },
    filename: (_req, _file, callBack) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callBack(null, uniqueSuffix)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (_req, file, callBack) => {
        if (file.mimetype == "image/png"
            || file.mimetype == "image/jpg"
            || file.mimetype == "image/jpeg"
        ) {
            callBack(null, true)
        } else {
            console.error('Only .png, .jpg and .jpeg format allowed!')
            callBack(null, false)
        }
    },
    limits: {
        fileSize: (8 * 1024 * 1024) * 10, // 10MB
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

const getItem = (req, res) => {
    Item
        .findById(req.query._id)
        .then(item => res.status(200).json(item))
        .catch(error => res.status(404).json(error))
}

const searchItem = (req, res) => {
    if (req.query.keywords.substring(0, 2) == "0x") searchItemByAddress(req, res)
    else searchItemByName(req, res)
}

function searchItemByName(req, res) {
    Item
        .find(({ name: { $regex: req.query.keywords, $options: 'i' } }))
        .sort('-createdAt')
        .limit(12)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(error => res.status(404).json(error))
}

function searchItemByAddress(req, res) {
    Item
        .findById(req.query.keywords)
        .sort('-createdAt')
        .limit(12)
        .then(items => {
            res.status(200).json([items])
        })
        .catch(error => res.status(404).json(error))
}

const createItem = (req, res) => {
    upload(req, res, _err => {
        try {
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
        } catch {
            console.log('An unknown error occurred when uploading.')
            res.status(415).json({ error: 'An unknown error occurred when uploading.'})
        }
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

module.exports = {
    getRawItem,
    getItem,
    getItems,
    getMyItems,
    createItem,
    searchItem,
    changePrice,
}