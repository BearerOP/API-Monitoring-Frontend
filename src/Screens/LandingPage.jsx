import React from 'react';
import Hero from '../Components/Hero.jsx';
import Cards from '../Components/Cards.jsx';
import Features from '../Components/Features.jsx';
import Integration from '../Components/Integration.jsx';
import Testimonials from '../Components/Testimonials.jsx';
import CTA from '../Components/CTA.jsx';
import Footer from '../Components/Footer.jsx';
import Navbar from '../Components/Navbar.jsx';
import '../Css/LandingPage.css';

function LandingPage() {
  return (
    <div className="App bg-[#0a0311] ">
      <Navbar className='bg-[#0a0311]'/>
      <Hero />
      <Cards/>
      <Features />
      <Integration />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
