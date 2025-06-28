import React from 'react'
import Image from 'next/image'

export default function About() {
    return (
        <div className='w-full h-screen  ' id='about'>
            <h1 className='text-5xl text-center font-serif mt-24'>About Us</h1>

            <div className='flex flex-row items-center justify-center p-24 text-justify h-full  '>
                <div className=' w-1/2 h-full flex items-start  justify-center'>
                    <Image src="/about.png" alt='about illustration' width={500} height={500} className='w-1/2 w-auto' />
                </div>
                <div className='w-1/2 flex h-full items-start justify-start '>
                    <p className='h-full text-base font-sans tracking-wider text-[#dddddd]'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit veritatis similique omnis esse saepe voluptate dolore illum, repudiandae odio, maiores corporis modi soluta totam. Amet accusantium illum, natus dolores officia ab iusto odit recusandae corporis aut cum optio ducimus! Esse alias voluptate quo quis doloribus consequatur voluptatem repudiandae ab perferendis optio tempore quidem minus incidunt minima dignissimos sit totam dolores velit dolor, in quibusdam? Debitis, laborum. Laborum, quam. Adipisci vero modi pariatur assumenda tempora doloremque aspernatur illum, quas vitae tempore aliquid atque nihil aliquam est nobis expedita magni architecto aut a eos. Ex beatae quibusdam velit quos exercitationem molestiae hic.
                    </p>
                </div>
            </div>
        </div>
    )
}