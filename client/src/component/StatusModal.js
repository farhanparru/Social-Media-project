import React,{useState,useRef,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import {createPost,updatePost} from '../redux/actions/postAction'
import Icon from './icons'

const StatusModal = () => {
    const {auth,theme,status} = useSelector(state => state)
    const dispatch = useDispatch()


    const [content,setContent] = useState('')
    const [images,setImage] = useState([])
    const [stream,setStream] = useState(false)
    const videoRef = useRef()
    const refCanvas = useRef()
    const [tracks,setTracks] = useState('')


    const handleChangeImages = e =>{
      const files = [...e.target.files] 
      let err = ""
      let newImages = []

      files.forEach(file =>{
         if(!file) return err = 'File does not exist.'

         if(file.size > 1024 * 1024 * 5){
             return err = "The Image/video largest is 5mb."
         }
         return newImages.push(file)
      })

 

      if(err) dispatch({type:GLOBALTYPES.ALERT,payload:{error:err}})
      setImage([...images, ...newImages])

    }

    const deleteImages = (index) =>{
       const  newArr = [...images]
       newArr.splice(index,1)
       setImage(newArr)
    }

    const handleStream = () =>{
      setStream(true)
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({video:true})
          .then(mediaStream =>{
             videoRef.current.srcObject = mediaStream
             videoRef.current.play()
             const track = mediaStream.getTracks()
             setTracks(track[0])
          }).catch(err => console.log(err))
      }
    }


  const handleCapture = () =>{
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width",width)
    refCanvas.current.setAttribute("height",height)
    const ctx = refCanvas.current.getContext('2d')

    ctx.drawImage(videoRef.current,0,0,width,height)
    let URL = refCanvas.current.toDataURL()
    setImage([...images,{camera:URL}])
  }


  const handleStopeStream = () =>{
   tracks.stop()
   setStream(false)
  }

  const handleSubmit = (e) =>{
     e.preventDefault()
     if(images.length === 0)
     return dispatch({
     type:GLOBALTYPES.ALERT,payload:{error:"Please add your photo"}
   })

   if(status.onEdit){
      dispatch(updatePost({content,images,auth,status}))

   }else{
      dispatch(createPost({content,images,auth}))

   }
     setContent('')
     setImage([])
     if(tracks) tracks.stop()
     dispatch({type: GLOBALTYPES.STATUS,payload:false})
  }


  useEffect(()=>{
    if(status.onEdit){
      setContent(status.content)
      setImage(status.images)
    }
  },[status])



  const imageShow = (src) =>{
     return(
      <img src={src} alt='images' className='img-thumbnail'
      style={{filter:theme ? 'invert(1)' : 'invert(0)'}} />
     )
  }

  
  const videoShow = (src) =>{
   return(
    <video controls src={src} alt='images' className='img-thumbnail'
    style={{filter:theme ? 'invert(1)' : 'invert(0)'}} />
   )
}

  return (
    <div className='status_modal'>
       <form onSubmit={handleSubmit}>
        <div className='status_header'>
         <h5 className='m-0'>Create Post</h5>
         <span onClick={()=> dispatch({
            type:GLOBALTYPES.STATUS,payload:false
            })}>
            &times;
            </span>    
        </div>

            <div className='status_body'>
           <textarea name='content' value={content}
           placeholder={`${auth.user.username}, what are you thinking}`}
            onChange={e => setContent(e.target.value)}
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
                background: theme ? 'rgba(0,0,0,.03)' : '',
            }} /> 

            <div className='d-flex'>
               <div className='flex-fill'></div>
                  <Icon setContent={setContent} content={content} theme={theme}/>
            </div>

            <div className='show_images'>
               {
                  images.map((img, index) =>(
                       <div key={index} id='file_img' >
                       {
                        img.camera ? imageShow(img.camera)
                        : img.url
                          ?<>
                              {
                                  img.url.match(/video/i)
                                  ? videoShow( img.url) : imageShow(img.url)
                              }
                          </>
                          :<>
                          {
                                  img.type.match(/video/i)
                                  ? videoShow(URL.createObjectURL(img) ) 
                                  : imageShow(URL.createObjectURL(img))
                              }
                          </>
                       }
                       
                       <span onClick={()=> deleteImages(index)}>&times;</span>
                        </div>
                  ))
               }
            </div>

            {
               stream &&
               <div className='stream  position-relative'>
                  <video  autoPlay muted ref={videoRef} width="100%"  height="100%"
                  style={{filter:theme ? 'invert(1)' : 'invert(0)'}}/>

                  <span onClick={handleStopeStream}>&times;</span>
                  <canvas ref={refCanvas} style={{display:'none'}}/>
               </div>
            }

            <div className='input_images'>
            {
                stream
                ? <i className='fas fa-camera' onClick={handleCapture}/>
                : <>
                <i className='fas fa-camera' onClick={handleStream}/>

               <div className='file_upload'>
               <i className='fas fa-image'/>
               <input type='file' name='file' id='file'
                multiple accept='image/*,video/*'  onChange={handleChangeImages}/>
            </div>
                </>
            }
          
         </div>
            </div>

           <div className='status_footer '>
           <button className='btn btn-secondary w-100' type='submit'>
           Post
          </button>
           </div>
           
       </form>
    </div>
  )
}

export default StatusModal
