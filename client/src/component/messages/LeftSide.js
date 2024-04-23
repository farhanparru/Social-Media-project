import React,{useState} from 'react'
import UserCard from '../UserCard'
import { useSelector,useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utlis/fetchData'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../redux/actions/messageActions'

const LeftSide = () => {
const {auth, message} = useSelector(state => state)
const dispatch = useDispatch()

const [search, setSearch] = useState('')
const [searchUsers, setSearchUsers] = useState([])
const navigate = useNavigate()

const handleSearch = async e =>{
    e.preventDefault()
    if(!search) return setSearchUsers([]) ;

    try {
        const res = await getDataAPI(`search?username=${search}`, auth.token);
        setSearchUsers(res.data.users);
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    
}

const handleAdduser = (user) =>{
     setSearch('')
     setSearchUsers([])
     dispatch(addUser({user, message}))
     return navigate(`/message/${user._id}`)
}


  return (
    <>
      <form className='message_header' onClick={handleSearch}>
      <input type='text' 
       value={search}
        placeholder='Enter to Search...!'
        onChange={e => setSearch(e.target.value)}/>
        <button type='submit' style={{display:"none"}}>Search</button>
      </form> 

      <div className='message_chat_list'>
      {
        searchUsers.length !== 0
        ? <>
          {
            searchUsers.map(user => (
                <div key={user._id} className='message_user'
                onClick={() => handleAdduser(user)}>
                <UserCard user={user}/>
                </div>
            ))
          }
       
       </>
       :<>
       {
         message.users.map(user =>(
            <div key={user._id} className='message_user'
                onClick={() => handleAdduser(user)}>
                <UserCard user={user}/>
                </div>
         ))
       }

       </>
      }
      
      </div>
    </>
  )
}

export default LeftSide
