import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { checkImage } from '../../utlis/imageUpload'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({setOnEdit}) => {
const initState = {
    fullname:"",
    mobile:"",
    address:"",
    website:"",
    story:"",
    gender:"",
   
}

const [userData,setUserData] = useState(initState)
const {fullname,mobile,address,website,story,gender} = userData
const [avatar,setAvatar] = useState('')

const {auth,theme} = useSelector(state => state) 
const dispatch = useDispatch()  

useEffect(()=>{
  setUserData(auth.user)
},[auth.user])

const changeAvatar = (e) =>{

   const file = e.target.files[0]
   const err = checkImage(file)
   if(err) return dispatch({
  type:GLOBALTYPES.ALERT,payload:{error:err}
 })
   setAvatar(file)
  
}

const handleSubmit = e =>{
   e.preventDefault()
   dispatch(updateProfileUser({userData,avatar,auth}))
   setOnEdit(false)
}

const handleInput =  e =>{         
  const {name,value} = e.target
  setUserData({...userData,[name]:value})
}

  return (
    <div className='edit_profile'>
     
  
     <form onSubmit={handleSubmit}>
      <div className='info_avatar'>
      <img src={avatar ? URL.createObjectURL(avatar):auth.user.avatar} 
      alt='avatar' style={{filter: theme? 'invert(1)' : 'invert(0)'}} />
      <span>
      <i class="fa fa-camera"/>
        <p>Chanage</p>  
        <input type="file" name='file' id='file_up'
         accept='image/*' onChange={changeAvatar}
        />  
      </span>
      </div>

      <div className='form-group'>
     <label htmlFor='fullname' >FullName</label>
      <div className='position-relative'>
      <input type="text" className="form-control" id="fullname"
        name="fullname" value={fullname}
        onChange={handleInput}
      />     
        <small className='text-danger position-absolute'
        style={{top:'50%', right:'5px', transform:'translateY(-50%)'}}>
          {fullname.length}/25
        </small>
      </div>
      </div>

      <div className='form-group'>
      <label htmlFor='mobile' >mobile</label>
      <input type="number" name='mobile' value={mobile}
        className='form-control'
        onChange={handleInput}
      />
      </div>

      <div className='form-group'>
      {/* <label htmlFor='address' >Address</label>
      <input type="text" name='address' value={address}
        className='form-control'
        onChange={handleInput}
      /> */}

      </div>
      <div className='form-group'>
      <label htmlFor='website' >Website</label>
      <input type="text" name='website' value={website}
        className='form-control'
        onChange={handleInput}
      />

      </div>
      <div className='form-group'>
      <label htmlFor='story' >story</label>
      <textarea type="text" name='story' value={story} cols="30" rows="4"
        className='form-control'
        onChange={handleInput}/>  
       <small className='text-danger d-block text-right'>   
          {story.length}/200
        </small>
      </div>

      <label htmlFor='gender'>Gender</label>
      <div className='input-group-prepend px-0 mb-4'>
        <select name='gender' id='gender'value={gender}
        className= "custom-select text-capitalize"
        onChange={handleInput}>

        <option value="male">Male</option>
        <option value="Female">Female</option>
        <option value="others">Others</option>   

        </select>
      </div>  
     <button className='btn btn-info w-100' type='sumbit'>save</button>
     </form>
    </div>
  )
}

export default EditProfile
