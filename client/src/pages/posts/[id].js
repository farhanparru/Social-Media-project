import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const Post = () => {
 const {id} = useParams()
 
  return (
    <div>
      Post {id}
    </div>
  )
}

export default Post
