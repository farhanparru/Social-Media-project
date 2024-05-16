import React from 'react'
import {useSelector} from 'react-redux'

const Carousel = ({images,id}) => {

 const isActive = index =>{
    if(index === 0) return 'active'
 }

 const {theme} = useSelector(state => state)

  return (
    <div id={`images${id}`} class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators" style={{zIndex:1}}>
  {
    images.map((img,index)=>(
        <li  key={index} data-target={`#images${id}`} 
        data-slide-to={index} 
        className={isActive(index)}></li>
    ))
  }
   
    
  </ol>
  <div class="carousel-inner">
  {
    images.map((img,index)=>(
      <div key={index} class={`carousel-item ${isActive(index)}`}>
      {
         img.url.match(/video/i)
         ? <video controls class="d-block w-100" src={img.url} alt={img.url}
        style={{filter:theme ? 'invert(1)' :'invert(0)'}} />
         :<img class="d-block w-100" src={img.url} alt={img.url}
        style={{filter:theme ? 'invert(1)' :'invert(0)'}}/>
      }
    
    </div>
    ))
  }
   
    
  </div>


  {
    images.length > 1 &&
    <>
    <a class="carousel-control-prev" href={`#images${id}`}  role="button" data-slide="prev"
   style={{width:'5%'}}>
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href={`#images${id}`}  role="button" data-slide="next"
  style={{width:'5%'}}>
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
    </>
  }

</div>
  )
}

export default Carousel
