import React, { useState } from 'react'
import styled from 'styled-components'
import Posts from '../../Posts/Posts'
import Layout from '../Layout/Layout'
import Status from '../Status/Status'
import MyModal from '../../utils/MyModal'
import { useDispatch, useSelector } from 'react-redux'
import { POST_CONSTANTS } from '../../actions/post.actions'
import ReactLoading from 'react-loading'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import { globalConstants } from '../../actions/actionConstants'
import axios from '../../utils/utils'
import SuggestedUser from './SuggestedUser'
const Home = () => {
    //lOAD MORE ACTIONS 
    const [loadingMOre, setloadingMOre] = useState(false)
    const [noMoreToload, setnoMoreToload] = useState(false)
    //lOAD MORE ACTIONS 
    const { posts } = useSelector(state => state)
    const dispatch = useDispatch()
    const handleLoadMore = async () => {
        try {
            setloadingMOre(true)
            const res = await axios.get(`/posts?limit=4&page=${posts.page + 1}`)
            if (res.status === 200) {
                if (res.data.posts.length > 0) {
                    dispatch({
                        type: POST_CONSTANTS.LOAD_MORE_POST,
                        payload: { results: res.data.results, posts: res.data.posts }
                    })
                } else {
                    setnoMoreToload(true)
                }
            }
            setloadingMOre(false)
        } catch (error) {
            return dispatch({
                type: globalConstants.ALERT,
                payload: { error: error.message }
            })
        }
    }
    return (
        <Layout>
            <MyModal />
            <HomeStyled>
                <LeftCont>
                    <Status />
                    {
                        posts.loadingPosts === true ?
                            <div style={{ display: 'flex', justifyContent: "center" }}> <ReactLoading type={`spin`} color="black" /></div>
                            :
                            posts.results === 0 ?
                                <div>No Posts</div>
                                :
                                <Posts />
                    }
                    {
                        loadingMOre ?
                            <div style={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <ReactLoading type={`spin`} color="black" />
                            </div>
                            :
                            null
                    }
                    <LoadMoreBtn noMoreToload={noMoreToload} page={posts.page} results={posts.results} handleLoadMore={handleLoadMore} />
                </LeftCont>
                <RightCont>
                    <SuggestedUser />
                </RightCont>
            </HomeStyled>
        </Layout>
    )
}

const HomeStyled = styled.div`
display: grid;
grid-template-columns: repeat(2,1fr);
`
const LeftCont = styled.div`
border-right: 1px solid lightgray;
`
const RightCont = styled.div`
`

export default Home