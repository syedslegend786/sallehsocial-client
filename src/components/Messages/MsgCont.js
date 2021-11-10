import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getChatDataAction } from '../../actions/messages.actions'
import { showImage, showVideo } from '../../utils/reusedFunctions'

const MsgCont = ({ data }) => {
    const { auth } = useSelector(state => state)
    return (
        <MsgContStyled data={data} auth={auth.user._id}>
            <div className='message__cont'>
                <p>
                    {data.text}
                </p>
                {
                    data.media.length > 0 &&
                    data.media.map((val, index) => (
                        <VideoCont>
                            {
                                val.url
                                    ?
                                    val.url.includes('video')
                                        ?
                                        showVideo(val.url)
                                        :
                                        val.url.includes('image')
                                            ?
                                            showImage(val.url)
                                            :
                                            null
                                    :
                                    null
                            }
                        </VideoCont>
                    ))
                }
                <span>
                    {
                        moment(data.createdAt).fromNow()
                    }
                </span>
            </div>
        </MsgContStyled>
    )
}
const VideoCont = styled.div`
width: 130px;
height: 130px;
img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
video{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
`
const MsgContStyled = styled.div`
display: flex;
justify-content: ${(props) => props.data.sender === props.auth ? 'flex-end' : 'flex-start'};
.message__cont{    
background-color:${(props) => props.data.sender === props.auth ? '#1D4ED8' : ''};
color:${(props) => props.data.sender === props.auth ? 'white' : ''};
display: flex;
flex-direction: column;
padding: 1rem;
border: 1px solid #E5E7EB;
width: fit-content;
height: fit-content;
border-radius: 20px;
p{
    flex: 1;
}
span{
    opacity: .5;
    &:hover{
        cursor: pointer;
        color: #93C5FD;
        opacity: 1;
    }
}
}
`
export default MsgCont
