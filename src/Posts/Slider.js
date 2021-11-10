import React from 'react'
import { Carousel } from 'react-bootstrap'

const Slider = ({ images }) => {
    return (
        <Carousel>
            {
                images.map((val, index) => {
                    return (
                        <Carousel.Item
                            key={index}
                            style={{
                                height: "350px",
                            }}>
                            {
                                val.url.includes('video')
                                    ?
                                    <video
                                        className="d-block w-100 h-100"
                                        controls
                                        src={val?.url}
                                        alt=''
                                    />
                                    :
                                    < img
                                        className="d-block w-100 h-100"
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                        src={val?.url}
                                        alt={val?.url}
                                    />
                            }

                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}

export default Slider
