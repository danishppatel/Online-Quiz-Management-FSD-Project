import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdAppRegistration ,MdSubject} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { getSubjects } from "../utils/QuizService";

function Admin() {

  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
      fetchSubjectDataToGetSubject();
  },[])

  const fetchSubjectDataToGetSubject = async () => {
    try {
      const subjectsData = await getSubjects(); //api

      setSubjects(subjectsData)
    } catch (error) {
      console.log("error",error)
    }
  }

  const handleCreateQuizClick = () => {
    // Navigate to the create-quiz page
    navigate('/create-quiz');
  };

  return (
    <section className="lg:m-16 mx-10">
   <div className="p-2 shadow-md mt-24">
      <h2 className="sm:text-4xl text-3xl font-semibold text-primary "> Welcome , Admin!</h2>
   </div>

   <div className="flex sm:flex-row flex-col">
      <button
          className='bg-primary mt-8 py-1 px-3 sm:mr-3 mr-0 text-white rounded '
          onClick={handleCreateQuizClick}
      > 
          Create a New Quiz                  
      </button>
    
      <Link to={"/all-quizzes"} className='bg-primary mt-8 py-1 px-3 sm:ml-3 ml:0 text-white rounded'> 
          Manage a existing Quiz                
      </Link>
    
   </div>

  {/*detail container  */}
  <div className="flex flex-col justify-center mt-8 sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4">
    <div className="bg-white w-full shadow-lg rounded-md p-6 flex items-center sm:w-1/3 justify-between border border-gray-100">
      <div className="mr-4">
        <h6 className="text-dark mb-1 text-xl font-semibold">5</h6>
      </div>
      <div>
        <h6 className="text-xl font-normal mb-0">Registered Students</h6>
      </div>
      <div>
      <MdAppRegistration size={30} />
      </div>
    </div>
    <div className="bg-white w-full shadow-lg rounded-md p-6 flex items-center sm:w-1/3 justify-between border border-gray-100">
      <div className="mr-4">
        <h6 className="text-dark mb-1 text-xl font-semibold">{subjects.length}</h6>
      </div>
      <div>
        <h6 className="text-xl font-normal mb-0">Total Subjects Available</h6>
      </div>
      <div>
      <MdSubject size={30}/>
      </div>
    </div>
    <div className="bg-white w-full shadow-lg rounded-md p-6 flex items-center sm:w-1/3 justify-between border border-gray-100">
      <div className="mr-4">
        <h6 className="text-dark mb-1 text-xl font-semibold">4</h6>
      </div>
      <div>
        <h6 className=" text-xl font-normal mb-0">Submitted Students</h6>
      </div>
      <div>
        <FaAngleDoubleRight  size={30}/>
      </div>
    </div>
  </div>

  <div className="mt-8">
    <div className="bg-white w-full shadow-lg rounded-md p-6">
      <div className="table-responsive">
        <table
          id="zero_config"
          className="table table-striped table-bordered w-full"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student's Email</th>
              <th scope="col">Last Activity</th>
            </tr>
          </thead>
          <tbody>{/* Your table body content */}</tbody>
        </table>
      </div>
    </div>
  </div>
</section>

  );
}

export default Admin;
