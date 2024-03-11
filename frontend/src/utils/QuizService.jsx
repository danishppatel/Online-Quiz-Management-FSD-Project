import React from 'react';
import axios from'axios';

//back end port =9192

export const api = axios.create({
    baseURL :'http://localhost:9192/api/quizzes'
})

export const createQuestion = async (quizQuestion) =>{
    try {
        const response = await api.post("/create-new-question", quizQuestion);
        
        return response.data;

    } catch (error) {
        console.log("error-question :  ", error);   
    }
}

export const getAllQuestions = async ()=>{
    try {
        const response =await api.get('/all-questions');
       
        return response.data;
    } catch (error) {
        console.log("error getQuestion :  ", error); 
        return [];  
    }
}

export const fetchQuizForUser = async (number, subject)=>{
    try {
		console.log("s1")

        const response = await api.get(`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`);

		console.log("s2")

        return response.data;
    } catch (error) {
        console.log("fetchQuizForUser : ",error);
        return [];
    }
}

export const getSubjects = async ()=>{
    try {
        const response =  await api.get('/subjects');
    
        return response.data;
    } catch (error) {
        console.log("getSubjects : ",error);
    }
}

export const updateQuestion = async (id, question) =>{
    try {
        const response = await api.put(`/question/${id}/update`, question);

        return response.data;
    } catch (error) {
        console.log("updateQuestion :  ",error)
    }
}

export const getQuestionById = async (id)=>{
    try {
        const response = await api.get(`/question/${id}`);
        return response.data;

    } catch (error) {
        console.log("getQuestionById :  ",error)
    }
}

export const deleteQuestion = async (id)=>{
    try {
        const response = await api.delete(`/question/${id}/delete`);

        return response.data;
    } catch (error) {
        console.log("deleteQuestion :  ",error)
    }
}
