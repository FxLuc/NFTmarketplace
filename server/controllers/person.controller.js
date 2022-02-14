const { Person } = require('../models')

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

const getPerson = (req, res) => {
    Person.findById(req.body.id).then(person => res.status(200).json(person))
}


const signin = (req, res) => {
    Person
        .findById(req.body._id)
        .then(person => {
            if (person) res.status(200).json(person)
            else {
                const newPerson = Person({ _id: req.body._id })
                newPerson.save(err => Person.findById(req.body._id).then(thisNewPerson => res.status(200).json(thisNewPerson)))
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
        const url = req.protocol + '://' + req.get('host')
        req.body.picture = url + '/pictures/avatars/' + req.file.filename
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

module.exports = {
    getPerson,
    signin,
    updateProfile
}