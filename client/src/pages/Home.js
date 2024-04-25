import React from 'react';
import Status from '../component/home/Status';
import Posts from '../component/home/Posts';
import RightSideBar from '../component/home/RightSideBar';
import LoadIcon from '../images/loading.gif'
import {useSelector} from 'react-redux'
import New from '../component/New';


const Home = () => {
const {homePosts} = useSelector(state => state)


  return (
    
    <div className='home row mx-0'>
    <div className='col-md-8'>

    <div className="col-md-20 ml-[5 px] mr-4">
    {/* <New/> */}
   </div>
    <Status/>
     
     {
      homePosts.loading
      ? <img src={LoadIcon} alt='Loading' className='d-block mx-auto'/>
      : homePosts.result  === 0
      ? <h2 className='text-cenetr'>No Post</h2>
      :<Posts/>
     }
     
    </div>
    
    <div className='col-md-4'>
      <RightSideBar />
    </div>
    </div>
  );
};

export default Home;
