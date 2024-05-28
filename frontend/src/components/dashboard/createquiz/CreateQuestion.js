import React, { useState } from 'react';
import style from '../../../styles/dashboard/createquiz/CreateQuestion.module.css';
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import deletelogo from '../../../assets/delete.png';
import { useQuestion } from '../../../hooks/useQuestion';

export default function CreateQuestion({quizzData,nextpageHandle}) {
  // console.log(nextpageHandle);
  const {timer, setTimer,questionsData,setQuestionsData,createQuiz} = useQuestion()
  const [selectedQuestion,setselectedQuestion]=useState(0);
  const addOption = () => {
    setQuestionsData(prevQuestionsData => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].options.push({ text:"",imageurl:""});
      return updatedQuestionsData;
    });
   
  };
  


  const removeOption = (index) => {
    setQuestionsData(prevQuestionsData => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion].options.splice(index,1);
  
      if (index.toString()===updatedQuestionsData[selectedQuestion].correctOption) {
        updatedQuestionsData[selectedQuestion].correctOption = "";
      }
      
      return updatedQuestionsData;
    });
  };
  


  const handleTimerChange = (time) => {
    setTimer(time);
  };


 const addQuestionHandler=()=>{
  setQuestionsData([...questionsData, { description:"",optionType:"text",options: [{ text: "",imageurl:"" }, {text: "" ,imageUrl:""}], correctOption:""}]);
  setselectedQuestion(0);
  
 }


const removeQuestionHandler = (event,index) => {
  const updatedQuestions = [...questionsData]; 
  updatedQuestions.splice(index, 1);
  setQuestionsData(updatedQuestions);
  setselectedQuestion(0);
 
}


 const changeQuestionandler=(index)=>{
    setselectedQuestion(index);
 }
 const handleChange = (event) => {
     const { name, value } = event.target;
      setQuestionsData(prevQuestionsData => {
      const updatedQuestionsData = [...prevQuestionsData];
      updatedQuestionsData[selectedQuestion][name] = value;
      return updatedQuestionsData;
    });
};

const handleRadioChange = (event) => {
  const { value } = event.target;
  console.log(value);
  setQuestionsData(prevQuestionsData => {
    const updatedQuestionsData = [...prevQuestionsData];
    updatedQuestionsData[selectedQuestion].correctOption = value;
    return updatedQuestionsData;
  });
};

