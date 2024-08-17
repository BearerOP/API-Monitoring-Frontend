import React from 'react';
import { LinkPreview } from "./ui/link-preview";
import { BackgroundGradientAnimation } from './ui/background-gradient-animation';

const isDevelopment = import.meta.env.MODE !== 'production';
let url = 'http://localhost:5173/dashboard/monitor';
if (!isDevelopment) {
  url = 'https://up-status-xi.vercel.app/dashboard/monitor';
}

const LinkPreviewHero = () => {
  return (
   <>
     <BackgroundGradientAnimation pointerColor='rgb("140, 100, 255")' fifthColor='(19, 179, 232)' size='150%'>
      <div className="z-10 h-screen w-screen flex flex-col items-center justify-center overflow-hidden font-bold text-xl lg:text-5xl md:text-4xl bg-black/70 drop-shadow-lg">
          <p className="text-neutral-100 dark:text-neutral-400  overflow-hidden">
            Getting started with{" "}
            <LinkPreview
              url={url}
              imageSrc="https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/api_graph_ss.png?alt=media&token=52b4399e-ba1f-466a-b15c-a641ace0d0de"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-pink-500"
            >
              api-monitoring
            </LinkPreview>{" "}
            &{" "}
          </p>
          <p className="text-neutral-100 dark:text-neutral-400 overflow-hidden">
            check your website{" "}
            <LinkPreview
              url={url}
              imageSrc="https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/api_log_ss.png?alt=media&token=46d71709-b0c9-44bc-b0bb-aee7d532686b"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
            >
              status
            </LinkPreview>{" "}
            with
          </p>
      </div>
    </BackgroundGradientAnimation>
   </>
  );
}

export default LinkPreviewHero;