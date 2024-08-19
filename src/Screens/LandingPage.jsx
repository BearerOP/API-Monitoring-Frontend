import React from 'react';
import Hero from '../Components/Hero.jsx';
import Cards from '../Components/Cards.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Navbar.jsx';
import '../Css/LandingPage.css';
import { Toaster } from "@/Components/ui/toaster";
import Testimonials from '@/Components/Testimonials.jsx';
import { Gallery } from './Gallery.jsx';
import HeroScroll from '@/Components/HeroScroll.jsx';
import LinkPreviewHero from '@/Components/LinkPreview.jsx';
import { BackgroundGradientAnimation } from '@/Components/ui/background-gradient-animation.jsx';
import ContactUs from './ContactUs.jsx';

function LandingPage() {
  return (
    <>
    <div className="App bg-[#0a0311] ">
      <Navbar className='bg-[#0a0311]'/>
      <Hero />
      <LinkPreviewHero/>
      <HeroScroll/>
      <Gallery/>
      <ContactUs/>
      <Cards/>
      <Testimonials/>
      <Footer />
    </div>
      <Toaster />
    </>
  );
}

export default LandingPage;
