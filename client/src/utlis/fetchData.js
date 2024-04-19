import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}
  

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}
   

export const putDataAPI = async (url,post,token)=>{  
    const res = await axios.put(`/api/${url}`,post,{
        headers:{Authorization:token}
    })
    return res
}

export const patchDataAPI = async (url,post,token)=>{
    const res = await axios.patch(`/api/${url}`,post,{
        headers:{Authorization:token}
    })
    return res
}

export const deleteDataAPI = async (url,token)=>{
    const res = await axios.delete(`/api/${url}`,{
        headers:{Authorization:token}
    })
    return res
}

// forgotpassword get
export const getDataAPi = async (url, token, id) => {
    try {
        const res = await axios.get(`/api/${url}/${id}/${token}`, {
            headers: { Authorization: token }
        });
      
        return res;
    } catch (error) {
        throw error;    
    }
}

// change password post
// export const fetchData = async (url, data, token) => {
//     try {
//         const res = await axios.post(`/api/${url}`, data, {
//             headers: { Authorization: token }
//         });

//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// };
