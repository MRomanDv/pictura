const express = require('express')
const router = express.Router()
//connection
const connection = require('../database/db')
const authControllers = require('../controllers/authController')


//routes views
router.get('', authControllers.Authentication ,(req,res)=>{
    res.render('index',{user:req.user})
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/quizgame', authControllers.Authentication ,(req,res)=>{
    res.render('quizgame',{user:req.user})
})


//routes controller methods

router.post('/login',authControllers.login)

router.post('/register', authControllers.register)

router.get('/logout', authControllers.logout)

module.exports = router