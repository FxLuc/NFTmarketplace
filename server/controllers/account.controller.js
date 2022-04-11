require('dotenv').config({ path: '../.env' })
const { Account } = require('../models')
const ethers  = require("ethers")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './public/pictures/avatars/')
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (_req, file, cb) => {
        if (
            file.mimetype == "image/png"
            || file.mimetype == "image/jpg"
            || file.mimetype == "image/jpeg"
        ) cb(null, true)
        else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    },
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
}).single('file')

const getAccount = (req, res) => {
    Account
        .findById(req.body.id)
        .then(account => res.status(200).json(account))
}


const signin = (req, res) => {
    const accountAddress = req.body._id.toLowerCase()
    Account
        .findById(accountAddress)
        .then(account => {
            if (account) res.status(200).json(account)
            else {
                const newAccount = Account({ _id: accountAddress })
                newAccount.save(_ => Account
                    .findById(accountAddress)
                    .then(thisNewAccount => res.status(201).json(thisNewAccount))
                )
            }
        })
}

const updateAvatar = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.')
            res.status(500).json({ error: 'A Multer error occurred when uploading.' })
        } else if (err) {
            console.log('An unknown error occurred when uploading: ' + err)
            res.status(500).json({ error: 'An unknown error occurred when uploading: ' + err })
        }
        const accountAddress = req.body._id.toLowerCase()
        req.body.picture = `http://${process.env.ADDRESS}/pictures/avatars/${req.file.filename}`
        Account
            .findByIdAndUpdate(accountAddress, {
                avatar: req.body.picture
            })
            .exec(error => {
                if (error) {
                    console.log(error)
                    res.status(400).json(error)
                } else res.status(200).json(req.body.picture)
            })
    })
}

const updateName = (req, res) => {
    const accountAddress = req.body._id.toLowerCase()
    Account
        .findByIdAndUpdate(accountAddress, {
            name: req.body.name
        })
        .exec(error => {
            if (error) {
                console.log(error)
                res.status(400).json(error)
            } else res.status(200).json(req.body.name)
        })
}

const updateProfile = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading.')
            res.status(500).json({ error: 'A Multer error occurred when uploading.' })
        } else if (err) {
            console.log('An unknown error occurred when uploading: ' + err)
            res.status(500).json({ error: 'An unknown error occurred when uploading: ' + err })
        }
        const accountAddress = req.body._id.toLowerCase()
        const url = req.protocol + '://' + req.get('host')
        req.body.picture = url + '/pictures/avatars/' + req.file.filename
        console.log(req.body.picture)
        Account
            .findByIdAndUpdate(accountAddress, {
                name: req.body.name,
                externaLink: req.body.externaLink,
                avatar: req.body.picture
            })
            .exec(_ => res.status(200).json('Success'))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    })
}


const create = (_req, res) => {
    const wallet = new ethers.Wallet.createRandom()
    res.status(201).json({
        'address': wallet.address,
        'mnemonic': wallet.mnemonic.phrase,
        'privateKey': wallet.privateKey
    })
}

module.exports = {
    getAccount,
    signin,
    create,
    updateProfile,
    updateAvatar,
    updateName
}