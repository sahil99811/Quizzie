import React from 'react';
import style from '../../../styles/dashboard/createquiz/CreateQuiz.module.css';
// import { useQuizz } from '../../../hooks/useQuizz';
import CreateQuestion from './CreateQuestion'; // Import CreateQuestion component
import ShareQuiz from './ShareQuiz';
import toast from 'react-hot-toast'
import { useState } from 'react';
import { setCreatePopup } from '../../../slices/popupSlice'; 
import { useDispatch } from 'react-redux';
export default function CreateQuiz() {
  const dispatch=useDispatch();
  const [quizzData,setQuizzData]=useState({
    "quizzName":"",
    "quizzType":""
});
const [nextpage,setnextpage]=useState(0);
const [quizId,setQuizId]=useState("");
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
  const onCancelHandler=()=>{
    dispatch(setCreatePopup(false));
  }
  const nextpageHandler=(quizId)=>{
    setQuizId(quizId)
    console.log(quizId);
    setnextpage(nextpage+1);
  }
  return (
    <>
      {
        nextpage===0&&(
          <div className={style.popupContainer}>
            <div className={style.inputContainer}>
              <input placeholder='Quiz name' className={style.quizzName} name='quizzName' value={quizzData.quizzName} onChange={quizzDataChangeHandler} />
              <div className={style.choiceContainer}>
                <span>Quiz Type</span>
                <button className={`${style.qaChoice} ${quizzData.quizzType === "Q&A" && style.active}`} name='quizzType' value="Q&A" onClick={quizzDataChangeHandler}>Q & A</button>
                <button className={`${style.pollChoice} ${quizzData.quizzType === "Poll" && style.active}`} name='quizzType' value="Poll" onClick={quizzDataChangeHandler}>Poll Type</button>
              </div>
            </div>
            <div className={style.buttonContainer}>
              <button className={style.cancelButton} onClick={onCancelHandler}>Cancel</button>
              <button className={style.continueButton} onClick={onSubmitHandler}>Continue</button>
            </div>
          </div>)
        
      }
      {
         nextpage===1&&(<CreateQuestion quizzData={quizzData}  nextpageHandle={nextpageHandler}/>)
      }  
      {
        nextpage===2&&(<ShareQuiz quizId={quizId}/>)
      }     
    </>
  );
}
