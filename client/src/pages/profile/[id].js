import React,{useEffect} from 'react'
import Info from '../../component/profile/Info'
import Posts from '../../component/profile/Posts'
import { useSelector,useDispatch } from 'react-redux'
import LodingIcon from '../../images/loading.gif'
import {getProfileUsers} from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'


const Profile = () => {  
  
 const  {profile,auth} = useSelector(state => state)
 const dispatch = useDispatch()

 const {id}= useParams()

 useEffect(()=>{
  if(profile.ids.every(item => item !== id)){
    dispatch(getProfileUsers({users:profile.users,id,auth}))
  }
  
 },[id,profile.users, auth,dispatch])


  return (
    <div className='profile'>
   
    {
      profile.loading
      ? <img  className='d-block mx-auto my-4' src={LodingIcon} alt='loading'/>  
      : <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
    }
     <Posts auth={auth} profile={profile} dispatch={dispatch} id={id}/>
    </div>
  )
}

export default Profile
