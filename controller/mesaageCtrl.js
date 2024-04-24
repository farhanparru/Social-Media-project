const  Conversation = require('../models/coverstionModal')
const Messages = require('../models/messageModal')


const messageCtrl = {
     createMessage : async (req,res) =>{
        try {
            const {recipient, text, media} = req.body

            if(!recipient || (!text.trim() && media.length === 0)) return ;

            const newConversation = await Conversation.findOneAndUpdate({
                $or: [
                    {recipients: [req.user._id, recipient]},
                    {recipients: [recipient,req.user._id]}

                ]
            },{
                recipients: [req.user._id,recipient],
                text, media
            }, {new: true, upsert: true})

            const newMessage = new Messages({
                conversation: newConversation._id,
                sender: req.user._id,
                recipient, text, media
            })

            await newMessage.save()

           res.json({msg :' Create Success!'})

        } catch (err) {
         return res.status(500).json({msg:err.message})
        }
     }
}

module.exports = messageCtrl