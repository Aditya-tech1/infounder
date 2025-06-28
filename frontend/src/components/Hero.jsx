'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GridLines } from '../../public/icons/icon';

export default function Hero() {
  return (
    <div className="flex flex-row w-[100%] h-[90vh] items-center justify-center gap-[8px] relative">
      <span className="gradient_cloud" />
      <GridLines className="absolute top-[0%] right-[15%] w-1/3 aspect-square z-10" />

      <div className="flex flex-col w-[50%] h-[100%] justify-center pl-[35px] gap-[12px]">
        <h1 className="text-[48px] text-[#DDDDDD] font-serif font-bold w-3/4 leading-tight drop-shadow-[0_1px_1px_#FF00BF]">
          Level up your presentation with AI feedback
        </h1>
        <p className="text-[30px] w-full italic font-extralight tracking-wider">
          Get real-time insights on your tone, <br /> body language, clarity, and slides.
        </p>
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(220, 0, 211, 0.8) 0%, rgba(12, 250, 245, 0.8) 100%)',
          }}
          className="flex flex-row w-fit rounded-full items-center justify-center"
        >
          <Link
            href="/upload"
            className="font-bold text-[24px] text-[#ffffff] p-[16px] px-[32px] border-white w-fit rounded-full drop-shadow-md  no-underline"
          >
            Try Free Demo
          </Link>
        </div>
      </div>

      <div className="h-[100%] w-[50%] relative">
        <Image
          src="/man.png"
          alt="pink man image"
          width={1920}
          height={1920}
          className="h-[100%] w-auto relative -right-[15%] z-10"
        />
      </div>
    </div>
  );
}


