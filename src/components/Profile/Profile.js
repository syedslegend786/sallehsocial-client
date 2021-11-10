import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { getProfileDataAction } from '../../actions/profile.actions'
import Layout from '../Layout/Layout'
import Info from './Info'
import MenuDiv from './MenuDiv'
const Profile = () => {

    const { uid } = useParams()
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.token && uid) {
            dispatch(getProfileDataAction(uid))
        }
    }, [uid, auth.token, dispatch])
    return (
        <Layout>
            {
                <ProfileStyled>
                    {profile.loading ? <div>loading</div> : < Info userdata={profile.user} loading={profile.loading} />}
                    <MenuDiv uid={uid} />
                </ProfileStyled>
            }
        </Layout >
    )
}

const ProfileStyled = styled.div`
`
export default Profile
