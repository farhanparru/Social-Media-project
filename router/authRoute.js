const router = require('express').Router()
const authCtrl = require('../controller/authController')

router

.post('/register',authCtrl.register)
.post('/login',authCtrl.login)
.post('/logout',authCtrl.logout)
.post('/refresh_token',authCtrl.generateAccessToken)

.post('/sendpasswordlink',authCtrl.sendpasswordlink)              
.get('/forgotpassword/:id/:token',authCtrl.forgotpassword)
.post('/:id/:token',authCtrl.changePassword)

                


module.exports = router