import React from 'react'

function AnswerOptions({question, isChecked, handleAnswerChange, handleCheckboxChange}) {


  if(!question){
    return <div>No Questions Available</div>

  }

  const {id, questionType, choices} =  question;


  if(questionType === "single"){
    return (
      <div>
        {
          choices.sort().map((choice, index) => (

            <div  key={choice} className={`flex items-center ml-12 mb-2 px-2 py-3 border border-gray-200 rounded text-xs cursor-pointer ${ isChecked(question.id, choice) ? 'bg-gray-300' : '' }`} >
               <input 
                  type="radio" 
                  id={choice}
                  value={choice}
                  className="hidden"
                  checked={isChecked(question.id, choice)}
                  onChange={() => handleAnswerChange(id, choice)}
                />
                <label htmlFor={choice} className='ml-3 text-base cursor-pointer'>{choice}</label>
           </div>
          ))
        }
      </div>
    )
  }
  else if(questionType === "multiple"){
    return (
      <div>
        {
          choices.sort().map((choice, index) => (
            <div key={choice} className={`flex items-center ml-12 mb-2 px-2 py-3 border border-gray-200 rounded text-xs cursor-pointer ${ isChecked(question.id, choice) ? 'bg-gray-300' : '' }`}>
               <input 
                  type="checkbox" 
                  id={choice}
                  value={choice}
                  name={question.id}
                  className="hidden"
                  checked={isChecked(question.id, choice)}
                  onChange={()=> handleCheckboxChange(id, choice)}
                />
                <label htmlFor={choice} className='ml-3 text-base cursor-pointer'>{choice}</label>
            </div>
          ))
        }
      </div>
    )
  }
  else{
    return null;
  }

}

export default AnswerOptions