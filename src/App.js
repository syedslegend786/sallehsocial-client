import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login';
import Alerts from './utils/Alerts';
import HOC from './HOC/HOC';
import Home from './components/Home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenAction } from './actions/auth.actions';
import Register from './components/Register/Register';
import HOCFORLOGINREGISTER from './HOC/HOCFORLOGINREGISTER';
import Profile from './components/Profile/Profile';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { getPostsAction } from './actions/post.actions';
import SinglePost from './components/SinglePost/SinglePost';
import Discover from './components/Discover/Discover';
import { io } from 'socket.io-client'
import { globalConstants } from './actions/actionConstants';
import SocketClient from './components/SocketClient/SocketClient';
import { getNotifiesAction } from './actions/notify.actions';
import Messages from './components/Messages/Messages';
import Conversation from './components/Messages/Conversation';
function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.token) {
      dispatch(refreshTokenAction())
    }
  }, [auth.token, dispatch])
  useEffect(() => {
    if (auth.token) {
      dispatch(getPostsAction())
      dispatch(getNotifiesAction())
    }
  }, [auth.token, dispatch])
  useEffect(() => {
    const socket = io('http://localhost:5000')
    dispatch({
      type: globalConstants.SOCKET,
      payload: socket,
    })
    return () => socket.close()
  }, [dispatch])
  //desktop notifications....
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") { }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") { }
      });
    }
  }, [])
  return (
    <>
      <Alerts />
      {auth.token && <SocketClient />}
      <Router>
        <Routes>
          <HOC path='/' element={<Home />} />
          <HOC path='/profile/:uid' element={<Profile />} />
          <HOC path='/single/post/:pid' element={<SinglePost />} />
          <HOC path='/discover' element={<Discover />} />
          <HOC path='/messages' element={<Messages />} />
          <HOC path='/actualmessage/:uid' element={<Conversation />} />
          
          <HOCFORLOGINREGISTER path='/login' element={<Login />} />
          <HOCFORLOGINREGISTER path='/register' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
