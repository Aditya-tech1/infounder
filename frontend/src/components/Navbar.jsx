import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='flex flex-row px-24 w-full items-center justify-between'>
      <h1 className='text-3xl font-extrabold flex items-center flex-row h-full text-[#ffffff]'>
        INFOUNDER
      </h1>
      <nav className='flex flex-row items-center justify-evenly gap-16 h-[10vh] w-1/2 text-base font-bold font-sans tracking-wider'>
        <Link href="/" className="text-[#ffffff] no-underline">Home</Link>
        <Link href="/#about" className="text-[#ffffff] no-underline">About</Link>
        <Link href="/#howWorks" className="text-[#ffffff] no-underline">How We Work?</Link>
        <Link href="/#features" className="text-[#ffffff] no-underline">Features</Link>
        <Link href="/#contact" className="text-[#ffffff] no-underline">Contact</Link>
      </nav>
    </div>
  )
}

