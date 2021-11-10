import { combineReducers } from "redux"
import authReducer from './auth.reducers'
import alertReducer from './alert.reducers'
import profileReducer from './profile.reducers'
import statusReducer from './status.reducers'
import postsReducer from './posts.reducers'
import userProfilePosts from './profilePosts.reducers'
import singlePostReducer from './singlePost.reducers'
import discoverReducer from './discover.reducers'
import suggestUsersReducer from './suggestUser.reducers'
import savedPostsReducer from './savedPosts.reducers'
import socket from './socket.reducers'
import notify from './notify.reducers'
import messages from './messages.reducers'
const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
    status: statusReducer,
    posts: postsReducer,
    userProfilePosts: userProfilePosts,
    singlePost: singlePostReducer,
    discover: discoverReducer,
    suggestions: suggestUsersReducer,
    saved: savedPostsReducer,
    socket,
    notify,
    messages,
})
export default rootReducer