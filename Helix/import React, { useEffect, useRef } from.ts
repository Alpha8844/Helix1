import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ComingSoonPage = () => {
  const starsRef = useRef([]);
  const cometsRef = useRef([]);

  useEffect(() => {
    // Create stars animation
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'absolute w-1 h-1 bg-[#F7D938] rounded-full';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      starsRef.current.push(star);
      document.getElementById('starfield').appendChild(star);

      gsap.fromTo(star, 
        { opacity: 0, scale: 0 },
        { 
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 0.8 + 0.2,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true
        }
      );
    };

    // Create comet animation
    const createComet = () => {
      const comet = document.createElement('div');
      comet.className = 'absolute w-12 h-1 bg-gradient-to-r from-[#F7D938] to-transparent rounded-full';
      comet.style.left = '-48px';
      comet.style.top = `${Math.random() * 100}vh`;
      cometsRef.current.push(comet);
      document.getElementById('starfield').appendChild(comet);

      gsap.fromTo(comet,
        { x: -100 },
        {
          x: window.innerWidth + 100,
          duration: 2,
          ease: 'power1.inOut',
          onComplete: () => {
            comet.remove();
            cometsRef.current = cometsRef.current.filter(c => c !== comet);
          }
        }
      );
    };

    // Initialize stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }

    // Create comets periodically
    const cometInterval = setInterval(createComet, 5000);

    return () => {
      clearInterval(cometInterval);
      starsRef.current.forEach(star => star.remove());
      cometsRef.current.forEach(comet => comet.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div id="starfield" className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[#F7D938] text-6xl md:text-8xl font-bold mb-4 tracking-wider">
          HELIX
        </h1>
        <h2 className="text-[#F7D938] text-xl md:text-2xl text-center mb-4">
          Trading Telegram Bot on Movement Labs Chain
        </h2>
        <p className="text-[#F7D938] text-2xl md:text-3xl font-semibold">
          Coming Soon
        </p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
