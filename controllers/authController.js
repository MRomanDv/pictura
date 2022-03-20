const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connection = require('../database/db')
const {promisify} = require('util')
const { json } = require('express')

//REGISTER

exports.register = async(req,res)=> {
    try{
        const {fullname,user,tel,pass} = req.body
        //hashing password
        let passwordHash = await bcrypt.hash(pass,8)
        //MYSQL CONNECTION QUERY
        connection.query('INSERT INTO pictura_users SET ?',{fullname:fullname,user:user,tel:tel,password:passwordHash}, async(error,results)=>{
            if (error) {
                console.log(error)
            }
            res.render('signin',{
                    alert:true,
                    alertTitle:"account created!",
                    alertMessage:"Succesfull Register",
                    alertIcon:"success",
                    showConfirmButton:true,
                    timer:1500,
                    ruta:'login'
            })
        })

    }catch (error) {
        console.log(error)

    }
}

//LOGIN 
exports.login = async (req,res)=> {
    try {
        const {user,pass} = req.body

        if (user && pass) {
            connection.query('SELECT * FROM pictura_users WHERE user = ?', [user],async(error,results)=> {
                if(results.length == 0 || !(await bcrypt.compare(pass, results[0].password))) {
                    res.render('login', {
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"invalid User/password",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'login'
                    })
                }else {
                    //succesfull login
                    const id = results[0].id
                    //create token
                    const token = jwt.sign({id:id},process.env.JWT_SECRETO, {
                        expiresIn:process.env.JWT_TIEMPO_EXPIRA
                    })

                    //cookie
                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly:true
                    }
                    //res cookie to browser
                    res.cookie('jwt',token,cookiesOptions)
                    res.render('login',{
                        alert:true,
                        alertTitle:"Successful log in",
                        alertMessage:"¡WELCOME TO PICTURA!",
                        alertIcon:"success",
                        showConfirmButton:false,
                        timer:1500,
                        ruta:'' 
                    })
                }
            })
        }else {
            res.render('login',{
                alert:true,
                alertTitle:"Warning",
                alertMessage:"Please insert user/password",
                alertIcon:"warning",
                showConfirmButton:true,
                timer:false,
                ruta:'login'
            })

        }

    }catch (error){
        console.log(error)
    }

}

//User Authentication
exports.Authentication = async (req,res,next)=> {
     //verifying cookie exist
     if(req.cookies.jwt) {
         try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRETO)
             connection.query('SELECT * FROM pictura_users WHERE id = ?',[decodificada.id],(error,results)=>{
                 if(!results){
                     return next()
                 }
                 req.user = results[0]
                 return next()
             })
         } catch (error) {
             console.log(error)
         }
     }else {
         res.redirect('/login')
     }
}

//LOGOUT
exports.logout = (req,res)=> {
    res.clearCookie('jwt')
    return res.redirect('/')
}