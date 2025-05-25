import { Link } from "@remix-run/react";
import { WavyBackground } from "~/components/WavyBackground";

export function HeroWavy() {
  return (
    <WavyBackground 
      className="max-w-4xl mx-auto px-4"
      colors={[
        "#FFE4E6", // Lightest red
        "#FECDD3", // Light red
        "#FDA4AF", // Soft red
        "#FB7185", // Medium red
        "#F43F5E", // Vibrant red
      ]}
      waveWidth={120}
      blur={12}
      speed="slow"
      waveOpacity={0.4}
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-primary tracking-tight text-center mb-6">
        beauty meets <br />
        <span className="font-normal">science</span>
      </h1>
      <p className="text-lg md:text-xl text-primary/80 text-center max-w-lg mx-auto mb-8">
        Harness the power of red light therapy to transform your hair from within. Revolutionary care that illuminates your natural beauty.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/collections/all"
          className="bg-primary text-contrast px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          shop now
        </Link>
        <Link
          to="/pages/science"
          className="bg-contrast text-primary border border-primary/20 px-8 py-3 rounded-full hover:border-primary/40 transition-colors"
        >
          learn more
        </Link>
      </div>
    </WavyBackground>
  );
} 