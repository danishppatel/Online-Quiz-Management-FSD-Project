import React, { useEffect, useState } from 'react'
import { createQuestion, getSubjects } from '../../utils/QuizService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { debounce } from "lodash";

function AddQuestion() {

  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices , setChoices] = useState(["A."]);
  const [correctAnswers ,setCorrectAnswers] =useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject , setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] =useState([""])
  const [isTyping, setIsTyping] = useState(false);

  const notify = () => {
    toast("Question Created Successfully!", {
      position: "top-right",
      className: "toast-message-success",
    })
  };


  useEffect(()=>{
    fetchSubjects();
  }, []);
  

  const fetchSubjects = async ()=>{
    try {
      const subjectData = await getSubjects();
    
      //set Subject
      setSubjectOptions(subjectData);
      
    } catch (error) {
      //later on toast
      toast.error("Something went to wrong...");
    }
  }
 
  const handleAddChoice = async () =>{
    const lastChoice = choices[choices.length-1];
    const lastChoiceLetter = lastChoice   ? lastChoice.charAt(0) : 'A';
    const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1);
    const newChoice =`${newChoiceLetter}.`;

    if(choices.length === 0){
      setChoices([...choices, 'A.']);
    }
    else{
      setChoices([...choices, newChoice]);
    }
  }

  const handleRemoveChoice = (index) =>{
    const remainingChoice = choices.filter((choice ,i) => i !== index);
    setChoices(remainingChoice);
  }

  const handleChoiceChange = (index, value) =>{
    const changeChoice = choices.map((choice, i) => ( (i === index) ? value : choice));
    setChoices(changeChoice);
  }

  const handleCorrectAnswerChange = (index, value) =>{
    const rightAnswers = correctAnswers.map((answer, i) => ( (i === index) ? value : answer))
    setCorrectAnswers(rightAnswers);
  }

  const handleAddCorrectAnswer = ()=>{
    setCorrectAnswers([...correctAnswers, ","]);
  }

  const handleRemoveCorrectAnswer = (index) =>{
    const removeCorrectAnswer = correctAnswers.filter((answer ,i) => (i !== index));
    setCorrectAnswers(removeCorrectAnswer);
  }

  const handleSubmit = async (e)=>{
    // Prevent the default form submission behavior
    e.preventDefault();

    try {
      const result = {
        question,
        questionType, 
        choices, 
        correctAnswers: correctAnswers.map((answer) => {
          const choiceLetter = answer.charAt(0).toUpperCase();
          const choiceIndex = choiceLetter.charCodeAt(0) - 65;
          return (choiceIndex >=0 && choiceIndex < choices.length ) ? choiceLetter : null;
        }),
        subject 
      }

      await createQuestion(result); //api 
      
      setQuestion("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("")


    } catch (error) {
      //later on toastify
      toast.error("Something went to wrong...");
    }
  }  

  const handleAddSubject = () =>{
    if(newSubject.trim() !== ""){
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]); //put new subject in option
      setNewSubject("");
    }
  }

  const handleTyping = debounce(() => {
    setIsTyping(false);
  }, 1300); 

  const handleChange = (e) => {
    const newText = e.target.value;
    setQuestion(newText);
    setIsTyping(true);
    handleTyping(); 
  };



  return (
    <section className='md:w-9/12 w-[90%] mx-auto mt-24 mb-8 p-4 flex flex-col justify-between items-start'>
    
    <div className="bg-white w-full md:w-3/4 lg:w-1/2 xl:w-2/3 shadow-lg rounded-md p-6 mx-auto">
      <div className='bg-gray-200 py-2 px-6 sm:text-2xl text-xl border-b'>
        <h4>Add New Question</h4>
      </div>
  
      <div className='p-4 bg-white border border-gray-300 rounded'>
        <form className='p-4' onSubmit={handleSubmit}>
          <div className='my-2'>
            <label htmlFor="subject" className='block  text-xl font-medium text-info mb-2'> Select a Subject</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value={""}> Select a Subject</option>
              <option value={"New"}>Add New Subject </option>
              {
                 subjectOptions.map((option) =>(
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              }
            </select>
          </div>

          {
            subject == 'New' && (
              <div className='mt-3 mb-3 block '>
                <label htmlFor='new-subject' > Enter Subject Name</label>
                <input
                  type='text'
                  id='new-subject'
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className='w-full my-2 p-2 border rounded-md'
                />
                <button
                  type='button'
                  className='bg-primary mt-2 sm:px-4 px-2 py-2 text-white rounded-md hover:bg-white hover:text-primary border hover:border-primary'
                  onClick={handleAddSubject}>
                    Add Subject
                </button>  
              </div>
            )
          }

          {/* for question */}
          <div className="mt-6 mb-2 relative">
            <label htmlFor="question" className="mb-3 block text-lg font-medium text-gray-700">
              Question
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              value={question}
              onChange={handleChange}
            />

            {
              isTyping && (
                <div className="absolute bottom-3 right-3 flex items-center mb-2 mr-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-green-600"></div>
                </div>
              )
            }
          </div>

          {/*for answers  */}
          <div className='mt-6 mb-2'>
            <label htmlFor='question-type' className='mb-3 block text-lg font-medium text-gray-700'> Question Type</label>
            <select
              id="question-type"
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className='w-full p-2 border rounded-md'
            >
              <option value={"single"}> Single Answer</option>
              <option value={"multiple"}> Multiple Answers</option>
            </select>
          </div>

          <div className='mt-6 mb-2'>
            <label htmlFor='choices' className='mb-2 block text-lg font-medium text-gray-700'> Choices</label>
            {
              choices.map((choice, index) => (
                <div key={index} className="flex items-center my-2">
                   <input 
                     type="text" 
                     value={choice}
                     onChange={(e) => handleChoiceChange(index, e.target.value)}
                     className="w-full p-2 border rounded-r-none rounded-md"
                    />
                    <button 
                      type='button'
                      className='bg-primary border hover:border-primary sm:px-4 px-2 py-2 text-white rounded-l-none rounded-md hover:bg-white hover:text-primary'
                      onClick={()=> handleRemoveChoice(index)}
                    >
                      Remove
                    </button>
                </div>

              ))
            }
            {/* add choice */}
            <button 
              type='button'
              className='bg-blue-500 border hover:border-blue-500 sm:px-4 px-3 py-2 text-white rounded-md hover:bg-white hover:text-blue-500 '
              onClick={handleAddChoice}
            >
              Add Choice
            </button>
          </div>

          {/* for single correct answer */}
          {
            questionType === "single" && (
              <div className='mt-4 mb-3'>
                <label htmlFor='answer' className='mb-3 block text-lg font-medium text-gray-700'> Correct Answer</label>
                <input 
                     type="text" 
                     value={correctAnswers[0]}
                     onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                     className="w-full p-2 border rounded-md"
                    />
              </div>
            )
          }

           {/* for multiple correct answers */}
           {
            questionType === "multiple" && (
              <div className='mt-4 mb-3'>
                <label htmlFor='answer' className='mb-3 block text-lg font-medium text-gray-700'> Correct Answer (s)</label>
                {
                  correctAnswers.map((answer, index) => (
                    <div className='flex items-center my-2'>
                       <input 
                        type="text" 
                        value={answer}
                        onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                        className={`sm:w-[84%] w-[59%] p-2 border ${index === 0 ? '' :'rounded-r-none'} rounded-md`}
                      />
                      {
                        index > 0 && (
                          <button 
                            type='button'
                            className='bg-primary border hover:border-primary sm:px-4 px-2 py-2 text-white rounded-l-none rounded-md hover:bg-white hover:text-primary'
                            onClick={() => handleRemoveCorrectAnswer(index)}
                          >
                            Remove
                          </button>
                        )
                      }
                    </div>
                  ))
                }

                <button
                  type='button'
                  className='bg-blue-500 border hover:border-blue-500 sm:px-4 px-2 py-2 mt-2 text-white rounded-md hover:bg-white hover:text-blue-500 '
                  onClick={handleAddCorrectAnswer}
                >
                  Add Correct Answer
                </button>
              </div>
            )
          }

          { !correctAnswers && <p>Please enter atleast one correct answer.</p>}

          <div className='flex sm:flex-row flex-col mt-10'>
            <button type='submit' onClick={notify} className='border border-green-500 text-green-500 hover:bg-green-500 hover:shadow-md hover:text-white px-4 py-2 sm:mr-2 mr-0 mb-2 rounded'>
              Save Question
            </button>
            <Link to={"/all-quizzes"} className='border text-center border-blue-500 text-blue-500 hover:bg-blue-500 hover:shadow-md hover:text-white px-4 py-2 sm:ml-2 ml-0 mb-2 rounded' > Existing Questions</Link>
          </div>

        </form>
      </div>
    </div>
    <ToastContainer />
  </section>
  
  );
}

export default AddQuestion;