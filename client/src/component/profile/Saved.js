import React,{useState,useEffect} from 'react'
import PostThumb from '../PostThumb'
import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utlis/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'



const Saved = ({auth,dispatch}) => {
 const [Saveposts,setSavePosts]= useState([])
 const [result,setResult] = useState(9)
 const [page,setPage] = useState(2)
 const [load,setLoad] = useState(false)

  useEffect(()=>{
    setLoad(true)
    getDataAPI('getSavePosts', auth.token)
    .then(res => {
      setSavePosts(res.data.savePosts)
      setResult(res.data.result)
      setLoad(false)
    })
    .catch(err =>{
      dispatch({type:GLOBALTYPES.ALERT, pyaload:{error: err.response.data.msg}})
    })
  },[auth.token,dispatch])

  const handleLoadMore = async() =>{
  setLoad(true)
  const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
  setSavePosts(res.data.savePosts)
  setResult(res.data.result)
  setPage(page + 1)
  setLoad(false)
  }


  return (
    <div>
     <PostThumb posts={Saveposts} result={result}/>
     {
        load &&<img  src={LoadIcon} alt='loading' className='d-block mx-auto '/>
      }
     
        <LoadMoreBtn result={result} page={page}
        load={load} handleLoadMore={handleLoadMore}
      /> 
       
    </div>
  )
}

export default Saved
