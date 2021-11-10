import React from 'react'
import styled from 'styled-components'
import { FaRegComment } from 'react-icons/fa'
import { MdFavoriteBorder } from 'react-icons/md'
import { useNavigate } from 'react-router-dom' 
const PostImageCard = ({ post }) => {
    const navigate = useNavigate()
    const handleClick = (id) => {
        navigate(`/single/post/${id}`)
    }
    return (
        <PostImageCardStyled> 
            {
                post.map((val, index) => (
                    <ImageContainer onClick={() => handleClick(val._id)} key={index}>
                        <img src={val.images[0].url} alt='' />
                        <div className='icon_cont'>
                            <FaRegComment /> <span style={{ marginRight: "2rem" }}>{val.comments.length}</span>
                            <MdFavoriteBorder /> <span>{val.likes.length}</span>
                        </div>
                    </ImageContainer>
                ))
            }
        </PostImageCardStyled>
    )
}
const ImageContainer = styled.div`
cursor: pointer;
transition: all .4s ease-in-out;
&:hover{
    .icon_cont{
        opacity: 1;
    }
}
width: 300px;
height: 300px;
position: relative;
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.icon_cont{
    transition: all .4s ease-in-out;
    opacity: 0;
    span{
        font-size: 1rem;
        color: white;
    }
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        font-size: 1rem;
        color: white;
    }
}
`
const PostImageCardStyled = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(4,1fr);
grid-column-gap: 1rem;
align-items: center;
justify-content: center;
`

export default PostImageCard
