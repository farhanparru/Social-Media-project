import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {POST_TYPES} from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { MESS_TYPES } from './redux/actions/messageActions'

const SocketClint = () => {
 const {auth,socket,call,online} = useSelector(state => state)
 const dispatch = useDispatch()

// joinUser
  useEffect(()=>{
    socket.emit('joinUser', auth.user)
  },[socket,auth.user])


  // Likes
  useEffect(()=>{
    socket.on('likeToClient',newPost =>{
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) 
       })

       return () => socket.off('likeToClient')
    },[socket,dispatch])


    useEffect(()=>{
        socket.on('unLikeToClient',newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) 
           })
    
           return () => socket.off('unLikeToClient')
   },[socket,dispatch])

   // Comment
   useEffect(()=>{
    socket.on('createCommentToClient',newPost =>{
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) 
       })
  
       return () => socket.off('createCommentToClient')
    },[socket,dispatch])


    useEffect(()=>{
        socket.on('deleteCommentToClient',newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) 
           })
      
           return () => socket.off('deleteCommentToClient')
        },[socket,dispatch])
    
   // Follow

   useEffect(()=>{
    socket.on('followToClient',newUser =>{
        dispatch({type: GLOBALTYPES.AUTH, payload:{...auth, user: newUser}}) 
       })
  
       return () => socket.off('followToClient')
    },[socket,dispatch,auth])


    useEffect(()=>{
        socket.on('unfollowToClient',newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload:{...auth, user: newUser}}) 
           })
      
           return () => socket.off('unfollowToClient')
        },[socket,dispatch,auth])


        // message
        useEffect(()=>{
            socket.on('addMessageToClient',msg =>{
                dispatch({type:MESS_TYPES.ADD_MESSAGE, payload: msg})
                
                dispatch({
                    type: MESS_TYPES.ADD_USER, 
                    payload: {
                    ...msg.user, 
                     text: msg.text,
                     media: msg.media
                  }
                })
           })
          
               return () => socket.off('addMessageToClient')
            },[socket,dispatch,auth])
    
 // Call User
 useEffect(()=>{
    socket.on('callUserToClient',data =>{
        dispatch({type:GLOBALTYPES.CALL, payload: data})
   })
  
       return () => socket.off('callUserToClient')
    },[socket,dispatch,auth])


    useEffect(()=>{
        socket.on('userBusy',data =>{
            console.log(data);
            dispatch({type:GLOBALTYPES.ALERT, payload:{error:`${call.username} is busy!..`}})
       })
           return () => socket.off('userBusy')
        },[socket,dispatch,call])
    


// Check User Online / Offline
useEffect(() => {
    socket.emit('checkUserOnline', auth.user)
},[socket, auth.user])

useEffect(() => {
    socket.on('checkUserOnlineToMe', data =>{
        data.forEach(item => {
            if(!online.includes(item.id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: item.id})
            }
        })
    })

    return () => socket.off('checkUserOnlineToMe')
},[socket, dispatch, online])
//----------------------------------------
    
    useEffect(() => {
        socket.on('checkUserOnlineToClient',id =>{
           if(!online.includes(id)){
             dispatch({type: GLOBALTYPES.ONLINE, payload: id})
           }
        })

        return () => socket.off('checkUserOnlineToClient')
    },[socket, dispatch, online])

        // Check user Offline
        useEffect(() => {
            socket.on('CheckUserOffline',id =>{
              dispatch({type: GLOBALTYPES.OFFLINE,payload: id})
            })
    
            return () => socket.off('CheckUserOffline')
        },[socket, dispatch])
        
    

  return <></>
}

export default SocketClint
 