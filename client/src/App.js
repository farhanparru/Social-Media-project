import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './customRoute/pageRender';
import PrivateRoute from './customRoute/PrivateRouter';
import Message from './pages/messages';
import Discover from './pages/discover'
import Notify from './pages/notify'
import Home from './pages/Home';
import ForgotPassword from './pages/Forgotpassword';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './component/alert/alert';
import StatusModal from './component/StatusModal';
import Header from './component/header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Profile from '../src/pages/profile/[id]'
import { getPosts } from './redux/actions/postAction';
import Post from './pages/posts/[id]';
import {getSuggestions} from './redux/actions/suggessionsActions';
import {ToastContainer} from 'react-toastify'
import Coversation from './pages/messages/[id]';
import CallModal from './component/messages/CallModal';
import Peer  from 'peerjs'




import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClint from './SocketClint'



function App() {
  const { auth ,status,modal,call} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const socket = io('https://api.world-network.site', {
        transports: ['websocket'],
        secure: true,
      });
      
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });
      
      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });
  
      dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
      dispatch(refreshToken());
      return () => socket.close();
    } catch (error) {
      console.error('Socket initialization error:', error);
    }
  }, [dispatch]);
  


  useEffect(()=>{
    if(auth.token){
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
    }
  },[dispatch,auth.token])



  useEffect(()=>{
     const newPeer = new Peer(undefined,{
        path: '/', secure: true
     })

     dispatch({type: GLOBALTYPES.PEER, payload: newPeer})
  },[dispatch])

      
    
  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal/>}          
          {auth.token && <SocketClint/>}
          {call && <CallModal/>}        
          <Routes>
            <Route path='/message' element={<PrivateRoute Component={Message} />} />  
            <Route path='/discover' element={<PrivateRoute Component={Discover} />} />
            <Route path='/notify' element={<PrivateRoute Component={Notify} />} />
            <Route exact path="/" element={auth.token ? <Home /> : <Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route exact path='/forgotpassword/:id/:token' element={<ForgotPassword />} />
            <Route path='/:page' element={<PageRender/>} />
            <Route path="/page/:id" element={<PageRender />} />
          
           
            <Route path='/message/:id' element={<Coversation/>}/>
            <Route path='/post/:id' element={<Post/>} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
      
    </Router>
  );
}

export default App;