import React from 'react'
import Navbar from '../../components/Navbar';
import Features from '../../components/Features';
import About from "../../components/About";
import HowWorks from "../../components/HowWorks";
import Hero from "../../components/Hero";
import Contact from "../../components/Contact";
export default function page() {
  return (
    <>
    <Navbar/>
      <Hero />
      <Features />
      <About />
      <HowWorks />
      <Contact/>
    </>

  )
}
