import React, { useEffect } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
const SavePostButtons = ({ isSaved, handleSave, handleUnSave, post, setisSaved }) => {
    const { auth } = useSelector(state => state)
    useEffect(() => {
        if (auth.user.saved.find(val => val === post._id)) {
            setisSaved(true)
        }
    }, [auth.user.saved, post._id, setisSaved])
    return (
        <div>
            {
                isSaved
                    ?
                    <BsBookmarkFill onClick={handleUnSave} style={{ color: "green" }} />
                    :
                    <BsBookmark onClick={handleSave} />
            }
        </div>
    )
}

export default SavePostButtons
