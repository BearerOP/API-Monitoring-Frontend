"use client";
import React from "react";
import { ContainerScroll } from "@/Components/ui/container-scroll-animation";

const HeroScroll = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-bold text-white">
            Heads up! We’ve sent an email about the <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
               downtime.
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/api_graph_ss.png?alt=media&token=52b4399e-ba1f-466a-b15c-a641ace0d0de`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
};

export default HeroScroll;