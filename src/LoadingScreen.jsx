import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const LoadingScreen = ({ onFinish }) => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const subTextRef = useRef(null);
  const creditRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        // hide AFTER animation done
        setVisible(false);
        if (onFinish) onFinish();
      },
    });

    tl.fromTo(
      textRefs.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }
    );

    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );

    tl.fromTo(
      creditRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "+=0.2"
    );

    // Exit animation → aligned so total ~4s
    tl.to(containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
      delay: 1, // keeps loader total visible time ~4s
    });

    return () => {
      tl.kill();
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <h1 className="flex text-[10vw] md:text-[8vw] font-extrabold tracking-[0.2em]">
          {"DENVER".split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className="inline-block opacity-0"
            >
              {letter}
            </span>
          ))}
        </h1>
        <h2
          ref={subTextRef}
          className="opacity-0 text-[4vw] md:text-[2vw] tracking-[0.5em] font-light mt-2"
        >
          CLOTHING
        </h2>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p
          ref={creditRef}
          className="opacity-0 text-sm md:text-base tracking-wider uppercase"
        >
          created by rishav
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
