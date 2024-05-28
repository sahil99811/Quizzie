import { useState } from "react";
import toast from "react-hot-toast";
import {createQuizApi} from '../apis/quiz'
import {useSelector } from "react-redux";

export const useQuestion = () => {
    const {token}=useSelector((state)=>state.auth);
    const [questionsData, setQuestionsData] = useState([
        {
            description: "",
            optionType: "text",
            options: [{ text: "", imageurl: "" }, { text: "", imageurl: "" }],
            correctOption: ""
        }
    ]);
    const [timer, setTimer] = useState("OFF");

    const checkAllFields = () => {
        console.log("inside check fields");
        for (let i = 0; i < questionsData.length; i++) {
            const question = questionsData[i];
            console.log("inside check fields");
            if (!question.description) {
                console.log("inside check fields");
                toast.error(`Enter Description of question Q.${i + 1}`);
                return false;
            }

            if (!question.correctOption) {
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

    const createQuiz = async (quizzData,nextpageHandle) => {
        console.log(questionsData,quizzData,nextpageHandle);
        const isValid = checkAllFields();
        if (isValid) {
            toast.success("Quiz Created Successfully");
            const result=await createQuizApi(quizzData.quizzName,quizzData.quizzType,questionsData,timer,token)
            if(result){
                console.log(result?.data)
                nextpageHandle(result?.data?.quizzId);
            }

        }
    };

    return { timer, setTimer, questionsData, setQuestionsData, createQuiz };
};
