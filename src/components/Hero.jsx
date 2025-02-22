import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useState } from 'react'
import { useEffect } from 'react'

const Hero = () => {
    useGSAP(() => {
        // gsap animation goes here
        gsap.to('#hero', {
            delay: 2,
            opacity: 1,
        })
        gsap.to('#cta', {
            delay: 2,
            opacity: 1,
            y: -50,
        })
    }, [])

    const [videoSrc, setVideoSrc] = useState(
        window.innerWidth > 768 ? heroVideo : smallHeroVideo
    )

    // Set the VideoSrc dynamically for small and larger screens.
    const handleVideoSrcSet = () => {
        if(window.innerWidth > 768) {
            setVideoSrc(heroVideo)
        }
        else {
            setVideoSrc(smallHeroVideo)
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleVideoSrcSet)
        return () => {
            window.removeEventListener('resize', handleVideoSrcSet)
        }
    }, [])

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p id='hero' className="hero-title">iPhone 15 Pro</p>
                <div className='md:w-10/12 w-9/12'>
                    <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}> {/* playsInline={true} is important for mobile  & pointer-event-none for avoid interruption of video through user.*/}
                        <source src={videoSrc} type='video/mp4'/>
                    </video>
                </div>
            </div>

            <div
                id='cta'
                className='flex flex-col items-center opacity-0 translate-y-20'
            >
                <a href="#highlights" className='btn'>Buy</a>
                <p className='font-normal text-xl'>From $199/month or $999</p>
            </div>
        </section>
    )
}

export default Hero
