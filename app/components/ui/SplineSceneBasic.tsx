'use client'; // Note: 'use client' is specific to Next.js App Router, but Spline needs client-side rendering.

import React from 'react'; // Add React import
import { SplineScene } from '~/components/ui/SplineScene'; // Use Hydrogen path alias
import { Card } from '~/components/ui/Card'; // Use our minimal Card
// Spotlight component omitted for simplicity in this integration
// import { Spotlight } from "~/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] md:h-[600px] bg-black/[0.96] relative overflow-hidden border-none shadow-xl">
      {/* Spotlight removed */}
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      /> */}

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 relative z-10 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 mb-4">
            Explore the Science
          </h1>
          <p className="mt-2 text-lg md:text-xl text-neutral-300 max-w-lg mx-auto md:mx-0">
            Understand the technology behind Care•Atin Photonique Touch and how red light therapy promotes healthier hair.
          </p>
          {/* Optional: Add a CTA button here later */}
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 h-[250px] md:h-full relative">
          {/* Ensure Spline takes full height/width of its container */}
          <SplineScene
            // You can find more scenes or create your own at Spline.design
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="absolute top-0 left-0 w-full h-full md:h-full! w-full!"
          />
        </div>
      </div>
    </Card>
  );
} 