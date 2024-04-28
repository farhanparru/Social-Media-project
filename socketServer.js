let  users = []

const EditData = (data,id,call)=>{
  const newData = data.map(item =>
    item.id === id ? {...item, call} : item
 )
  return  newData
}

const  SocketServer = (socket) =>{
    // Conncte - Disconncte
    socket.on('joinUser', id =>{  
    users.push({id, socketId: socket.id})
   }) 

   socket.on('disconnect', () =>{  
    users = users.filter(user => user.socketId !== socket.id)
   }) 

   

 //Likes
 socket.on('likePost', newPost =>{  
    const ids = [...newPost.user.followers, newPost.user._id]
      const clients = users.filter(user => ids.includes(user.id))
      if(clients.length > 0){
        clients.forEach(client =>{
             socket.to(`${client.socketId}`).emit('likeToClient',newPost)
        })
      }
   }) 

   socket.on('unlike', newPost =>{  
    const ids = [...newPost.user.followers, newPost.user._id]
      const clients = users.filter(user => ids.includes(user.id))
      if(clients.length > 0){
        clients.forEach(client =>{
             socket.to(`${client.socketId}`).emit('unLikeToClient',newPost)
        })
      }
   }) 

   // Comments
   socket.on('createComment', newPost =>{  
    const ids = [...newPost.user.followers, newPost.user._id]
      const clients = users.filter(user => ids.includes(user.id))

      if(clients.length > 0){
        clients.forEach(client =>{
             socket.to(`${client.socketId}`).emit('createCommentToClient',newPost)
        })
      }
   }) 


   socket.on('deleteComment', newPost =>{  
    const ids = [...newPost.user.followers, newPost.user._id]
      const clients = users.filter(user => ids.includes(user.id))

      if(clients.length > 0){
        clients.forEach(client =>{
             socket.to(`${client.socketId}`).emit('deleteCommentToClient',newPost)
        })
      }
   }) 


   // follow

   socket.on('follow', newUser =>{  
      const user = users.find(user => user.id === newUser._id )
       user && socket.to(`${user.socketId}`).emit('followToClient',newUser)
    
   }) 

   socket.on('unfollow', newUser =>{  
    const user = users.find(user => user.id === newUser._id )
     user && socket.to(`${user.socketId}`).emit('unfollowToClient',newUser)
  
 }) 
    

 // Message
 socket.on('addMessage', msg =>{
     const user = users.find(user => user.id === msg.recipient)
     user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
 })
      

 // Call

 socket.on('callUser',data =>{
  //  console.log({oldUsers: users});
   users = EditData(users, data.sender, data.recipient)

   const client = users.find(user => user.id === data.recipient)
   if(client){
     if(client.call){
      EditData(users, data.sender, null)
      socket.emit('userBusy', data)
     }else{  
      EditData(users, data.recipient, data.sender)
      socket.to(`${client.socketId}`).emit('callUserToClient',data)
     }   
   }
  //  console.log({newUsers: users});
 })
   
 // end Call

 socket.on('endCall', data =>{
   const client = users.find(user => user.id === data.sender)
   if(client){
     socket.to(`${client.socketId}`).emit('endCallToClient', data)
     users = EditData(users, client.id, null)

     if(client.call){
       const clientCall = users.find(user => user.id === client.call)
       clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)

       users = EditData(users,client.call, null)
     }
   }
 })
                  
}

module.exports = SocketServer          