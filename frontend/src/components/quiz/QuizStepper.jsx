import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSubjects } from '../../utils/QuizService';

function QuizStepper() {

  const [loading, setLoading] = useState(false);  //used for loading effect
  const [currentStep, setCurrentStep] =useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumOfQuestions,setSelectedNumOfQuestions] =useState("");
  const [subjects, setSubjects] =useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectData()
  }, [])

  const fetchSubjectData = async () => {
    try {
      const subjectsData = await getSubjects(); //api

      setSubjects(subjectsData)
    } catch (error) {
      console.log("error",error)
    }
  }

  // for next page
  const handleNextStep = () =>{
    if(currentStep === 3){
       if(selectedSubject && selectedNumOfQuestions){
        setLoading(true);
        setTimeout(()=>{
            navigate('/take-quiz', {
              state: {
                selectedSubject: selectedSubject,
                selectedNumOfQuestions: selectedNumOfQuestions,
              },
            });
            setLoading(false);
        },3000);
       }else{
        toast.error('Please select a subject and enter the number of questions.');
       }
    }else{
      setCurrentStep((prevStep) => prevStep+1);
    }
  }

  // for previous page
  const handlePreviousStep = () =>{
    setCurrentStep((prevStep) => prevStep-1);
  }

  const handleSelectedSubject = (e) =>{
    setSelectedSubject(e.target.value);  
  }

  const handleNumOfQuestionsChange = (e) =>{
    setSelectedNumOfQuestions(e.target.value);
  }

  const renderStepContent = () =>{
    switch(currentStep){
      case 1 :
        return (
            <div className='flex flex-col md:flex-row items-center'>
            {/* Left side*/}
            <div className='md:w-1/2'>
              <h3 className='text-xl mb-4'>I want to take a quiz on:</h3>
              <div className='w-full'>
                <select
                  className='border sm:w-[80%]  rounded py-2 px-4 mb-32'
                  value={selectedSubject}
                  onChange={handleSelectedSubject}
                  name=''
                  id=''
                >
                  <option value=''>Select a Subject...</option>
                  {
                    subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))
                  }
                </select>
              </div>
            </div>
          
            {/* Right side */}
            <div className='hidden md:w-1/2 md:block'>
              <img src='/images/quiz2.jpg' alt='' className='w-full' />
            </div>
          </div>
        

        )
      case 2 :
        return (
          <div>
            <h3 className='text-xl mb-4'> How many questions would you like to attempt?  </h3>
            <input
              type='number'
              className='w-full px-4 py-2 border rounded mb-32'
              value={selectedNumOfQuestions}
              onChange={handleNumOfQuestionsChange}
              placeholder='Enter no. of Questions'  
            />
          </div>
        )

      case 3 :
        return (
          <div>
            <h2 className='mb-4'><span className='text-2xl text-blue-700'>Confirmation</span></h2>
            <p className='text-xl font-semibold mb-2'>Subject : <span className='ml-2'>{selectedSubject}</span></p>
            <p className='text-xl font-semibold mb-24'>No. of Questions : <span className='ml-2'>{selectedNumOfQuestions}</span></p>
          </div>
        )

       default: return null; 
    }
  }

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
  
    return (
      <div className="w-[100%] mx-auto mt-6 mb-8 bg-gray-200 h-6 rounded overflow-hidden">
        <div
          className={`bg-primary text-white text-center flex items-center justify-center h-full ${currentStep === 1 ? 'hidden' : ''}`}
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
        >
          Step {currentStep}
        </div>
      </div>
    );
  };
 
  return (
    <section className='md:w-9/12 w-[90%] mx-auto mt-8  mb-8 flex flex-col justify-between items-start'>
      <h3 className='text-3xl text-gray-500 mt-16'> Welcome to on QuizQuest</h3>
      {/* progressbar */}
      {renderProgressBar()}
      {/* card */}
      <div className="bg-white w-full shadow-lg rounded-md p-6"> 
         {/* card-body */}
        <div className='p-4 bg-white border border-gray-300 rounded'>
             <div className='m-5 p-4'>
                {renderStepContent()}
                <div className={`flex ${currentStep >= 2 ? 'justify-between' : 'justify-start'}`} >
                  { 
                      currentStep > 1 && (
                        <button 
                          onClick={handlePreviousStep} 
                          className='bg-primary sm:px-6 sm:py-2 px-3 py-1 text-white rounded'
                        >
                            Previous
                        </button>
                      )
                  }
                  { 
                      currentStep < 3 && (
                        <button 
                          onClick={handleNextStep} 
                          className='bg-primary sm:px-6 sm:py-2 px-3 py-1 text-white rounded' 
                          disabled={(currentStep === 1 && !selectedSubject) || (currentStep === 2 && !selectedNumOfQuestions)}
                        >
                          Next
                        </button>
                      )
                  }
                  {
                      currentStep === 3 && (
                        <div>
                          { loading && <Loading/>}
                        
                            <button onClick={handleNextStep} className="bg-blue-500  sm:px-6 sm:py-2 px-1 py-1 text-white rounded">
                              Start Quiz
                            </button>
                
                        </div>
                      )
                  }
              </div>
           </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default QuizStepper