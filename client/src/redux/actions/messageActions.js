import {GLOBALTYPES} from '../actions/globalTypes'
import {postDataAPI} from '../../utlis/fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE:'ADD_MESSAGE'
}

export const addUser = ({user,message}) => dispatch =>{
    if(message.users.every(item => item._id !== user._id)){
         dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text:'', media: []}})
    }

}

export const addMessage =({msg,auth, socket}) => async (dispatch) =>{
   dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
   try {
    await postDataAPI('message', msg, auth.token)

   } catch (err) {
   dispatch({type: GLOBALTYPES.ALERT, payload:{error: err.response.data.msg}})
    
   }
}