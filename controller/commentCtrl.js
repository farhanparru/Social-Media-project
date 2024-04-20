const Comments = require('../models/commentModel')
const Posts = require('../models/postModel')


const commentCtrl = {
    createComment : async (req,res) =>{
        try {
            const {postId ,  content ,tag , reply } = req.body
         
            const newComment = new Comments({
                user: req.user._id, content, tag,reply
            })

            console.log(newComment);
            await Posts.findOneAndUpdate({_id: postId},{
                 $push:{comments: newComment._id}
              },{new: true})

              await newComment.save()
              res.json({newComment})
          
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateComment : async (req,res) =>{
        try {
           const {content} = req.body

       await Comments.findByIdAndUpdate({
            _id: req.params.id, user: req.user._id
           },{content})

           

           res.json({msg:"update Success!"})
          
        } catch (err) {
        
        }
    },
    likeComment: async (req,res) =>{

        const comment = await Comments.find({_id:req.params.id, likes: req.user._id})
        if(comment.length > 0) return res.status(400).json({msg:"You liked this post"})
        try {
          await Comments.findOneAndUpdate({_id:req.params.id},{
             $push:{likes: req.user._id}
          },{new:true})
      
          res.json({msg: 'Liked Comment!'})
      
        } catch (error) {
          return res.status(500).json({msg:err.message})
        }
      },
      
      unLikeComment: async (req,res) =>{
      
        try {
          await Comments.findOneAndUpdate({_id:req.params.id},{
             $pull:{likes: req.user._id}
          },{new:true})
      
          res.json({msg: 'unLiked Comment!'})
      
        } catch (error) {
          return res.status(500).json({msg:err.message})
        }
      },



}

module.exports = commentCtrl