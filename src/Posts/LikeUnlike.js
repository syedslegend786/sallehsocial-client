import React from 'react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
const LikeUnlike = ({ liked, handleUnlike, handleLike }) => {
    return (
        <>
            {
                liked
                    ?
                    <MdFavorite onClick={handleUnlike} style={{ color: "red" }
                    } />
                    :
                    <MdFavoriteBorder onClick={handleLike} />
            }
        </>
    )
}

export default LikeUnlike
