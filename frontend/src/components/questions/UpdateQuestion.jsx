import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getQuestionById, updateQuestion } from '../../utils/QuizService';
import { debounce } from "lodash";

function UpdateQuestion() {

  const [question ,setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);  
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  
  const {id} = useParams();

  useEffect(() =>{
    fetchQuestion()
  }, [])

  const fetchQuestion =  async () =>{
    try {
      const questionToUpdate = await getQuestionById(id); //api

      if(questionToUpdate){
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }

      setIsLoading(false);

    }catch (error) {
      console.log("error...didn't fetch question to be updated :   ", error);
    }
  }

  const handleTyping = debounce(() => {
    setIsTyping(false);
  }, 1300); 

  const handleQuestionChange = (e) =>{
    const newText = e.target.value;
    setQuestion(newText);
    setIsTyping(true);
    handleTyping(); 
  }
  
  const handleChoiceChange = (index, e) =>{
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;

    setChoices(updatedChoices);
  }

  const handleCorrectAnswerChange = (e) =>{
    setCorrectAnswers(e.target.value);
  }

  const handleQuestionUpdate = async (e)=>{
    e.preventDefault();

    try {
      const updatedQuestionData = {
        question,
        choices,
        correctAnswers: correctAnswers.toString().split(",").map((answer) => answer.trim())
      }

      await updateQuestion(id, updatedQuestionData);  //api

    } catch (error) {
        console.log("didn't update successfullt ::  ", error);
    }
  }

  if(isLoading){
    return  <div className='mt-20 text-xl'>Loading...</div>;
  }


  return (
    <section className='md:w-9/12 w-[90%] mx-auto mt-24 mb-8 p-4 flex flex-col justify-between items-start'> 
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-2/3 shadow-lg rounded-md p-6 mx-auto">
        <div className='bg-gray-200 py-2 px-6 sm:text-2xl text-xl border-b'>
          <h4>Update Quiz Question</h4>
        </div>

        <div className='p-4 bg-white border border-gray-300 rounded'>
           <form className='p-4' onSubmit={handleQuestionUpdate}>
              <div className='mt-4 my-2  relative'>
                <label htmlFor="subject" className='block  text-xl font-medium text-info mb-2'>Question :</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={question}
                  onChange={handleQuestionChange}
                /> 
                 {
                  isTyping && (
                    <div className="absolute bottom-3 right-3 flex items-center mb-2 mr-2">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-green-600"></div>
                    </div>
                  )
                }
              </div>

              {/* choices */}
              <div className='mt-4 mb-2'>
                <label htmlFor="subject" className='mb-2 block text-xl font-medium text-gray-700'>Choices :</label>
                {
                  choices.map((choice, index) => (
                    <input
                     key={index}
                     type="text" 
                     value={choice}
                     onChange={(e) => handleChoiceChange(index, e)}
                     className="w-full p-2 border rounded-md mb-2"
                    />
                  ))
                }
              </div>

              {/* for correct answer */}
              <div className='mt-6 mb-2'>
                <label htmlFor="subject" className='mb-2 block text-xl font-medium text-gray-700'>Correct Answer(s) :</label>
                <input
                     type="text" 
                     value={correctAnswers}
                     onChange={handleCorrectAnswerChange}
                     className="w-full p-2 border rounded-md"
                    />
              </div>

              <div className='flex sm:flex-row flex-col mt-10'>
                <button type='submit' className='border border-green-500 text-green-500 hover:bg-green-500 hover:shadow-md hover:text-white px-4 py-2 sm:mr-2 mr-0 mb-2 rounded'>
                  Update Question
                </button>

                {/* Todo : add link back to all question */}
                <Link to={"/all-quizzes"} className='border text-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:shadow-md hover:text-white px-4 py-2 sm:ml-2 ml-0 mb-2 rounded' > Existing Questions</Link>
              </div>

           </form>
        </div>
      </div>    
    </section>
  )
}

export default UpdateQuestion;