import React from 'react'
import CardHeader from './home/post_card/CardHeader'
import CardBody from './home/post_card/CardBody'
import CardFooter from './home/post_card/CardFooter'
import Comment from './home/Comments'
import InputComment from './InputComment'


const PostCard = ({post,theme}) => {
  return (
    <div className='card my-4'>
       <CardHeader post={post}/>
       <CardBody post={post} theme={theme}/>
       <CardFooter post={post}/>

       <Comment post={post}/>
       <InputComment post={post}/>
   </div>
  )
}

export default PostCard
