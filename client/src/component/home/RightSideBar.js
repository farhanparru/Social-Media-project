import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon  from '../../images/loading.gif'


function RightSideBar() {
 const { auth, suggesions} = useSelector(state => state)



 const dispatch = useDispatch()

  return (
    <div>
     <UserCard user={auth.user}/>
     <div className='d-flex justify-content-between align-items-center my-2'>
        <h5 className='text-danger'>Suggesion for your</h5>
        <i className='fas fa-redo'/>
     </div>

     {
        suggesions?.loading
        ? <img src={LoadIcon} alt='loadinIcon' className='d-block mx-auto my-4' />
        : <div className='suggestions'>
          {
            suggesions?.users.map(user => (
                <UserCard key={user._id}  user={user}>
                <FollowBtn user={user} />                    
              </UserCard>
            ))
          }
        </div>

     }

    </div>
    
  )
}

export default RightSideBar
