import React from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-white w-full py-16",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto right-1/2 h-48 overflow-visible bg-gradient-conic from-red-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="absolute inset-auto left-1/2 h-48 bg-gradient-conic from-transparent via-transparent to-red-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-white bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-white h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-32 w-full translate-y-12 scale-x-150 bg-white blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-32 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-24 w-[28rem] -translate-y-1/2 rounded-full bg-red-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-24 w-64 -translate-y-[4rem] rounded-full bg-red-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[5rem] bg-red-400"
        ></motion.div>

        <div className="absolute inset-auto z-40 h-32 w-full -translate-y-[8rem] bg-white"></div>
      </div>

      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

export const LampDemo = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
      >
        The Science of Glow
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 max-w-2xl text-center text-lg text-gray-600"
      >
        Our revolutionary red light therapy technology harnesses the power of specific wavelengths to stimulate cellular regeneration and enhance natural hair growth processes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl"
      >
        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cellular Activation</h3>
          <p className="text-gray-600">Stimulates mitochondrial function and ATP production for enhanced cellular energy and growth.</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Increased Blood Flow</h3>
          <p className="text-gray-600">Improves circulation to hair follicles, delivering essential nutrients for optimal hair health.</p>
        </div>

        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Collagen Production</h3>
          <p className="text-gray-600">Boosts natural collagen synthesis for stronger, more resilient hair structure.</p>
        </div>
      </motion.div>
    </LampContainer>
  );
}; 