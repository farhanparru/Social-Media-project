import React from 'react'
import LeftSide from '../../component/messages/LeftSide'
import RightSidebar from '../../component/messages/RightSidebar'

const Coversation  = () => {
  return (
    <div className=' message d-flex'> 
      <div className='col-md-4 border-right px-0 left_mess'>
     <LeftSide/>
      </div>

      <div className='col-md-8 px-0'>
       <RightSidebar/>
      </div>
    </div>
  )
}

export default Coversation 
