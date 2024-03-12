import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx';
import QuizStepper from './components/quiz/QuizStepper.jsx';
import AddQuestion from './components/questions/AddQuestion.jsx'
import Admin from './components/Admin.jsx';
import GetAllQuiz from './components/quiz/GetAllQuiz.jsx';
import UpdateQuestion from './components/questions/UpdateQuestion.jsx';
import Quiz from './components/quiz/Quiz.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:'/take-quiz',
        element:<Quiz/>
      },
      {
        path:'/quiz-stepper',
        element:<QuizStepper/>
      },
      {
        path:'/create-quiz',
        element:<AddQuestion/>
      },
      {
        path:'/admin',
        element:<Admin/>
      },
      {
        path:'/all-quizzes',
        element:<GetAllQuiz/>
      },
      {
        path:'/update-question/:id',
        element:<UpdateQuestion/>
      },
      {
        path:'/aboutus',
        element:<AboutUs/>
      },
    ]
    
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