const handleOptionValueChange=(event,index)=>{
  const {value,name}=event.target;

  setQuestionsData(prevQuestionsData=>{
    const updatedQuestionsData=[...prevQuestionsData];
    updatedQuestionsData[selectedQuestion].options[index][name]=value;
    return updatedQuestionsData;
  })
}
const createQuizHandler=()=>{
    
    createQuiz(quizzData,nextpageHandle);
}
const renderTextOptions = () => (
  <div className={style.textContainer}>
    {questionsData[selectedQuestion]?.options?.map((option, index) => (
      <div key={index} className={style.text}>
        <input type="radio" name="correctOption" className={style.inputRadio}  value={index} checked={questionsData[selectedQuestion]?.correctOption === index.toString()} onChange={(event) => handleRadioChange(event)} />
        <input type="text" placeholder="Text" className={`${style.inputText} ${questionsData[selectedQuestion]?.correctOption === index.toString()&&style.activeSelectedOptions}`} name="text" onChange={(event) => handleOptionValueChange(event, index)} value={questionsData[selectedQuestion]?.options[index]?.text}/>
        {index >= 2 && (
          <img
            src={deletelogo}
            alt="deletebutton"
            onClick={() => removeOption(index)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    ))}
    {questionsData[selectedQuestion]?.options?.length < 4 && <button onClick={addOption} className={style.addsection}>Add Section</button>}
  </div>
);



 const renderImageOptions = () => (
  <div className={style.imageContainer}>
    {questionsData[selectedQuestion]?.options?.map((_, index) => (
      <div key={index} className={style.image}>
        <input type="radio" name="correctOption" className={style.inputRadio}  value={index} checked={questionsData[selectedQuestion]?.correctOption === index.toString()} onChange={(event) => handleRadioChange(event)} />
        <input type="text" placeholder="Image URL"  className={`${style.inputImage} ${questionsData[selectedQuestion]?.correctOption === index.toString()&&style.activeSelectedOptions}`} name='imageurl' value={questionsData[selectedQuestion]?.options[index]?.imageurl} onChange={(event)=>{handleOptionValueChange(event,index)}} />
        {index >= 2 && (
          <img
            src={deletelogo}
            alt="deletebutton"
            onClick={() => removeOption(index)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    ))}
    {
      questionsData[selectedQuestion]?.options?.length<4&&<button onClick={addOption} className={style.addsection}>Add Section</button>
    }
  </div>
);

const renderTextImageOptions = () => (
  <div className={style.textimageContainer}>
    {questionsData[selectedQuestion]?.options?.map((_, index) => (
      <div key={index} className={style.textimage}>
        <input type="radio" name="correctOption" className={style.inputRadio}  value={index} checked={questionsData[selectedQuestion]?.correctOption === index.toString()} onChange={(event) => handleRadioChange(event)} />
        {/* <input type="text" placeholder="Text" className={`${style.textimageInput} ${questionsData[selectedQuestion]?.correctOption === index.toString()&&style.activeSelectedOptions}`} value={questionsData[selectedQuestion]?.options[index]?.text} onChange={(event)=>{handleOptionValueChange(event,index)}}/> */}
        <input type="text" placeholder="Text" className={`${style.inputText} ${questionsData[selectedQuestion]?.correctOption === index.toString()&&style.activeSelectedOptions}`} name="text" onChange={(event) => handleOptionValueChange(event, index)} value={questionsData[selectedQuestion]?.options[index]?.text}/>
        <input type='text' placeholder='image URL'  className={`${style.textimageUrl} ${questionsData[selectedQuestion]?.correctOption === index.toString()&&style.activeSelectedOptions}`} name='imageurl' value={questionsData[selectedQuestion]?.options[index]?.imageurl} onChange={(event)=>{handleOptionValueChange(event,index)}}/>
        {index >= 2 && (
          <img
            src={deletelogo}
            alt="deletebutton"
            onClick={() => removeOption(index)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    ))}
    {
      questionsData[selectedQuestion]?.options?.length<4&&<button onClick={addOption} className={style.addsection}>Add Section</button>
    }
  </div>
);



const renderOptions = (optionType) => {
 
  switch (optionType) {
    case 'text':
      return renderTextOptions();
    case 'image':
      return renderImageOptions();
    case 'textImage':
      return renderTextImageOptions();
    default:
      return null;
  }
};
console.log(questionsData)
  return (
    <div className={style.popupContainer}>
      <section className={style.questionInfo}>
        <div className={style.questionInfoContainer}>
          <div className={style.questionsContainer}>
            {
              questionsData?.map((question,index)=>{
              return  <div className={style.questionContainer} onClick={(event)=>changeQuestionandler(index,event)}>
                {
                  index+1
                }
                {
                  index!==0&&<RxCross2
                  className={style.crosslogo}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeQuestionHandler(index);
                  }}
                />
                }
              </div>
              })
            }
            <div className={style.addContainer}>
             {
              questionsData?.length!==5&& <AiOutlinePlus className={style.addlogo} onClick={addQuestionHandler} />
             }
            </div>
          </div>
          <span className={style.maxquestion}>Max 5 questions</span>
        </div>
        <input type="text" placeholder='Q&A Question' className={style.questionInput} name='description' value={questionsData[selectedQuestion]?.description} onChange={ handleChange} />
        <div className={style.optionTypeContainer}>
          <span>Option Type</span>
          <div className={style.optiontype}>
            <input 
              type="radio" 
              name="optionType" 
              value="text" 
              checked={questionsData[selectedQuestion]?.optionType === 'text'} 
              onChange={handleChange}  
            />
            <span>Text</span>
          </div>
          <div className={style.optiontype}>
            <input 
              type="radio" 
              name="optionType" 
              value="image" 
              checked={questionsData[selectedQuestion]?.optionType === 'image'} 
              onChange={ handleChange}  
            />
            <span>Image URL</span>
          </div>
          <div className={style.optiontype}>
            <input 
              type="radio" 
              name="optionType" 
              value="textImage" 
              checked={questionsData[selectedQuestion]?.optionType === 'textImage'} 
              onChange={ handleChange}  
            />
            <span>Text & Image URL</span>
          </div>
        </div>
      </section>
      <section className={style.selectOption}>
        <div className={style.optionContainer}>
          {renderOptions(questionsData[selectedQuestion]?.optionType)}
        </div>
        <div className={style.timerContainer}>
          <span>Timer</span>
          <button className={timer === "OFF"&& style.activeTimer} onClick={() => handleTimerChange("OFF")}>OFF</button>
          <button className={timer === "5"&& style.activeTimer } onClick={() => handleTimerChange("5")}>5 sec</button>
          <button className={timer === "10" && style.activeTimer } onClick={() => handleTimerChange("10")}>10 sec</button>
        </div>
      </section>
      <section className={style.buttonContainer}>
          <button className={style.cancelbutton}>Cancel</button>
          <button className={style.createbutton} onClick={createQuizHandler}>Create Quiz</button>
      </section>
    </div>
  );
}
