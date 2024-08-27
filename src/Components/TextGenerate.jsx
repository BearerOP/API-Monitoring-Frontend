'use client';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from './ui/text-generate-effect';

const words = `Introducing Avadhi`;

export default function TextGenerate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="font-manrope-light"
    >
      <TextGenerateEffect words={words} duration={2} filter={true} />
    </motion.div>
  );
}
