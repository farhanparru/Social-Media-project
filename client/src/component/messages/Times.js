import React from 'react'

const Times = ({total}) => {
  return (
    <div>
      <span>
         {
            (parseInt(total/3600)).toString().length < 2
            ? '0' + (parseInt(total/3600))
            : (parseInt(total/3600))
         }
      </span>
      <span>:</span>

      <span>
         {
            (parseInt(total/60)).toString().length < 2
            ? '0' + (parseInt(total/60))
            : (parseInt(total/60))
         }
      </span>
      <span>:</span>


      <span>
         {
           (total%3600).toString().length < 2
            ? '0' + (total%3600) + 's'
            : (total%3600) + 's'
         }
      </span>
      <span>:</span>
    </div>
  )
}

export default Times
