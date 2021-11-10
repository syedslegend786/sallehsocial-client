import React, { useState } from 'react'
import styled from 'styled-components'
import { GrGallery } from 'react-icons/gr'
import MyImojiPicker from '../../utils/MyImojiPicker'
import { useDispatch, useSelector } from 'react-redux'
import { globalConstants } from '../../actions/actionConstants'
import { createMessageAction } from '../../actions/messages.actions'
import { imageUpload } from '../../utils/cloudinaryUpload'
const Footer = ({ uid, media, setmedia }) => {
    const [inputText, setinputText] = useState('')
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    const handleOnChange = (e) => {
        const files = [...e.target.files]
        let imagesWithOutErrors = []
        let error = ''
        if (files.length > 0) {
            files.forEach(val => {
                if (val.type !== 'image/png' && val.type !== 'image/jpeg' && val.type !== 'video/mp4') {
                    error = 'format not supported!'
                } else {
                    imagesWithOutErrors.push(val)
                }
            })
        }
        if (error) return dispatch({ type: globalConstants.ALERT, payload: { error: error } })
        setmedia([...media, ...imagesWithOutErrors])
    }
    const handleSendMessage = async () => {
        const uploadedMedia = await imageUpload([...media])
        const payload = {
            text: inputText,
            media: uploadedMedia,
            receiver: uid,
            sender: auth.user._id,
            createdAt: new Date().toISOString()
        }
        dispatch(createMessageAction(payload))
    }
    return (
        <FooterStyled>
            <div className='input__cont'>
                <input placeholder='Enter your message...' value={inputText} onChange={(e) => setinputText(e.target.value)} />
                <div className='functions'>
                    <MyImojiPicker setContent={setinputText} content={inputText} />
                    <GalleryPickerStyled>
                        <input onChange={handleOnChange} type='file' multiple accept='video/*,image/*' />
                        <GrGallery />
                    </GalleryPickerStyled>
                    <ButtonStyled onClick={handleSendMessage} disabled={inputText.trim() || media.length > 0 ? false : true} >Send</ButtonStyled>
                </div>
            </div>
        </FooterStyled>
    )
}
const GalleryPickerStyled = styled.div`
margin-left: 1rem;
margin-right: 1rem;
padding: 0 1rem;
position: relative;
input{
    position: absolute;
    left: 0;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    z-index: 1;
    &:hover{
        cursor: pointer;
    }
}
svg{
    font-size: 1.5rem;
    position: absolute;
     top: 50%;
        right: 0;
        color: crimson;
        transform: translate(-50%,-50%);
}
`
const ButtonStyled = styled.button`
 outline: none;
        border: none;
        background: transparent;
        color: ${(props) => props.disabled ? '' : "#2563EB"};
`
const FooterStyled = styled.div`
margin-left: 1rem;
display: flex;
.input__cont{
    .functions{
        display: flex;
        justify-content: space-between;
    }
    flex: 1;
    display: flex;
    background-color: #E5E7EB; 
    border-radius: 20px;
    padding:  1rem;
    input{
        outline: none;
        border: none;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: transparent;
    }
}
`
export default Footer
