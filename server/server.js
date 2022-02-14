const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const config = require('./config/db')

// mongoose connect
const mongoose = require('mongoose')
mongoose.connect(config.DB)
  .then(() => console.log('mongodb connected'))
  .catch(error => handleError(error))


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// router
require('./routes/index')(app)
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.status(404).json('404 Not found')
})

const PORT = 4000
app.listen(PORT, () => {
  console.log('Server is running on Port:', PORT)
})
