import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import LoadIcon  from '../../images/loading.gif'
import PostCard from '../../component/PostCard'

const Post = () => {
  const { id } = useParams()
  const [post, setPost] = useState([])

  const { auth, detailPost } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost({detailPost, id, auth}))

    if(detailPost.length > 0){
        const newArr = detailPost.filter(post => post._id === id)
        setPost(newArr)
    }
},[detailPost, dispatch, id, auth])

return (
  <div className="posts">
    <h1>{id}</h1>
  </div>
)
}


export default Post
