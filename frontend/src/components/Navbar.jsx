import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex flex-row px-24 w-full items-center justify-between'>
      <h1 className='text-3xl font-extrabold flex items-center flex-row h-full'>
        INFOUNDER
      </h1>
    <nav className='flex flex-row items-center justify-evenly gap-16  h-[10vh] w-1/2 text-base font-bold font-sans tracking-wider'>
      <Link href="/">Home</Link>
      <Link href="/#about">About</Link>
      <Link href="/#howWorks" >How We Work?</Link>
      <Link href="/#features">Features</Link>
      <Link href="/#contact">Contact</Link>
    </nav>
    </div>
  )
}
