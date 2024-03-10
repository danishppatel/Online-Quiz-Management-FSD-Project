import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
  
    <section className="lg:w-9/12 md:w-[90%] px-4 mx-auto mt-24 flex flex-col md:flex-row-reverse justify-between items-center">
      {/* right side */}
      <div className="md:w-1/2 w-full">
        <img
          src="/images/banner.png"
          alt="banner"
          className="w-full mx-auto"
        />
      </div>

      {/* left side */}
      <div className="md:w-1/2 w-full space-y-6 mb-5 ">
        <h2 className="lg:text-4xl text-3xl font-medium text-[#333] md:w-4/6 lg:leading-normal leading-normal mb-3 font-sans tracking-wide">
          Learn new concepts for each question
        </h2>
        <p className="py-2 mb-6 text-gray-500 pl-2 border-l-4 border-indigo-600 text-base subpixel-antialiased">
          We help you prepare for exams and quizzes
        </p>
        <div className="flex flex-col sm:flex-row gap-5 text-lg font-medium">
          <Link to="/quiz-stepper">
            <button className="bg-primary px-6 py-2 text-white rounded">
              Take Quiz
            </button>
          </Link>
          <button className="inline-flex items-center px-6 py-2 rounded border text-primary ml-3 hover:bg-primary hover:text-white transition-all duration-300 ease-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            Know more
          </button>
        </div>
      </div>
    </section>
  
  );
}

export default Home;
