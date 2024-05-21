import { GLOBALTYPES } from "../actions/globalTypes"
import { postDataAPI } from "../../utlis/fetchData"
import { getDataAPi } from "../../utlis/fetchData"
import valid from "../../utlis/valid"




export const login = (data)=>async (dispatch) => {
   try{
    dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
    const res = await postDataAPI('login',data)
    console.log( res,"haiii");
    dispatch({
      type:GLOBALTYPES.AUTH,
      payload:{
      token:res.data.access_token,
      user: res.data.user
  }
})
    localStorage.setItem("firstlogin",true)
    dispatch({
    type:GLOBALTYPES.ALERT,
    payload:{
    success:res.data.msg
    }
  })

   }catch(err){    
   
  
    dispatch({       
     type:GLOBALTYPES.ALERT,
     payload:{
      error: err.response.data.msg
    }        
    })
   }
 }


// Request failed with status code 400
 export const refreshToken = () => async(dispatch)=>{
  const firstlogin = localStorage.getItem("firstlogin")
  
  if(firstlogin){
      dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
      try{
        const res = await postDataAPI('refresh_token')
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
              token: res.data.access_token,
              user: res.data.user
          }
      });
      dispatch({type:GLOBALTYPES.ALERT,payload:{} })

      }catch(error){  
        console.log(error);
        dispatch({
          type:GLOBALTYPES.ALERT,
       payload:{
          error:error.response?.data?.msg
         }         
       })

      }
    }
  }


export const register = (data) => async(dispatch)=>{
  try{
    const check = valid(data)
    if(check.errLength > 0)
    return dispatch({type:GLOBALTYPES.ALERT,payload:check.errMsg})

    dispatch({type: GLOBALTYPES.ALERT,payload:{loading:true}})

    const  res = await postDataAPI('register',data)
    dispatch({
      type:GLOBALTYPES.AUTH,
      payload:{
      token:res.data.access_token,
      user: res.data.user
  }
})

  localStorage.setItem("firstlogin",true)

  dispatch({
  type:GLOBALTYPES.ALERT,
  payload:{
    success:res.data.msg
  }
})
  }catch(error){
    dispatch({
      type:GLOBALTYPES.ALERT,
       payload:{
       error:error.response.data.msg
    }
  })
  }
}

export const sendpasswordlink = (email) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {} });

    const res = await postDataAPI('sendpasswordlink', { email });
  

    if (res.data.success) {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          success: res.data.message
        }
      });  

      dispatch({
        type:GLOBALTYPES.ALERT,
        payload:{
          success:res.data.message
        }
      })
    } else {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: res.data.message } });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: 'Failed to send reset link' } });
  }
};

export const ForgotPassword = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const response = await getDataAPi('forgotpassword', token, id);

    if (response.data.success) {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          success: response.data.message
        }
      });
    } else {
    
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: response.data.message 
        }
      });
    }
  } catch (error) {
    console.log(error);

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: 'Failed to initiate password reset' 
      }
    });
  }
}



// export const changePassword = (id, token, password, confirm) => async (dispatch) => {
//   try {
//     if (password !== confirm) {
//       throw new Error('Password and confirm password do not match');
//     }
    

//     const response = await fetchData( id, token);




//     if (response.data.success) {
//       dispatch({
//         type: GLOBALTYPES.AUTH,
//         payload: {
//           success: response.data.message
//         }
//       });  
//     } else {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: {
//           error: response.data.message
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error); 

//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {
//         error: 'Failed to update password'
//       }
//     });
//   }

// }
  

export const logout = ()=> async (dispatch)=>{
  try{
  localStorage.removeItem('firstlogin')
  await postDataAPI('logout')
  window.location.href = "/"
  }catch(error){
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.message 
      }
    });
  }

}