import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/herosection/HeroSection";
import Category from "../../components/category/Category";
import HomeCard from "../../components/homepageproductcard/HomeCard";
import Track from "../../components/Track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import Homevideo from "../user/Homevideo";

// Loading screen


const Home = () => {
  

  useEffect(() => {
    // check if loading was already shown in this session
    const alreadyLoaded = sessionStorage.getItem("loadingShown");

    if (!alreadyLoaded) {
      setShowLoading(true);

      // hide loading after animation (adjust to your LoadingScreen timing)
      const timer = setTimeout(() => {
        setShowLoading(false);
        sessionStorage.setItem("loadingShown", "true");
      }, 3000); // match your GSAP animation duration

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      
       (
        <Layout>
          <Homevideo />
          <Track />
          <HeroSection />
          <Category />
          <Testimonial />
          <HomeCard />
        </Layout>
      )
    </>
  );
};

export default Home;
