import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getChatDataAction } from '../../actions/messages.actions'
import MsgCont from './MsgCont'

const ConversationBody = ({ uid }) => {
    const [laodingMore, setlaodingMore] = useState(false)
    const { messages, auth } = useSelector(state => state)
    const [page, setpage] = useState(0)
    const dispatch = useDispatch()
    const divRef = useRef()
    const loadMore = useRef()
    const [toRenderMessages, settoRenderMessages] = useState([])
    //to get messages initially...
    // triggers only when {uid} data not already exist... 
    useEffect(() => {
        if (uid && !messages.data.find(m => m.uid === uid)) {
            dispatch(getChatDataAction(uid))
        }
    }, [uid, dispatch])
    //
    //set loaded message to ui dives...
    useEffect(() => {
        if (messages.data) {
            const d = messages.data.find(m => m.uid === uid)
            if (d) {
                settoRenderMessages(d.messages)
            }
        }
    }, [messages.data, uid])
    //
    // useEffect(() => {
    //     if (divRef.current && toRenderMessages && !laodingMore) {
    //         divRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    //     }
    // }, [divRef.current, toRenderMessages])
    // useEffect(() => {
    //     const observer = new IntersectionObserver(enteries => {
    //         if (enteries[0].isIntersecting) {
    //             setpage(p => p + 1)
    //         }
    //     })
    //     observer.observe(loadMore.current)
    // }, [setpage])
    // useEffect(() => {
    //     if (page > 1) {
    //         if (messages.results >= (page - 1) * 1) {
    //             setlaodingMore(true)
    //             dispatch(getChatDataAction(uid, page))
    //         }
    //     }
    // }, [page])
    return (
        <ConversationBodyStyled ref={divRef}>
            <button ref={loadMore}>Load more</button>
            {
                toRenderMessages.length > 0 &&
                toRenderMessages.map((val, index) => (
                    <MsgCont key={index} uid={uid} data={val} />
                ))
            }
        </ConversationBodyStyled>
    )
}
const ConversationBodyStyled = styled.div`
min-height: 100%;
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
`
export default ConversationBody
