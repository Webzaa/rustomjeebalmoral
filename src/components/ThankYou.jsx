import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[#e8eef3] flex items-center justify-center px-6">
      <div className="w-full max-w-[900px] text-center">

        {/* Envelope */}
        <div className="flex justify-center mb-[70px]">
          <svg
            width="240"
            height="190"
            viewBox="0 0 240 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Thank you"
          >
            {/* Envelope body */}
            <rect
              x="20"
              y="15"
              width="200"
              height="160"
              rx="22"
              fill="#000000"
            />

            {/* White envelope flap */}
            <path
              d="M24 43L103 105C113 113 127 113 137 105L216 43"
              stroke="#F5F5F5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Black inner flap */}
            <path
              d="M24 35C24 23.954 32.954 15 44 15H196C207.046 15 216 23.954 216 35L132 98C125 103.25 115 103.25 108 98L24 35Z"
              fill="#000000"
            />

            {/* White envelope flap line */}
            <path
              d="M24 40L101 102C112 111 128 111 139 102L216 40"
              stroke="#F5F5F5"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="
            text-black
            font-extrabold
            text-[48px]
            sm:text-[58px]
            md:text-[68px]
            leading-none
            tracking-[-0.04em]
          "
        >
          THANK YOU!
        </h1>

        {/* Content */}
        <div
          className="
            mt-8
            text-black
            text-[18px]
            sm:text-[21px]
            md:text-[24px]
            leading-[1.6]
            font-normal
          "
        >
          <p>
            Thank you for expressing interest on our website.
          </p>

          <p>
            Our expert will get in touch with you shortly.
          </p>

          <p className="mt-1">
            You will be redirected in {seconds} seconds
          </p>
        </div>
      </div>
    </main>
  );
}