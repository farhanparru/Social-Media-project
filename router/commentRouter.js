const router = require('express').Router()
const commentCtrl = require('../controller/commentCtrl')
const auth = require('../middleware/auth')

router.post('/comment',auth, commentCtrl.createComment)

router.patch('/comment/:id',auth,commentCtrl.updateComment)
router.patch('/comment/:id/like',auth,commentCtrl.likeComment)
router.patch('/comment/:id/unLike',auth,commentCtrl.unLikeComment)

module.exports = router