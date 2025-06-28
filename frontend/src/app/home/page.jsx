import React from 'react'
import Navbar from '../../components/Navbar';
import Hero from "../../components/Hero";
import About from "../../components/About";
import HowWorks from "../../components/HowWorks";
import Features from '../../components/Features';
import Contact from "../../components/Contact";
export default function page() {
  return (
    <>
    <Navbar/>
      <Hero />
     
      <About />
      <HowWorks />
       <Features />
      <Contact/>
    </>

  )
}
