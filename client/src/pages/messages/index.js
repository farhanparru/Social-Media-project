import React from 'react'
import LeftSide from '../../component/messages/LeftSide'

const Message  = () => {
  return (
    <div className=' message d-flex'> 
      <div className='col-md-4 border-right px-0'>
     <LeftSide/>
      </div>

      <div className='col-md-8 px-0'>
      <div className='d-flex justify-content-center 
      align-items-center flex-column h-100'>

      <i className='fab fa-facebook-messenger  text-primary' 
      style={{fontSize: '5rem'}}/>
      <h5>messager</h5>

      </div>
      </div>
    </div>
  )
}

export default Message 
