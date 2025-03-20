"use client";
import React, { useState, useEffect } from "react";

const ComingSoonPage: React.FC = () => {
  const [days, setDays] = useState<number>(30);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Set the launch date to 1 month from now
  useEffect(() => {
    const launchDate: Date = new Date();
    launchDate.setMonth(launchDate.getMonth() + 1);

    const timer: NodeJS.Timeout = setInterval(() => {
      const now: Date = new Date();
      const difference: number = launchDate.getTime() - now.getTime();

      const d: number = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h: number = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const m: number = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const s: number = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (difference < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    // Main container - assuming sidebar and navbar are outside this component
    <div className="flex flex-col h-full w-full bg-gradient-to-r from-blue-50 to-indigo-100 p-6 overflow-auto justify-center items-center">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-12 h-12 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="z-10 bg-white bg-opacity-90 rounded-xl shadow-lg p-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-evenly">
          {/* Left Section - Logo and Title */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start mb-6 lg:mb-0">
            {/* Animated School Logo */}
            <div className="relative w-24 h-24 mx-auto lg:mx-0 mb-4">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 4.908 2.104a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3z"></path>
                  <path
                    d="M5.25 8.051a1 1 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 4.908 2.104a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84l1.673.718A1 1 0 015.25 8.05z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 text-center lg:text-left">
              Coming Soon!
            </h1>
            <p className="text-lg text-gray-600 mb-4 text-center lg:text-left">
              We're building something amazing for your educational journey
            </p>

            {/* Social Media Icons - Only visible on desktop */}
            <div className="hidden lg:block">
              <p className="text-gray-600 mb-2">Follow us:</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-pink-600 hover:text-pink-800 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Section - Timer and Animation */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-center px-4 mb-6 lg:mb-0">
            {/* Countdown Timer */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Launching In:
            </h2>
            <div className="flex justify-center space-x-2 lg:space-x-3">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex flex-col items-center justify-center text-white">
                <span className="text-xl font-bold">{days}</span>
                <span className="text-xs">Days</span>
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white">
                <span className="text-xl font-bold">{hours}</span>
                <span className="text-xs">Hours</span>
              </div>
              <div className="w-16 h-16 bg-blue-400 rounded-lg flex flex-col items-center justify-center text-white">
                <span className="text-xl font-bold">{minutes}</span>
                <span className="text-xs">Min</span>
              </div>
              <div className="w-16 h-16 bg-blue-300 rounded-lg flex flex-col items-center justify-center text-white">
                <span className="text-xl font-bold">{seconds}</span>
                <span className="text-xs">Sec</span>
              </div>
            </div>

            {/* Animated Education Illustration */}
            <div className="relative h-32 w-full mt-6">
              <div className="absolute left-1/3 bottom-0 w-4 h-20 bg-yellow-500 transform -rotate-6 animate-pulse"></div>
              <div className="absolute left-1/2 bottom-0 w-4 h-16 bg-yellow-500 transform rotate-6 animate-pulse"></div>
              <div className="absolute bottom-0 w-2/3 h-3 mx-auto left-0 right-0 bg-gray-800 rounded"></div>
              <div className="absolute right-1/3 bottom-3 w-8 h-8">
                <div className="w-full h-full rounded-full bg-blue-500 animate-bounce flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-4 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Deemcee. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ComingSoonPage;
