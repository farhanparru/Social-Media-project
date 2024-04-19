import React from 'react'
import Info from '../../component/profile/Info'
import Posts from '../../component/profile/Posts'
import { useSelector } from 'react-redux'
import LodingIcon from '../../images/loading.gif'
const Profile = () => {  
  
 const  {profile} = useSelector(state => state)
  return (
    <div className='profile'>
   
    {
      profile.loading
      ? <img  className='d-block mx-auto my-4' src={LodingIcon} alt='loading'/>  
      :<Info/>
    }
     <Posts/>
    </div>
  )
}

export default Profile
