import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://ik.imagekit.io/brprnjytw/videoplayback%20(3)%20(online-video-cutter.com)%20(1).mp4?updatedAt=1756007916476"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-widest uppercase drop-shadow-lg">
          DENVER
        </h1>

        {/* Discover Button */}
      <Link to ="category/suit">  <button className="mt-6 px-8 py-2 border-2 border-white text-white text-sm md:text-base lg:text-lg font-light uppercase  bg-transparent hover:bg-white hover:text-black transition-all duration-300">
          Discover
        </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
