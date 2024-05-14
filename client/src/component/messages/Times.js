import React from 'react'

const Times = ({total}) => {
  return (
    <div>
      <span>
         {
            (parseInt(total/3600).toString)
         }
      </span>
    </div>
  )
}

export default Times
