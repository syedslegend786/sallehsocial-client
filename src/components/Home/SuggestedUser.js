import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSuggestionAction } from '../../actions/suggestUser.actions'
import UserCardForSearch from '../MyNav/UserCardForSearch'
import FollowButton from '../Profile/FollowButton'
import { useNavigate } from 'react-router-dom'

const SuggestedUser = () => {
    const navigate = useNavigate()
    const handleInfoClick = (uid) => {
        navigate(`/profile/${uid}`)
    }
    const dispatch = useDispatch()
    const { suggestions, auth } = useSelector(state => state)
    useEffect(() => {
        if (auth.user._id) {
            dispatch(userSuggestionAction())
        }
    }, [auth.user._id, dispatch])
    return (
        <div>
            <h6>Suggest users for you</h6>
            {
                suggestions.loading &&
                <div>Loading...</div>
            }
            {
                suggestions.users.length > 0 &&
                suggestions.users.map((userdata, index) => (
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <UserCardForSearch val={userdata} handleInfoClick={handleInfoClick} />
                        < FollowButton user={userdata} />
                    </div>
                ))
            }
            {
                suggestions.users.length === 0 &&
                <div>No suggestions for you...</div>
            }
        </div>
    )
}

export default SuggestedUser
