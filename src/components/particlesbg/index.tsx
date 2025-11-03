"use client";

import dynamic from "next/dynamic";

// Dynamically import ParticlesBg with SSR disabled
const ParticlesBg = dynamic(() => import("particles-bg"), { ssr: false });

export default function BlueParticlesBackground() {
  return (
  
   
      <ParticlesBg
        type="cobweb"          // "cobweb" gives connected blue lines
        bg={true}              // make it full background
        color="#60A5FA"        // Tailwind blue-400
        num={150}              // number of particles
      />
      
   
  );
}