import axios from 'axios'
import {toast} from 'react-hot-toast'
const backendURL=process.env.REACT_APP_BACKEND_BASE_URL;

export const getTrendingQuiz=async (token)=>{
          try{
           
            const result = await axios.get(`${backendURL}/quiz/trendingQuiz`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus(status) {
                    return status === 201 || status === 402 || status === 401;
                }
            });
            
             if(result.status===201){
            
                toast.success(result?.data?.message);
                return result;
             }
             toast.error(result?.data?.message);
            return null;
          }catch(error){
             console.log(error)
             toast.error("Something went wrong try again later!");
             return null;
          }
}

export const getQuizzsAnalysis=async (token)=>{
    try{
          const result=await axios.get(`${backendURL}/quiz/analysis`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            validateStatus(status) {
                return status === 201 || status === 402 || status === 401;
            }
          })
          if(result.status===201){
            
            if(result?.data?.quizzs.length===0){
                toast.success("There is no quiz to show first create a quiz");  
            }
            else
            toast.success(result?.data?.message);
            return result;
         }
         toast.error(result?.data?.message);
         return null;
    }catch(error){
        console.log(error)
        toast.error("Something went wrong try again later!");
        return null;
    }
}


export const getQuizzAnalysis=async (token,quizId)=>{
    try{
         const result=await axios.get(`${backendURL}/quiz/analysis/${quizId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            },
            validateStatus(status){
                return status === 201 || status === 402 || status === 401
            }
          
         })
         if(result.status===201){

            if(!result?.data?.quizz){
                toast.success("There is no quiz to show first create a quiz");  
            }
            else
            toast.success(result?.data?.message);
            return result;
         }
         toast.error(result?.data?.message);
         return null;
    }catch(error){
        console.log(error)
        toast.error("Something went wrong try again later!");
        return null;
    }
}


export const getQuizQuestions=async (quizId)=>{
    try{
         const result=await axios.get(`${backendURL}/quiz/quizTest/${quizId}`,{
            validateStatus(status){
                return status === 200 || status === 402 || status === 401||status===201
            }
         })
         if(result.status===200){
            toast.success(result?.data?.message);
            return result?.data?.questions;
         }
         toast.error(result?.data?.message);
         return null;
    }catch(error){
        console.log(error)
        toast.error("Something went wrong try again later!");
        return null;
    }
}

export const submitQuiz=async (quizId,selectedOptions)=>{
    try{
        const result=await axios.post(`${backendURL}/quiz/submitTest`,{
            quizId,
            selectedOptions
        },{
           validateStatus(status){
               return status === 201 || status === 402 || status === 401||status===404
           }
        })
        if(result.status===201){
           toast.success(result?.data?.message);
           return result;
        }else if(result.status===200){
            toast.success(result?.data?.message);
            return result;
        }
        toast.error(result?.data?.message);
        return null;
   }catch(error){
       console.log(error)
       toast.error("Something went wrong try again later!");
       return null;
   }
}

export const deleteQuiz=async(quizId,token)=>{
    try{
      const result=await axios.delete(`${backendURL}/quiz/delete/${quizId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
        validateStatus(status){
            return status === 200 || status === 402 || status === 401||status===404
        }
      })
      if(result?.status===200){
        toast.success("Quiz Deleted SuccessFully");
        return true;
      }
      toast.error(result?.data?.message);
      return false;
    }catch(error){
        console.log(error)
        toast.error("Something went wrong try again later!");
        return false;
    }
}

export const createQuizApi=async(quizzName,quizzType,questions,timer,token)=>{
try{
    console.log(token)
    const result=await axios.post(`${backendURL}/quiz/createQuiz`,{
           quizzName,
           quizzType,
           questions,
           timer
    },{
        headers:{
            Authorization:`Bearer ${token}`
        },
        validateStatus(status){
            return status === 201 || status === 402 || status === 401||status===400
        }
   
    })
    if(result?.status===201){
        toast.success("Quiz Created SuccessFully");
        return result;
    }
    toast.error(result?.data?.message);
    return false;
 }catch(error){
    console.log(error)
    toast.error("Something went wrong try again later!");
    return false;
 }
}