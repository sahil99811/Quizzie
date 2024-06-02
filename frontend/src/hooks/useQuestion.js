import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createQuizApi, updateQuiz } from '../apis/quiz'; // Importing APIs
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks
import { setCreatePopup, setEditPopup } from '../slices/popupSlice'; // Importing Redux actions

// Custom hook for managing quiz questions
export const useQuestion = (quizzData) => {
    const dispatch = useDispatch(); // Dispatch function from Redux
    const { token } = useSelector((state) => state.auth); // Accessing token from auth state

    // State for managing questions data
    const [questionsData, setQuestionsData] = useState([
        {
            description: "",
            optionType: "text",
            options: [
                { text: "", imageurl: "" },
                { text: "", imageurl: "" }
            ],
            correctOption: ""
        }
    ]);

    // State for managing timer
    const [timer, setTimer] = useState("OFF");
    // State for managing selected question index
    const [selectedQuestion, setselectedQuestion] = useState(0);
   // State for storing original quiz data
    const [originalData, setOriginalData] = useState({
      questions: [],
      timer: "OFF"
    });
    // Function to add a new option to the selected question
    const addOption = () => {
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion].options.push({ text: "", imageurl: "" });
            return updatedQuestionsData;
        });
    };

    // Function to remove an option from the selected question
    const removeOption = (index) => {
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion].options.splice(index, 1);
            // Reset correct option if it was the one removed
            if (index === updatedQuestionsData[selectedQuestion].correctOption) {
                updatedQuestionsData[selectedQuestion].correctOption = "";
            }
            return updatedQuestionsData;
        });
    };

    // Function to handle timer change
    const handleTimerChange = (time) => {
        setTimer(time);
    };

    // Function to add a new question
    const addQuestionHandler = () => {
        setQuestionsData([...questionsData, { description: "", optionType: "text", options: [{ text: "", imageurl: "" }, { text: "", imageurl: "" }], correctOption: "" }]);
        setselectedQuestion(0); // Set the 1st question as selected
    };

    // Function to remove a question
    const removeQuestionHandler = (index) => {
        const updatedQuestions = questionsData.filter((_, ind) => ind !== index);
        setQuestionsData(updatedQuestions);
        setselectedQuestion(0); // Reset to the first question
    };

    // Function to change the selected question
    const changeQuestionHandler = (index) => {
        setselectedQuestion(index);
    };

    // Function to handle change in option type
    const handleOptionTypeChange = (event) => {
        const { dataset } = event.currentTarget;
        const { name, value } = dataset;
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion][name] = value;
            return updatedQuestionsData;
        });
    };

    // Function to handle change in correct option for Q&A type
    const handleCorrectOptionChange = (event, index) => {
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion].correctOption = Number(index);
            return updatedQuestionsData;
        });
    };

    // Function to handle change in option value
    const handleOptionValueChange = (event, index) => {
        const { value, name } = event.target;
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion].options[index][name] = value;
            return updatedQuestionsData;
        });
    };

    // Function to handle change in question description
    const onChangeDescription = (event) => {
        const { value } = event.target;
        setQuestionsData(prevQuestionsData => {
            const updatedQuestionsData = [...prevQuestionsData];
            updatedQuestionsData[selectedQuestion].description = value;
            return updatedQuestionsData;
        });
    };

    // Function to check all fields before creating or editing a quiz
    const checkAllFields = (quizzType) => {
        for (let i = 0; i < questionsData.length; i++) {
            const question = questionsData[i];
            if (!question.description) {
                toast.error(`Enter Description of question Q.${i + 1}`);
                return false;
            }
            if (quizzType !== "Poll" && question.correctOption === '') {
                toast.error(`Choose CorrectOption of question Q.${i + 1}`);
                return false;
            }
            if (!question.optionType) {
                toast.error(`Select OptionType of question Q.${i + 1}`);
                return false;
            }
            for (let j = 0; j < question.options.length; j++) {
                const option = question.options[j];
                if (question.optionType === 'text' && !option.text) {
                    toast.error(`Enter Text of question Q.${i + 1} at Option:${j + 1}`);
                    return false;
                }
                if (question.optionType === 'image' && !option.imageurl) {
                    toast.error(`Enter ImageURL of question Q.${i + 1} at Option:${j + 1}`);
                    return false;
                }
                if (question.optionType === 'textImage') {
                    if (!option.text) {
                        toast.error(`Enter Text of question Q.${i + 1} at Option:${j + 1}`);
                        return false;
                    }
                    if (!option.imageurl) {
                        toast.error(`Enter ImageURL of question Q.${i + 1} at Option:${j + 1}`);
                        return false;
                    }
                }
            }
        }
        return true;
    };
    
    
  
    // Function to create a new quiz
    const createQuiz = async (quizzData, nextpageHandle) => {
        const isValid = checkAllFields(quizzData?.quizzType);
       
        if (isValid) {
            const result = await createQuizApi(quizzData.quizzName, quizzData.quizzType, questionsData, timer, token, dispatch);
            if (result) {
                nextpageHandle(result?.data?.quizzId);
            }
        }

    };

    // Function to edit an existing quiz 
    const editQuiz = async (quizzData) => {          
       const isValid = checkAllFields(quizzData?.quizzType);
        if (!isValid) return;
        const result = await updateQuiz(quizzData?._id, questionsData, timer, token, dispatch);
        if (result) {
            dispatch(setEditPopup(false));
        }
    };

    // Function to handle cancellation of quiz creation/editing
    const onCancelHandler = () => {
        dispatch(setCreatePopup(false)); // Hide create quiz popup
        dispatch(setEditPopup(false)); // Hide edit quiz popup
    };


    useEffect(() => {
        if (quizzData) {
            setQuestionsData(quizzData?.questions || [
                {
                    description: "",
                    optionType: "text",
                    options: [
                        { text: "", imageurl: "" },
                        { text: "", imageurl: "" }
                    ],
                    correctOption: ""
                }
            ]);
            setTimer(quizzData?.timer||"OFF");
            setOriginalData({
                questions: quizzData?.questions || [],
                timer: quizzData?.timer 
            });
        }
    }, [quizzData]);

    // Return all state variables and functions
    return {
        timer,
        setTimer,
        questionsData,
        createQuiz,
        selectedQuestion,
        addOption,
        removeOption,
        handleTimerChange,
        addQuestionHandler,
        removeQuestionHandler,
        changeQuestionHandler,
        handleOptionTypeChange,
        handleCorrectOptionChange,
        handleOptionValueChange,
        onChangeDescription,
        onCancelHandler,
        editQuiz
    };
};

