"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `U p - S t a t u s`;

export default function TextGenerate() {
  return <TextGenerateEffect duration={2} filter={true} words={words} />;
}
