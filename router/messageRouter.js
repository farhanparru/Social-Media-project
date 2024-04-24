const router = require('express').Router()
const messageCtrl = require('../controller/mesaageCtrl')
const auth = require('../middleware/auth')


router.post('/message', auth, messageCtrl.createMessage)


module.exports = router