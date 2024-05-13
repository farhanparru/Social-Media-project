import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon  from '../../images/loading.gif'
import {getSuggestions} from '../../redux/actions/suggessionsActions'
import Crads from './Crads'


function RightSideBar() {
 const { auth, suggesions} = useSelector(state => state)



 const dispatch = useDispatch()

  return (
    <div className='mt-3'>
    <Crads/>
     <UserCard user={auth.user}/>
     <div className='d-flex justify-content-between align-items-center my-2'>
        <h5 className='text-danger'>Suggesion for your</h5>
        {
           !suggesions.loading &&
           <i className='fas fa-redo' style={{cursor:'pointer'}}
            onClick={() => dispatch(getSuggestions(auth.token))}
           />
        }
        
     </div>

     {  
        suggesions?.loading
        ? <img src={LoadIcon} alt='loadinIcon' className='d-block mx-auto my-4' />
        : <div className='suggestions'>
          {
            suggesions?.users?.map(user => (
                <UserCard key={user?._id}  user={user}>
                <FollowBtn user={user} />                      
              </UserCard>
            ))
          }
        </div>

     }
  <div>
    
  </div>
    </div>
    
  )
}

export default RightSideBar
