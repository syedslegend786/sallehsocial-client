import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authConstants, notifyConstants } from '../../actions/actionConstants'
import { messagesConstants } from '../../actions/messages.actions'
import { POST_CONSTANTS } from '../../actions/post.actions'
import notifyAudio from './../../assets/notificationsound.wav'

const SocketClient = () => {
    const audioRef = useRef()
    const createDesktopNotification = (body, titile, icon, url) => {
        const options = {
            body,
            icon,
        }
        let n = new Notification(titile, options)
        n.onclick = (e) => {
            e.preventDefault()
            window.open(url, "_blank")
        }
    }
    const dispatch = useDispatch()
    const { auth, socket } = useSelector(state => state)
    //userjoin
    useEffect(() => {
        socket.emit("userjoin", auth.user._id)
    }, [socket, auth.user._id])
    //likepost
    useEffect(() => {
        socket.on("updatedPost", (updatedPost) => {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: updatedPost
            })

        })
        return () => socket.off("updatedPost")
    }, [socket, dispatch])
    //unlikepost
    useEffect(() => {
        socket.on("unlikepostToClient", (newPost) => {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: newPost
            })
        })
        return () => socket.off("unlikepostToClient")
    }, [socket, dispatch])
    //comments on post...
    useEffect(() => {
        socket.on("commentCreateToClient", (post) => {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
        })
    }, [dispatch, socket])
    useEffect(() => {
        socket.on("deleteCommentToClient", (post) => {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
        })
    }, [dispatch, socket])
    useEffect(() => {
        socket.on("updatePostToClient", (post) => {
            dispatch({
                type: POST_CONSTANTS.POST_UPDATED_DATA,
                payload: post
            })
        })
    }, [dispatch, socket])
    //foollow unfollow ...
    useEffect(() => {
        socket.on("followUserToClient", (userWhoFollowedYou) => {
            dispatch({
                type: authConstants.SOCKET_FOLLOW,
                payload: userWhoFollowedYou,
            })
        })
    }, [dispatch, socket])
    //notify....
    useEffect(() => {
        socket.on("createNotifyToClient", (notifySent) => {
            console.log(notifySent)
            dispatch({
                type: notifyConstants.SOCKET_NOTIFY_GET,
                payload: notifySent,
            })
            audioRef.current.play();
            createDesktopNotification(
                `${notifySent.user.username} ${notifySent.text}`,
                `Salleh-Social`,
                `${notifySent.user.avatar}`,
                `http://localhost:3000${notifySent.url}`
            )
        })
    }, [dispatch, socket])
    useEffect(() => {
        socket.on("deleteNotifyToClient", (notifySent) => {
            dispatch({
                type: notifyConstants.SOCKET_NOTIFY_DELETE,
                payload: notifySent,
            })
        })
    }, [dispatch, socket])
    useEffect(() => {
        socket.on("unfollowUserToUser", (userWhoUnFollowed) => {
            dispatch({
                type: authConstants.SOCKET_UNFOLLOW,
                payload: userWhoUnFollowed,
            })
        })
    }, [dispatch, socket])
    useEffect(() => {
        socket.on("sendMessageToClient", (message) => {
            dispatch({
                type: messagesConstants.ADD_MESSAGE_TO_CHAT,
                payload: message,
            })
        })
    }, [dispatch, socket])

    return (
        <>
            <audio style={{ display: 'none' }} controls ref={audioRef} >
                <source src={notifyAudio} />
            </audio>
        </>
    )
}

export default SocketClient


