"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import TextGenerate from "../TextGenerate";
import { LinkPreview } from "./link-preview";
import { motion } from "framer-motion";

const isDevelopment = import.meta.env.MODE === 'production';
let url = 'http://localhost:5173/dashboard/monitor';
if (isDevelopment) {
  url = 'https://up-status-xi.vercel.app/dashboard/monitor';
}

export function SparklesPreview({ title }) {
  return (
    <>
      <div className="h-screen w-full bg-[#0a0311] flex flex-col items-center justify-center overflow-hidden rounded-md pt-[120px]">
        <div className="flex flex-col items-center justify-center">
          <span className="text-center text-white relative sm:-bottom-3 md:-bottom-4 lg:-bottom-6 z-20 sm:text-5xl md:text-6xl lg:text-8xl">
            <TextGenerate words={title} />
          </span>
          <div className="w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-2/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-[5px] w-1/4 blur-md" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-px w-1/4" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-700 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.2}
              maxSize={1.2}
              particleDensity={1600}
              className="w-full h-full"
              particleColor="#a855f7"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-[#0a0311] [mask-image:radial-gradient(350px_200px_at_top,transparent_30%,white)]"></div>
          </div>
        </div>
        <motion.div
          className="text-2xl md:text-4xl text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }} // Adjust delay and duration as needed
        >
          <span className="font-manrope-light">
            Keep your web status clear and reliable.
          </span>
        </motion.div>
      </div>
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="flex justify-center items-center flex-col px-4">
          <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left">
            Getting started with{" "}
            <LinkPreview
              url={url}
              imageSrc="src/assets/images/api_graph_ss.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-pink-500"
            >
              api-monitoring
            </LinkPreview>{" "}
            &{" "}
          </p>
          <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left">
            check your website{" "}
            <LinkPreview
              url={url}
              imageSrc="src/assets/images/api_log_ss.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
            >
              status
            </LinkPreview>{" "}
            with
          </p>
        </div>
      </div>
    </>
  );
}