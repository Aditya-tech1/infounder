import React from 'react'
import Image from 'next/image'

export default function HowWorks() {
    return (
        <div className='w-4/5 m-auto h-screen' id='howWorks'>
            <h1 className='text-5xl text-center font-serif mt-24'>How We Work?</h1>


            <Image src="/workflow.png" alt='workflow of infounder' width={1920} height={1080} className='w-full h-auto pt-24' />
        </div>
    )
}
