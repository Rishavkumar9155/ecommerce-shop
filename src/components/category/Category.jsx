import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const category = [
  { name: "jacket", url: "https://ik.imagekit.io/9hnt3q4il4/17022894_99.jpg_ts=1749728119524&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "shirt", url: "https://ik.imagekit.io/9hnt3q4il4/87064423_99.jpg_ts=1737448463942&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "tshirt", url: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos/S/17052899_95.jpg?ts=1749654379521&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "suit", url: "https://shop.mango.com/assets/rcs/pics/static/T1/fotos_alt/S/17021185_08_01.jpg?ts=1749630129000&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "blazer", url: "https://ik.imagekit.io/9hnt3q4il4/17091232_99.jpg_ts=1753805093410&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "bags", url: "https://ik.imagekit.io/9hnt3q4il4/17081200_99_B.jpg_ts=1750352826559&im=SmartCrop,width=480,height=672&imdensity=1" },
  { name: "shoes", url: "https://ik.imagekit.io/9hnt3q4il4/hanfordd001025_6.jpg" }
];

const App = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto scroll effect
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      if (!isHovered) {
        const cardElement = scrollContainer.querySelector(".snap-center");
        const scrollAmount = cardElement ? cardElement.offsetWidth : scrollContainer.offsetWidth;
        if (Math.round(scrollContainer.scrollLeft) + scrollAmount >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [isHovered]);

  const scrollLeft = () => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    const cardElement = scrollContainer.querySelector(".snap-center");
    const scrollAmount = cardElement ? cardElement.offsetWidth : scrollContainer.offsetWidth;
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;
    const cardElement = scrollContainer.querySelector(".snap-center");
    const scrollAmount = cardElement ? cardElement.offsetWidth : scrollContainer.offsetWidth;
    scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div
      className="relative mt-[1vh] mb-[1vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Cards Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-scroll snap-x snap-mandatory h-[80vh] hide-scroll-bar gap-4"
      >
        {category.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/category/${item.name}`)}
            className="flex-none w-full md:w-1/2 lg:w-1/3 snap-center aspect-square bg-cover bg-top bg-no-repeat flex flex-col justify-start cursor-pointer transform transition duration-300 hover:scale-105 relative"
            style={{ backgroundImage: `url(${item.url})` }}
          >
            <div className="flex flex-col justify-center items-start h-full p-4 bg-black/20">
              <h1
                className="text-white font-light capitalize text-center"
                style={{ fontSize: "clamp(4rem, 5vw, 3rem)" }}
              >
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scroll-bar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .hide-scroll-bar::-webkit-scrollbar {
              display: none;
            }
          `,
        }}
      />
      
    </div>
  );
};

export default App;
