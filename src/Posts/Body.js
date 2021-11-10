import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from './Slider'

const Body = ({ _val }) => {
    const [readmore, setreadmore] = useState(false)
    return (
        <PostBody>
            {
                _val.content &&
                <div>
                    <span>
                        {
                            _val.content.length < 64
                                ?
                                _val.content
                                :
                                readmore ?
                                    _val.content
                                    :
                                    _val.content.slice(0, 64)
                        }
                    </span>
                    {_val.content.length > 64 &&
                        <span onClick={() => setreadmore(!readmore)} style={{
                            color: "crimson",
                            cursor: "pointer",
                        }}>
                            {readmore ? "....Hide" : "....Read more"}
                        </span>
                    }
                </div>
            }
            <div style={{
                padding: "1.5rem",
            }}>
                {
                    _val.images.length > 1
                        ?
                        <Slider images={_val.images} />
                        :
                        _val.images[0].url.includes('video')
                            ?
                            <video
                                className="d-block w-100 h-100"
                                controls
                                src={_val.images[0].url} alt={_val.images[0].url}
                                alt=''
                            />
                            :
                            < img style={{
                                height: '350px',
                                width: "100%",
                                objectFit: 'cover',
                            }} src={_val.images[0].url} alt={_val.images[0].url} />
                }
            </div>
        </PostBody>
    )
}
const PostBody = styled.div`

`
export default Body
