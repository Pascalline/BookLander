if ((process.env.NODE_ENV) !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, '/public')))

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log("Connected to Mongoose"))

app.use('/', indexRouter)

app.listen(PORT, () => {
   console.log('Server running on PORT ' + PORT);
});