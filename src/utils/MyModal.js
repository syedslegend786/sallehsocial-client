import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCamera } from 'react-icons/fa'
import { GrGallery } from 'react-icons/gr'
import { Button, Modal } from 'react-bootstrap'
import { globalConstants } from '../actions/actionConstants'
import styled from 'styled-components'
import { createPostAction, postUpdateActions, POST_CONSTANTS } from '../actions/post.actions'
import MyImojiPicker from './MyImojiPicker'
import { showImage, showVideo } from './reusedFunctions'

const MyModal = () => {
    const [content, setcontent] = useState()
    const { status, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [images, setimages] = useState([])
    const handleimages = (e) => {
        const newImages = [...e.target.files]
        let error = ''
        let imagesWithoutErrors = []
        newImages.forEach(val => {
            if (val.type !== 'image/png' && val.type !== 'image/jpeg' && val.type !== 'video/mp4') {
                return error = 'file type is not correct!!!'
            }
            if (!val) {
                return error = 'file is not selected!!!'
            }
            return imagesWithoutErrors.push(val)
        })
        if (error) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: error }
            })
        }
        console.log(newImages)
        setimages([...images, ...imagesWithoutErrors])
    }
    const handleSubmit = () => {
        if (!images.length > 0) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: 'IMGAES REQUIRED!!!' }
            })
        }
        dispatch(createPostAction({ images, content: content }))
    }
    useEffect(() => {
        if (status.updatingPost.images) {
            dispatch({ type: globalConstants.STATUS, payload: true })
            setcontent(status.updatingPost.content)
            setimages(status.updatingPost.images)
        }
    }, [status.updatingPost, dispatch])
    const handleUpdate = () => {
        if (!images.length > 0) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: 'IMGAES REQUIRED!!!' }
            })
        }
        dispatch(postUpdateActions({ images, content: content }))
    }
    return (
        <Modal show={status.modal} onHide={() => {
            dispatch({
                type: globalConstants.STATUS,
                payload: false,
            })
            dispatch({
                type: POST_CONSTANTS.POST_UPDATING,
                payload: {},
            })
            setcontent('')
            setimages([])
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextAreaCont >
                    <textarea value={content} onChange={(e) => setcontent(e.target.value)} rows='4' placeholder={`${auth.user.fullname}, what are you thinking?`} />
                    <span><MyImojiPicker setContent={setcontent} content={content} /></span>
                </TextAreaCont>
                <ImagesCont>
                    {
                        images && images.map((val, index) => {
                            return (
                                <div key={index} className='cont'>
                                    <span onClick={() => {
                                        let newArr = [...images]
                                        newArr.splice(index, 1)
                                        setimages(newArr)
                                    }}>X</span>
                                    {
                                        val.type ?
                                            <>
                                                {val.type.includes('video') ?
                                                    showVideo(URL.createObjectURL(val)) :
                                                    showImage(URL.createObjectURL(val))
                                                }
                                            </>
                                            :
                                            val.url ?
                                                <>
                                                    {
                                                        val.url.includes('video') ?
                                                            showVideo(val.url) :
                                                            showImage(val.url)
                                                    }
                                                </> :
                                                null
                                    }
                                </div>
                            )
                        })
                    }
                </ImagesCont>
                <FilesCont>
                    <FileItem>
                        <input onChange={handleimages} type='file' multiple accept='image/*,video/*,audio/*' />
                        <GrGallery />
                    </FileItem>
                    <FileItem>
                        <FaCamera />
                    </FileItem>
                </FilesCont>
            </Modal.Body>
            <Modal.Footer style={{
                justifyContent: 'center',
            }}>
                {status.updatingPost.images
                    ?
                    <PostButton onClick={handleUpdate} variant="secondary">
                        Update
                    </PostButton>
                    :
                    <PostButton onClick={handleSubmit} variant="secondary">
                        Post
                    </PostButton>
                }

            </Modal.Footer>
        </Modal >
    )
}
const ImojiStyled = styled.div`
`
const ImagesCont = styled.div`
display: grid;
grid-template-columns: repeat(3,1fr);
align-items: center;
justify-content: center;
.cont{
    height: 100px;
    width: 100px;
    position: relative;
    span{
        position: absolute;
        right:0;
        top:0;
        border-radius: 50%;
        width:25px;
        height:25px;
        border: 1px solid crimson;
       text-align: center;
       z-index: 1;
       cursor: pointer;
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
const PostButton = styled(Button)`
width: 100%;
`

const FileItem = styled.div`
width: 40px;
position: relative;
overflow:hidden;
cursor: pointer;
svg{
    cursor: pointer;
    font-size: 1.5rem;
}
input{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    opacity: 0;
    cursor: pointer;
}
`
const FilesCont = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const TextAreaCont = styled.div`
position: relative;
span{
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 1rem;
    z-index: 1;
    cursor: pointer;
}
width: 100%;
textarea{
    border-radius: 20px;
    padding: 1rem;
    width: 100%;
    border: none;
    background-color: rgba(0,0,0,.1);
    outline: none;
}
`
export default MyModal
