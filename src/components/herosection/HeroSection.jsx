import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ For internal routing

// Card data for the carousel
const cardData = [
  {
    title: "Urban Threads",
    subtitle: "Timeless designs for the contemporary wardrobe.",
    bgImage:
      "https://ik.imagekit.io/9hnt3q4il4/LANDING-lino_panarea.jpg_imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(2332.5,1000)?updatedAt=1755442236558",
    link: "productinfo/YensPvsLRNphDWGYPwcK",
  },
  {
    title: "Seasonal Collection",
    subtitle:
      "Functional streetwear for the city. Adapt to any scene, day or night.",
    bgImage:
      "https://ik.imagekit.io/9hnt3q4il4/LANDING-trajes2.jpg_imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(2332.5,1000)?updatedAt=1755442610638",
    link: "productinfo/Ido2Ngir3h8yv5H8pJ95",
  },
  {
    title: "Sustainable Style",
    subtitle:
      "Conscious fashion for a better future. Explore our eco-friendly garments.",
    bgImage:
      "https://ik.imagekit.io/9hnt3q4il4/LANDING-_punto_5.jpg_imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(2332.5,1000)",
    link: "productinfo/UQs3FMYTZB2rB0phSMrR",
  },
  {
    title: "New Arrivals",
    subtitle:
      "Fresh designs dropping daily. Be the first to wear the future of fashion.",
    bgImage:
      "https://ik.imagekit.io/9hnt3q4il4/TRAJES.jpg_imdensity=1&im=RegionOfInterestCrop,width=2048,height=878,regionOfInterest=(2332.5,1000)",
    link: "productinfo/IIjoVTetgw54kpIdkEmv",
  },
];

const HeroCarousel = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cardData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden mt-2">
      {/* Carousel slides */}
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
      >
        {cardData.map((card, index) => (
          <div key={index} className="flex-none w-full h-full relative">
            {/* Background Image */}
            <img
              src={card.bgImage}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Black overlay with low opacity */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Text content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
                {card.title}
              </h1>
              <p className="text-lg md:text-xl font-light max-w-2xl drop-shadow-lg mb-6">
                {card.subtitle}
              </p>
              {/* ✅ Discover Button with Link */}
              <Link to={card.link}>
                <button className="px-6 py-2 border border-white text-sm md:text-base hover:bg-white hover:text-black transition">
                  DISCOVER MORE
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {cardData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentCardIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// Main App component
export default function App() {
  return (
    <div className="bg-gray-100 h-[100vh] w-full">
      <HeroCarousel />
    </div>
  );
}
