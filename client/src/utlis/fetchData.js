import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`https://api.world-network.site/api/${url}`, {
        headers: { Authorization: token }
        
    });
    return res;
}




export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`https://api.world-network.site/api/${url}`, post, {
        headers: { Authorization: token },
        // withCredentials: true
    });
    return res;
};


   

export const putDataAPI = async (url,post,token)=>{  
    const res = await axios.put(`https://api.world-network.site/api/${url}`, post, {
        headers:{Authorization:token}
    })
    return res
}

export const patchDataAPI = async (url,post,token)=>{
    const res = await axios.patch(`https://api.world-network.site/api/${url}`, post, {
        headers:{Authorization:token}
    })
    return res      
}

export const deleteDataAPI = async (url,token)=>{
    const res = await axios.delete(`https://api.world-network.site/api/${url}`, {
        headers:{Authorization:token}
    })
    return res
}

// forgotpassword get
export const getDataAPi = async (url, token, id) => {
    
};