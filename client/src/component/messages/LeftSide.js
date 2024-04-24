import React,{useState} from 'react'
import UserCard from '../UserCard'
import { useSelector,useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { getDataAPI } from '../../utlis/fetchData'
import { useNavigate, useParams } from 'react-router-dom'
import { addUser } from '../../redux/actions/messageActions'

const LeftSide = () => {
const {auth, message} = useSelector(state => state)
const dispatch = useDispatch()

const [search, setSearch] = useState('')
const [searchUsers, setSearchUsers] = useState([])
const navigate = useNavigate()
const {id} = useParams()

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

const isActive = (user)=>{
  if(id === user._id) return 'active';
  return
}


  return (
    <>
      <form className='message_header' onSubmit={handleSearch}>
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
                <div key={user._id} className={`message_user ${isActive(user)}`}
                onClick={() => handleAdduser(user)}>
                <UserCard user={user}/>
                </div>
            ))
          }
       
       </>
       :<>
       {
         message.users.map(user =>(
            <div key={user._id} className={`message_user ${isActive(user)}`}
                onClick={() => handleAdduser(user)}>
                <UserCard user={user} msg={true}>
                <i className='fas fa-circle' />
                </UserCard>
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
