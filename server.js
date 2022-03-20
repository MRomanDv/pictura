const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config({path:'./env/.env'})
const bcrypts = require('bcryptjs')
const path = require('path')


//GET DATA
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//EJS
app.set('view engine', 'ejs')

//STATIC FILES 
app.use('/public',express.static('public'))
app.use('/public',express.static(path.join(__dirname , 'public')))

//COOKIES
app.use(cookieParser())

//ELIMINATE CACHE 
app.use(function(req, res, next) {
    if (!req.user) 
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//ROUTER
const router = require('./routes/router')
app.use('/',router)

//PORT

const port = process.env.PORT || 3000 
app.listen(port,()=> {
    console.log('server on port : ' + port)
})