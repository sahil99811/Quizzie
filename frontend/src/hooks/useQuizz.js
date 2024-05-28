import { useState } from "react"
import toast from 'react-hot-toast';
export const useQuizz=()=>{
    const [quizzData,setQuizzData]=useState({
        "quizzName":"",
        "quizzType":""
    });
    const [nextpage,setnextpage]=useState(0);
    const quizzDataChangeHandler = (event) => {
        const { name, value } = event.target;
        setQuizzData({
          ...quizzData,
          [name]: value
        });
      };
      const onSubmitHandler=(event)=>{
        if(!quizzData.quizzName){
          toast.error("Enter Quizz Name..")
        }else if(!quizzData.quizzType){
          toast.error("Select Quiz Type..")
        }
        else{
            setnextpage(nextpage+1)
        }
      }

    return {quizzData,setQuizzData,quizzDataChangeHandler,onSubmitHandler,nextpage,setnextpage};
}