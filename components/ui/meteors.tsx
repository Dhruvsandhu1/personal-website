"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<
    Array<{ left: string; top: string; animationDuration: string; animationDelay: string }>
  >([]);

  useEffect(() => {
    const generatedMeteors = new Array(number).fill(true).map(() => ({
      left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
      top: Math.floor(Math.random() * (400 - -400) + -400) + "px",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
      animationDelay: Math.floor(Math.random() * (0.8 - 0.2) + 0.2) + "s",
    }));
    setMeteors(generatedMeteors);
  }, [number]);

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        ></span>
      ))}
    </>
  );
};
