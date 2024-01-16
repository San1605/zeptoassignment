import React from 'react'

const Banner = () => {
    return (
        <div className='flex  items-center justify-center gap-10 p-1' style={{
            background: `url(https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.20.0/_next/static/media/eta_normal_sm_bg.5c27a237.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%"
        }}>
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.20.0/_next/static/media/eta_normal_left_sm_bg.bb207da3.png" alt='' />
            <div className='flex flex-col mb-2 items-center justify-center'>
                <span className='text-white text-md font-bold '>Delivery in</span>
                <span className='text-white font-[800] text-xl'>8 minutes</span>
            </div>
            <img src='https://cdn.zeptonow.com/web-static-assets-prod/artifacts/6.20.0/_next/static/media/eta_normal_right_sm_bg.e307813b.png' alt='' />

        </div>
    )
}

export default Banner
