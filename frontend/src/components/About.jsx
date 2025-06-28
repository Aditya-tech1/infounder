import React from 'react'
import Image from 'next/image'

export default function About() {
    return (
        <div className='w-full h-screen' id='about'>
            <h1 className='text-[55px] text-center font-[serif] mt-16 mb-8 text-white'>
                About Us
            </h1>

            <div className='flex flex-row items-center justify-center px-[35px] h-[70%]'>
                {/* Image Container */}
                <div className='w-[50%] h-[100%] flex items-center justify-center'>
                    <Image
                        src="/about.png"
                        alt='about illustration'
                        width={500}
                        height={500}
                        className='max-w-[100%] h-[auto]'
                    />
                </div>

                {/* Text Container */}
                <div className='w-[50%] h-[100%] flex items-start justify-start'>
                    <p className='text-[18px] leading-relaxed font-[serif] tracking-wide text-[#dddddd] max-w-[90%] text-justify'>
                        INFOUNDER is an intelligent presentation coaching tool that helps you become a more confident and effective speaker by providing instant, targeted feedback. It analyzes your voice to improve your delivery, offering insights on tone, pace, clarity, and filler words so you can speak with greater confidence and impact. At the same time, it evaluates your body language—including posture, gestures, and eye contact—to help you build a stronger stage presence and connect better with your audience. Additionally, INFOUNDER offers slide-specific suggestions to ensure your spoken content aligns smoothly with your visuals, enhancing clarity and audience engagement. Whether you're preparing for a pitch, meeting, or keynote, INFOUNDER turns practice into measurable progress.
                    </p>
                </div>
            </div>
        </div>
    )
}
