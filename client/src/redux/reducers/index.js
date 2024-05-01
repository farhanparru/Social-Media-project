import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alertReducer'
import theme from "./themeReducer";
import profile from './profileReducer'
import status from "./statusReducer";
import homePosts from './postReducre'
import modal from './modalReducer'
import detailPost from "./deteailPostReducre";
import discover from "./discoverReducer";
import suggesions from './suggessionsReducre'
import message from './messageReducre'
import socket from "./socketReducre";
import call from "./callReducre";
import peer from './peerReducer'
import online from './onlineReducre'

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  homePosts,
  modal,
  detailPost,
  discover,
  suggesions,
  message,
  socket,
  call,
  peer,
  online
})