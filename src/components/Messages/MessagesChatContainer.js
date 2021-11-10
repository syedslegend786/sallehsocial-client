import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getChatDataAction } from '../../actions/messages.actions'
import ChatIcon from '../../assets/chatsvg.svg'
import { showImage, showVideo } from '../../utils/reusedFunctions'
import ConversationBody from './ConversationBody'
import CoversationHeader from './CoversationHeader'
import Footer from './Footer'
const MessagesChatContainer = ({ uid, coversation }) => {
    const dispatch = useDispatch()
    const [media, setmedia] = useState([])
    const [uploadingImagesAndVideos, setuploadingImagesAndVideos] = useState(false)
    return (
        <MessagesChatContainerStyled>
            {
                !coversation ?
                    <IconCont>
                        <img src={ChatIcon} alt='' />
                    </IconCont>
                    :
                    <CoversationCont>
                        <CoversationHeader uid={uid} />
                        <div className='main__cont'>
                            <ConversationBody
                                uid={uid}
                                uploadingImagesAndVideos={uploadingImagesAndVideos}
                                setuploadingImagesAndVideos={setuploadingImagesAndVideos}
                            />
                            {media.length > 0 &&
                                <MediaCont>
                                    {
                                        media.map((val, index) => (
                                            <div key={index} className='img__cont'>
                                                <span onClick={() => {
                                                    let newArr = [...media]
                                                    newArr.splice(index, 1)
                                                    setmedia(newArr)
                                                }}>X</span>
                                                {
                                                    val.type === 'video/mp4'
                                                        ?
                                                        showVideo(URL.createObjectURL(val))
                                                        :
                                                        (val.type === 'image/png' || val.type === 'image/jpeg')
                                                            ?
                                                            showImage(URL.createObjectURL(val))
                                                            :
                                                            null
                                                }
                                            </div>
                                        ))
                                    }
                                </MediaCont>
                            }
                        </div>
                        <Footer media={media} setmedia={setmedia} uid={uid} />
                    </CoversationCont>
            }
        </MessagesChatContainerStyled>
    )
}
const MediaCont = styled.div`
position: relative;
overflow-x: hidden;
display: flex;
align-items: center;
max-width: 800px;
background-color: #FEE2E2;
.img__cont{
    :not(:first-child){
        margin-left: 1rem;
    }
    height: 150px;
    width: 150px;
    position: relative;
    span{
        position: absolute;
        top: -2;
        right: 0;
        cursor: pointer;
        color: red;
        padding: .5 rem;
        z-index: 1;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
`
const CoversationCont = styled.div`
.main__cont{
    height: calc(100% - 130px);
    width: 100%;
    overflow-y: scroll;
}
height: 100%;
width: 100%;

`
const IconCont = styled.div`
width: 500px;
height: 500px;
margin: 3rem auto;

img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
`
const MessagesChatContainerStyled = styled.div`
width: 100%;
height: 100%;
`
export default MessagesChatContainer
