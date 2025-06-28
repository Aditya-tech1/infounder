import React from 'react'
import Image from 'next/image'

export default function About() {
    return (
        <div className='w-full h-screen' id='about'>
            <h1 className='text-[55px] text-center font-[serif] mt-16 mb-8 text-white'>
                About Us
            </h1>

            <div className='flex flex-row items-center justify-center px-24 h-[70%]'>
                {/* Image Container */}
                <div className='w-1/2 h-full flex items-center justify-center'>
                    <Image
                        src="/about.png"
                        alt='about illustration'
                        width={500}
                        height={500}
                        className='max-w-full h-auto'
                    />
                </div>

                {/* Text Container */}
                <div className='w-1/2 h-full flex items-center justify-start'>
                    <p className='text-[22px] leading-relaxed font-[serif] tracking-wide text-[#dddddd] max-w-[90%]'>
                     INFOUNDER is transforming the way founders prepare, refine, and deliver their pitch presentations by offering an intelligent, all-in-one platform designed specifically to meet the high standards of investors. The platform allows users to upload both their pitch video and presentation deck simultaneously, enabling a fully integrated analysis that mirrors real-world investor interactions. Leveraging advanced AI technology alongside proven industry best practices, Infounder provides detailed, quantitative feedback on key aspects of presentation delivery, including speaker confidence, vocal clarity, modulation, pacing, and body language. This empowers founders to understand not just how they sound, but how they appear to an audience—insights that are often overlooked but critically important. Simultaneously, Infounder conducts a thorough review of the pitch deck itself, assessing the overall structure, content depth, storytelling flow, and how well it aligns with what investors typically look for in a fundable startup. By combining both verbal and visual feedback in one seamless experience, Infounder helps founders craft pitches that are not only persuasive and professional but also tailored to resonate with investors. The ultimate goal is to ensure that every idea is presented with clarity, conviction, and maximum impact giving founders the confidence and polish they need to win attention and funding.

                    </p>
                </div>
            </div>
        </div>
    )
}
