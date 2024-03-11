import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchQuizForUser } from '../../utils/QuizService';
import QuizHeader from './QuizHeader';
import AnswerOptions from '../../utils/AnswerOptions';



const Quiz = () => {
	const [quizQuestions, setQuizQuestions] = useState([
		{ id: "", correctAnswers: "", question: "", questionType: "" }
	])

	const [selectedAnswers, setSelectedAnswers] = useState([{ id: "", answer: "" }])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [totalScores, setTotalScores] = useState(0)
	const [showResult, setShowResult] = useState(false);
	const [loading, setLoading] = useState(false);
	const [timer ,setTimer] =useState(quizQuestions.length*10); //timer
	const [timerIntervalId ,setTimerIntervalId] =useState('');
	const [status, setStatus] = useState('');



	const location = useLocation()

	// Create a ref for the timer
	const timerRef = useRef(quizQuestions.length * 10);


	// console.log(quizQuestions.length)


	// const navigate = useNavigate();

	const { selectedSubject, selectedNumOfQuestions } = location.state || {}


	useEffect(() => {
		fetchQuizData();

		const intervalId =setInterval(()=> {
			setTimer((prevTimer) => {
				// console.log(prevTimer,"fj")
				timerRef.current = prevTimer - 1;
      		    return prevTimer - 1;
			});

			if (timerRef.current <= 0) {
				clearInterval(intervalId);
				handleSubmit(); // Auto-submit when timer is 0
			  }
		}, 1000);
	
		setTimerIntervalId(intervalId);

		return () => {
			clearInterval(intervalId);
		};

	}, [])

	const fetchQuizData = async () => {
		if (selectedNumOfQuestions && selectedSubject) {
			
			const numOfQuestions =parseInt(selectedNumOfQuestions, 10);
			
			const questions = await fetchQuizForUser(numOfQuestions, selectedSubject);			

			setQuizQuestions(questions);

			setTimer(questions.length * 10); // Update the timer here
		}
	}

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(answer)
				? answer.map((a) => a.charAt(0))
				: answer.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer }
				
				return updatedAnswers;

			} else {
				const newAnswer = { id: questionId, answer: selectedAnswer }

				return [...prevAnswers, newAnswer]
			}
		})
	}

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((answer) => answer.id === questionId)
		if (!selectedAnswer) {
			return false
		}
		if (Array.isArray(selectedAnswer.answer)) {
			return selectedAnswer.answer.includes(choice.charAt(0))
		}

		return selectedAnswer.answer === choice.charAt(0)
	}

	const handleCheckboxChange = (questionId, choice) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((answerObj) => answerObj.id === questionId)
			const selectedAnswer = Array.isArray(choice)
				? choice.map((c) => c.charAt(0))
				: choice.charAt(0)

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers]
				const existingAnswer = updatedAnswers[existingAnswerIndex].answer;

				let newAnswer;

				if (Array.isArray(existingAnswer)) {
					newAnswer = existingAnswer.includes(selectedAnswer)
						? existingAnswer.filter((a) => a !== selectedAnswer)
						: [...existingAnswer, selectedAnswer]
				} else {
					newAnswer = [existingAnswer, selectedAnswer]
				}
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: newAnswer };

				return updatedAnswers
			} else {
				const newAnswer = { id: questionId, answer: [selectedAnswer] }

				return [...prevAnswers, newAnswer]
			}
		})
	}


	const handleSubmit = () => {
	
		window.scrollTo({top: 0 , behavior: "smooth"});
	
		setLoading(true); //loading
		
		clearInterval(timerIntervalId);
		
		let scores = 0;

		setTimeout(()=>{

			quizQuestions.forEach((question) => {
				const selectedAnswer = selectedAnswers.find((answer) => answer.id === question.id);
				
				if (selectedAnswer && selectedAnswer.answer !== '') {
					
					const selectedOptions = Array.isArray(selectedAnswer.answer)
						? selectedAnswer.answer.map((option) => option.charAt(0))
						: [selectedAnswer.answer.charAt(0)];
			
					const correctOptions = Array.isArray(question.correctAnswers)
						? question.correctAnswers.map((option) => option.charAt(0))
						: [question.correctAnswers.charAt(0)];

			
					const isCorrect = selectedOptions.length === correctOptions.length && selectedOptions.every((option) => correctOptions.includes(option));
					if (isCorrect) {
						scores++;
					}
				}
			});

			setTotalScores(scores); //set the score
		
			const number_Of_Questions =  quizQuestions.length;
		
			const percentage =  Math.round((scores/number_Of_Questions)* 100);

			const newStatus =  (percentage >=50) ? "Passed" : "Failed";
			setStatus(newStatus);

			setShowResult(true);
			setLoading(false);

		}, 5000)
	};

	// restartQuiz btn
	const restartQuiz = () => {
		setSelectedAnswers([]);
		setCurrentQuestionIndex(0); // Reset to the first question
		setTotalScores(0);
		setShowResult(false);
		setLoading(false);
		
		// Clear the existing interval
		clearInterval(timerIntervalId);
		
		setTimer(quizQuestions.length * 10);

		const intervalId = setInterval(() => {
			setTimer((prevTimer) => {
				timerRef.current = prevTimer - 1;
				return prevTimer - 1;
			});

			if (timerRef.current <= 0) {
				clearInterval(intervalId);
				handleSubmit(); // Auto-submit when timer is 0
			}
			
		}, 1000);
		
		timerRef.current = quizQuestions.length *10;
	
		setTimerIntervalId(intervalId);
		// console.log("interval id : ", timerIntervalId);
	}
	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
		} else {
			handleSubmit()
		}
	}

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
		}
	}

	const formatTime = (seconds) =>{
		const minutes = Math.floor(seconds/60);
		const remainingSeconds = seconds % 60;
		const formatedTime =`${String(minutes).padStart(2, "0")} : ${String(remainingSeconds).padStart(2, "0")}`;

		return formatedTime;
	}

	return (
      <section className="p-5">
        <QuizHeader timer={timer} lengthOfQuestion={quizQuestions.length} />

		<div className="md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start">
			<div className="md:w-[70%] w-full">
				{
				quizQuestions && (
					<div className="m-2 py-3 px-4 shadow-sm border border-gray-200 rounded">
						<p className="flex items-center rounded text-xs p-2 cursor-pointer">
							<span className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-green-800 mr-3 ">
								{currentQuestionIndex + 1}
							</span>
							<span className="text-base block">{quizQuestions[currentQuestionIndex]?.question}</span>
						</p>

						{/* show answers */}
						<div className="grid grid-cols-1 gap-4 mt-2">
							<AnswerOptions
							question={quizQuestions[currentQuestionIndex]}
							isChecked={isChecked}
							handleAnswerChange={handleAnswerChange}
							handleCheckboxChange={handleCheckboxChange}
							/>						
						</div>

					</div>
					)
				}

				
	            {/*pagination  */}
				<div className="flex justify-between mt-4">
					{currentQuestionIndex !== 0 && (
						<button onClick={handlePreviousQuestion} className="bg-primary px-6 py-2 text-white rounded ml-3">
						Previous
						</button>
					)}

					{currentQuestionIndex === quizQuestions.length - 1 ? (
						<button
						onClick={handleNextQuestion} 
						className="bg-blue-700 px-6 py-2 text-white rounded mr-3"
						disabled={
							!selectedAnswers.find(
							(answer) =>
								answer.id === quizQuestions[currentQuestionIndex]?.id || answer.answer.length > 0
							)
						}
						>
						Submit Quiz
						</button>
					) :
				    (
						<button
						onClick={handleNextQuestion}
						className={`bg-primary px-6 py-2 text-white rounded mr-3 ${currentQuestionIndex === 0 ? 'ml-auto' : ''}`}
						disabled={
							!selectedAnswers.find(
							(answer) =>
								answer.id === quizQuestions[currentQuestionIndex]?.id || answer.answer.length > 0
							)
						}
						>
						Next
						</button>
					)}
				</div>	   
		    </div>

			<div className='md:w-[30%] w-full ml-6 p-4'>
             {
                 showResult && (
                     <div>
                         <h3 className='text-2xl font-medium'>Your Score:</h3>
                         <div className='h-[230px] w-[230px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]'>
                             <h3 className={`text-xl ${status === 'Passed' ? "text-green-800" : "text-red-500"}`}>{status}</h3>
                             <h1 className='text-3xl font-bold my-2'>{totalScores * 10} <span className='text-slate-800'>/{quizQuestions.length*10}</span></h1>
							 <h4 className='text-xl '> Your Score : { Math.round((totalScores /quizQuestions.length) *100)}%</h4>
                             <p>Total Time : <span> {formatTime((quizQuestions.length*10 )- timer)} <span> sec.</span> </span></p>
                         </div>
                         <button onClick={restartQuiz} className='bg-primary px-6 py-2 text-white rounded mt-8 w-full'>Restart</button>
                     </div>
                 )
             }

             {
               loading && <Loading/>
             }
           </div>


			
		</div>

    </section>

	)
}

export default Quiz;

const Loading = () =>( 
	<div className='h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]'>
		<p className='text-xl text-gray-500'>Loading...</p>
	</div>
);


