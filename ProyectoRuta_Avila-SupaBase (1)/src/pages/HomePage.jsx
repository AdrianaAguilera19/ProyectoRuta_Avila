import React from 'react';
import Hero from '../components/Hero';
import Welcome from '../components/Welcome';
import MissionVisionObjective from '../components/MissionVisionObj';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Hero />
      <Welcome />
      <MissionVisionObjective />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;