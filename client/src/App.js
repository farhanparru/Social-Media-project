import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageRender from './customRoute/pageRender';
import PrivateRoute from './customRoute/PrivateRouter';
import Message from './pages/message';
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


function App() {
  const { auth ,status,modal} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);



  useEffect(()=>{
    if(auth.token) dispatch(getPosts(auth.token))
  },[dispatch,auth.token])

  return (
    <Router>
      <Alert />
      <input type='checkbox' id='theme' />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className='main'>
          {auth.token && <Header />}
          {status && <StatusModal/>}
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
            
            <Route path='/post/:id' element={<Post/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
