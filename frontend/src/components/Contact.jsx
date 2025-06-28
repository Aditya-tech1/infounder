import React from 'react';

export default function Contact() {
  return (
    <div className="w-4/5 m-auto h-screen flex flex-col items-center justify-center" id="contact">
      <h1 className="text-[55px] text-center font-[serif] mb-[3rem] text-white">Contact</h1>

      <form className="w-full max-w-[700px] flex flex-col gap-[1.5rem]">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-[16px] border border-[#888888] rounded-[12px] bg-transparent text-[#ffffff] text-[18px] font-[serif] focus:outline-none focus:border-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-[16px] border border-[#888888] rounded-[12px] bg-transparent text-[#ffffff] text-[18px] font-[serif] focus:outline-none focus:border-white"
        />
        <textarea
          rows={6}
          placeholder="Your Message"
          className="w-full p-[16px] border border-[#888888] rounded-[12px] bg-transparent text-[#ffffff] text-[18px] font-[serif] resize-none focus:outline-none focus:border-white"
        ></textarea>

        <button
          type="submit"
          className="mt-[1rem] px-[40px] py-[16px] text-[20px] font-bold text-[#ffffff] rounded-full bg-gradient-to-r from-[#DC00D3] to-[#0CFAF5] hover:opacity-90 transition duration-300 ease-in-out w-fit self-center"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}


