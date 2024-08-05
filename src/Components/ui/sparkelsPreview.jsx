"use client";
import React from "react";
import { SparklesCore } from "./sparkles";
import TextGenerate from "../TextGenerate";
import { LinkPreview } from "./link-preview";

const isDevelopment = import.meta.env.MODE === 'production';
let url = 'http://localhost:5173/dashboard/monitor'
if (isDevelopment) {
  url = 'https://up-status-xi.vercel.app/dashboard/monitor';
}
export function SparklesPreview({ title }) {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="flex justify-center items-center flex-col px-4 ">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left ">
          Getting started with {" "}

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
        <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl  text-left ">
          check your website {" "}

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
      <h1 className="font-mono md:text-9xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 scale-150 ">
        <TextGenerate words={title} />
      </h1>
      <div className="w-[40rem] h-40 relative scale-100">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
