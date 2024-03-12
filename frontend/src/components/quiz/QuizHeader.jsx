import React from "react";

function QuizHeader({ timer,lengthOfQuestion }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formatedTime = `${String(minutes).padStart(2, "0")} : ${String(
      remainingSeconds
    ).padStart(2, "0")}`;

    return formatedTime;
  };

  return (
    <div className="shadow-sm my-5 py-2 mt-20  bg-white z-10">
      <div className="w-11/12 mx-auto md:w-9/12 flex flex-col md:flex-row justify-between items-center">
        <div className="text-base md:w-1/2 mb-4 md:mb-0">
          <p>
            <span className="text-red-700">Attention!</span> You have {lengthOfQuestion*10} seconds
            to answer {lengthOfQuestion} questions.{" "}
          </p>
          <p>
            Please keep an eye on the timer and make sure to answer all
            questions before time runs out.
          </p>
          <p className="mt-4">
            <span className="text-blue-500 ">Note : </span>
            Questions may have more than one correct answers. Each Question has 10 points.
          </p>
        </div>
        {/* timer */}
        <div className="text-center md:text-right">
          <h1 className="text-xl text-green-700">{formatTime(timer)}</h1>
          <p>Time Consumed</p>
        </div>
      </div>
    </div>
  );
}

export default QuizHeader;
