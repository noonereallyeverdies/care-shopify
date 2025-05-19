import React, { useMemo, useRef } from "react";
import { cn } from "~/lib/utils";
import { useDimensions } from "~/components/hooks/use-debounced-dimensions";
import { ErrorBoundary } from "react-error-boundary";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('randomInt requires numeric arguments');
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error('colors must be a non-empty array');
  }

  if (typeof speed !== 'number' || speed <= 0) {
    throw new Error('speed must be a positive number');
  }

  if (!['light', 'medium', 'heavy'].includes(blur)) {
    throw new Error('blur must be one of: light, medium, heavy');
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width || 0, dimensions.height || 0),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error rendering animated gradient</div>}>
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div className={cn(`absolute inset-0`, blurClass)}>
          {colors.map((color, index) => {
            if (typeof color !== 'string' || !color) {
              console.error(`Invalid color at index ${index}`);
              return null;
            }
            return (
              <svg
                key={index}
                className="absolute animate-background-gradient"
                style={
                  {
                    top: `${Math.random() * 50}%`,
                    left: `${Math.random() * 50}%`,
                    "--background-gradient-speed": `${1 / speed}s`,
                    "--tx-1": Math.random() - 0.5,
                    "--ty-1": Math.random() - 0.5,
                    "--tx-2": Math.random() - 0.5,
                    "--ty-2": Math.random() - 0.5,
                    "--tx-3": Math.random() - 0.5,
                    "--ty-3": Math.random() - 0.5,
                    "--tx-4": Math.random() - 0.5,
                    "--ty-4": Math.random() - 0.5,
                  } as React.CSSProperties
                }
                width={circleSize * randomInt(0.5, 1.5)}
                height={circleSize * randomInt(0.5, 1.5)}
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="50"
                  fill={color}
                  className="opacity-30 dark:opacity-[0.15]"
                />
              </svg>
            );
          })}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export { AnimatedGradient }; 