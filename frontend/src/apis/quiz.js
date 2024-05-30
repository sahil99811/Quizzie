import { setToken } from '../slices/authSlice';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const backendURL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to get trending quizzes
export const getTrendingQuiz = async (token, dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/quiz/trendingQuiz`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success(result?.data?.message); // Show success toast
            return result; // Return the result if status is 201
        }
        toast.error(result?.data?.message); // Show error toast
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to get quizzes analysis
export const getQuizzsAnalysis = async (token, dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/quiz/analysis`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            if (result?.data?.quizzs.length === 0) {
                toast.success("There is no quiz to show first create a quiz"); // Show specific message if no quizzes are found
            } else {
                toast.success(result?.data?.message); // Show success toast
            }
            return result; // Return the result if status is 201
        }
        toast.error(result?.data?.message); // Show error toast
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to get a specific quiz analysis
export const getQuizzAnalysis = async (token, quizId, dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/quiz/analysis/${quizId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 200 || status === 403 || status === 401 || status === 404; // Only resolve these status codes
            }
        });

        if (result.status === 200) {
            if (!result?.data?.quizz) {
                toast.success("There is no quiz to show first create a quiz"); // Show specific message if quiz is not found
            } else {
                toast.success(result?.data?.message); // Show success toast
            }
            return result; // Return the result if status is 201
        } else if (result?.status === 404) {
            toast.error(result?.data?.message); // Show error toast if quiz is not found
            return false;
        }
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        toast.error(result?.data?.message); // Show error toast
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to get quiz questions
export const getQuizQuestions = async (quizId, dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/quiz/quizTest/${quizId}`, {
            validateStatus(status) {
                return status === 200 || status === 404 || status === 401 || status === 403; // Only resolve these status codes
            }
        });

        if (result.status === 200) {
            toast.success(result?.data?.message); // Show success toast
            return result?.data?.questions; // Return the questions if status is 200
        } 
        toast.error(result?.data?.message); // Show error toast if quiz is not found
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to submit quiz answers and calculate score or update poll results
export const submitQuiz = async (quizId, selectedOptions, dispatch) => {
    try {
        const result = await axios.post(`${backendURL}/quiz/submitTest`, {
            quizId,
            selectedOptions
        }, {
            validateStatus(status) {
                return status === 200 || status === 403 || status === 401 || status === 404; // Only resolve these status codes
            }
        });
        
        if (result.status === 200) {
            toast.success(result?.data?.message); // Show success toast
            return result; // Return the result if status is 200
        } 
        toast.error(result?.data?.message); // Show error toast
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to delete a quiz
export const deleteQuiz = async (quizId, token, dispatch) => {
    try {
        const result = await axios.delete(`${backendURL}/quiz/delete/${quizId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 200 || status === 403 || status === 401 || status === 404; // Only resolve these status codes
            }
        });

        if (result?.status === 200) {
            toast.success("Quiz Deleted Successfully"); // Show success toast
            return true; // Return true if status is 200
        } else if (result.status === 404) {
            toast.error(result?.data?.message); // Show error toast if quiz is not found
            return false;
        }
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        toast.error(result?.data?.message); // Show error toast
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

// Function to create a new quiz
export const createQuizApi = async (quizzName, quizzType, questions, timer, token, dispatch) => {
    try {
        console.log(token);
        const result = await axios.post(`${backendURL}/quiz/createQuiz`, {
            quizzName,
            quizzType,
            questions,
            timer
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 201 || status === 403 || status === 401 || status === 400; // Only resolve these status codes
            }
        });

        if (result?.status === 201) {
            toast.success("Quiz Created Successfully"); // Show success toast
            return result; // Return the result if status is 201
        } else if (result?.status === 400) {
            toast.error(result?.data?.message); // Show error toast if there's a bad request
            return false;
        }
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        toast.error(result?.data?.message); // Show error toast
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}

export const quizDetails = async (quizzId, token, dispatch) => {
    try {
        const result = await axios.get(`${backendURL}/quiz/quizDetails/${quizzId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header with the token
            },
            validateStatus(status) {
                return status === 200 || status === 403 || status === 401 || status === 404; // Only resolve these status codes
            }
        });

        if (result?.status === 200) {
            toast.success("Quiz Details Fetch Sucessfully"); // Show success toast
            console.log(result);
            return result; // Return the result if status is 200
        } else if (result?.status === 404) {
            toast.error(result?.data?.message);  // Show error toast if quiz is not found
            return false;
        }
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        toast.error(result?.data?.message); // Show error toast
        return false;
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}


export const updateQuiz=async (quizzId,questions,timer,token,dispatch)=>{
    try{
        const result=await axios.patch(`${backendURL}/quiz/update/${quizzId}`,{
            questions,
            timer
         },{
            headers:{
                Authorization: `Bearer ${token}`
            },
            validateStatus(status) {
                return status === 200 || status === 403 || status === 401 || status === 404; // Only resolve these status codes
            }
        })
        if (result?.status === 200) {
            toast.success(result?.data?.message); // Show success toast
            return result; // Return the result if status is 200
        } else if (result?.status === 404) {
            toast.error(result?.data?.message);  // Show error toast if quiz is not found
            return false;
        }
        dispatch(setToken(null)); // Clear token from state
        localStorage.removeItem("token"); // Remove token from local storage
        toast.error(result?.data?.message); // Show error toast
        return false;
    }catch(error){
        console.log(error);
        toast.error("Something went wrong try again later!"); // Show error toast for any exception
        return false;
    }
}