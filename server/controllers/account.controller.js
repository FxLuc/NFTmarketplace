const { Account } = require('../models')

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/pictures/avatars/')
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

const getAccount = (req, res) => {
    Account.findById(req.body.id).then(account => res.status(200).json(account))
}


const signin = (req, res) => {
    const accountAddress = req.body._id.toUpperCase()
    Account
        .findById(accountAddress)
        .then(account => {
            if (account) res.status(200).json(account)
            else {
                const newAccount = Account({ _id: accountAddress })
                newAccount.save(Account.findById(accountAddress).then(thisNewAccount => res.status(201).json(thisNewAccount)))
            }
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
        const accountAddress = req.body._id.toUpperCase()
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

module.exports = {
    getAccount,
    signin,
    updateProfile
}