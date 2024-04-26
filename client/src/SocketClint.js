import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {POST_TYPES} from './redux/actions/postAction'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { MESS_TYPES } from './redux/actions/messageActions'

const SocketClint = () => {
 const {auth,socket} = useSelector(state => state)
 const dispatch = useDispatch()

// joinUser
  useEffect(()=>{
    socket.emit('joinUser', auth.user._id)
  },[socket,auth.user._id])


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
           })
          
               return () => socket.off('addMessageToClient')
            },[socket,dispatch,auth])
    





    

  return <></>
}

export default SocketClint
