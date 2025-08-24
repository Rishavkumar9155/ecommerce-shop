import React from "react";
import { Link } from "react-router-dom";
const BackToWorkSection = () => {
  return (
    <section className="relative w-full h-screen mb-[1vh] mt-[1vh]">
      {/* Background Image */}
      <img
        src="https://ik.imagekit.io/9hnt3q4il4/17061273_68-99999999_01.jpg_ts=1748511427874&im=SmartCrop,width=2048,height=1430&imdensity=1"
        alt="Back to Work"
        className="w-full h-full object-cover object-[center_right] md:object-center"
      />

      

      {/* Overlay Text */}
      <div className="absolute w-full top-[60%] sm:top-1/2 sm:-translate-y-1/2 text-center text-white">
  <h1 className="text-3xl md:text-6xl font-bold">BACK TO WORK</h1>
 <Link to ="productinfo/DqM3VRaZ4LnDl0vXGkpe"> <button className="mt-4 uppercase px-6 py-2 border bg-white text-black border-white text-sm md:text-base hover:bg-black hover:text-white transition">
    DISCOVER your style
  </button>
  </Link>
</div>


    </section>
  );
};

export default BackToWorkSection;
