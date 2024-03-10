import React, { useEffect, useState } from 'react'
import { deleteQuestion, getAllQuestions } from '../../utils/QuizService';
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { IoMdAlert } from "react-icons/io";
import { CgBrowser } from "react-icons/cg";


function GetAllQuiz() {
  
  const [questions, setQuestions] = useState([{id: "", question: "", correctAnswers: "", choices:[]}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] =useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  let correct_option;

  useEffect(()=>{
    fetchAllQuestion();
  },[])

  const fetchAllQuestion = async ()=>{
    try {
     
      const data =  await getAllQuestions();  //api

      setQuestions(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error...Question is not fetched.");
    }
  }

  console.log(questions)


  const handleDelete = async (id)=>{
    try {
      await deleteQuestion(id); //api

      const remainingQuestions =  questions.filter((question) => question.id !== id);
      setQuestions(remainingQuestions);
      setIsQuestionDeleted(true);
      setDeleteSuccessMessage("Question Deleted Successfully!")
    } catch (error) {
      toast.error("Error...Question is not Deleted.");
      
    }

    setTimeout(()=>{
      setDeleteSuccessMessage("");
      setIsQuestionDeleted(false);
    },4000)
  }

  if(isLoading){
    return  <div className='mt-20 text-xl'>Loading...</div>;
  }

  return (
    <section className='container mt-20'>
      <div className="grid grid-cols-2 gap-4 sm:ml-28 sm:mx-0 mx-4 bg-slate-50 shadow-lg mb-4">
        <div className="p-5">
          <h4 className='font-serif sm:text-3xl text-lg px-2'>All Quiz Questions</h4>
        </div>
        <div className="p-5 flex justify-end items-center">
          <FaPlus style={{ color: '#429af1' }} />
          <Link to={"/create-quiz"} className='sm:text-xl text-lg lg:pr-4 text-blue-500 underline'>Add Question</Link>
          
        </div>
      </div>

      

      {/* to display deleted message */}
      {
        isQuestionDeleted && (
          <div className="text-gray-500 sm:text-2xl text-xl flex items-center sm:ml-28 sm:mx-0 mx-4 mt-8 p-4" role="alert"><IoMdAlert style={{height:'30px',width:'30px', marginRight:'3px'}}/>{deleteSuccessMessage}</div>
        )
      }

     <div className='sm:ml-32 ml-6 sm:mr-36 mr-6'>
        <div className='flex items-center mt-8'>
            <CgBrowser size={30}/>
            <h2 className='ml-2 text-3xl font-semibold '>Quiz Questions: </h2>
        </div>
     {/* display existing questions from the databases */}
     {
         questions.map((question, index) => (
          <div key={index}>
            {/* question */}
            <h4 className='text-black sm:text-xl text-lg mt-16'>{`${index + 1}. ${question.question}`}</h4>
      
            {/* options */}
            <ul className='ml-5'>
              {question.choices.map((choice, index) => (
                <li key={index} className='mt-1'>{choice}</li>
              ))}
            </ul>
          {
           
          }
      
            <p className='text-green-600 mt-4 ml-2 '>Correct Answer:  {(question.correctAnswers.length > 1) ? question.correctAnswers.join(', '): question.correctAnswers[0]}</p>
      
            <div className='flex sm:flex-row flex-col mt-4 mx-2'>
          
              <Link to={`/update-question/${question.id}`} className='border text-center border-primary text-primary hover:bg-primary hover:shadow-md hover:text-white px-4 py-2 sm:mr-2 mr-0 mb-2 rounded' > Edit Question</Link>
      
              {/* delete question from the database */}
              <button
                className='border border-red-500 text-red-500 hover:bg-red-600 hover:shadow-md hover:text-white px-4 py-2 sm:ml-2 ml-0 mb-2 rounded'
                onClick={() => handleDelete(question.id)}
              >
                Delete Question
              </button>
            </div>
          </div>
        ))
      
     } 
     </div>
           
    </section>
  )
}

export default GetAllQuiz;