'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  };

  return (
    <Button
      aria-label="scroll to the top button"
      size="sm"
      className={`text-xs text-white h-10 w-10 bg-black hover:bg-black/80 dark:bg-transparent border-2 border-slate-700 backdrop-blur-md dark:hover:bg-white/5 fixed bottom-4 right-4 rounded-full p-2 outline-none scrollToTheTop transition-opacity duration-300 ${
        isVisible ? 'showBtn' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp />
    </Button>
  );
};
