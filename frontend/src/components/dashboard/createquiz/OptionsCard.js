import React from 'react'
import deletelogo from '../../../assets/delete.png'
import style from '../../../styles/dashboard/createquiz/OptionCard.module.css'
export default function OptionsCard({optionType,questionsData,selectedQuestion,removeOption,addOption,handleCorrectOptionChange,handleOptionValueChange,quizzType}) {
    const renderTextOptions = () => (
        <div className={style.textContainer}>
          {questionsData[selectedQuestion]?.options?.map((option, index) => (
            <div key={index} className={style.text}>
                {
                    quizzType==="Q&A"&&<div className={style.radioOuterDiv}  onClick={(event)=>{handleCorrectOptionChange(event,index)}}>
                         <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeRadio}`}></div>
                    </div>
                }
              <input type="text" placeholder="Text" className={`${style.inputText} ${questionsData[selectedQuestion]?.correctOption=== index&&style.activeSelectedOptions}`} name="text" onChange={(event) => handleOptionValueChange(event, index)} value={questionsData[selectedQuestion]?.options[index]?.text}/>
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
          {questionsData[selectedQuestion]?.options?.length < 4 && <button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? {marginLeft:"0rem"} : {}}>Add Section</button>}
        </div>
      );
      
      
      
       const renderImageOptions = () => (
        <div className={style.imageContainer}>
          {questionsData[selectedQuestion]?.options?.map((_, index) => (
            <div key={index} className={style.image}>
              {
                    quizzType==="Q&A"&&<div className={style.radioOuterDiv} onClick={(event)=>{handleCorrectOptionChange(event,index)}}>
                         <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeRadio}`}></div>
                    </div>
                }
              <input type="text" placeholder="Image URL"  className={`${style.inputImage} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeSelectedOptions}`} name='imageurl' value={questionsData[selectedQuestion]?.options[index]?.imageurl} onChange={(event)=>{handleOptionValueChange(event,index)}} />
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
            questionsData[selectedQuestion]?.options?.length<4&&<button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? {marginLeft:"0rem"} : {}}>Add Section</button>
          }
        </div>
      );
      
      const renderTextImageOptions = () => (
        <div className={style.textimageContainer} >
          {questionsData[selectedQuestion]?.options?.map((_, index) => (
            <div key={index} className={style.textimage}>
              {
                    quizzType==="Q&A"&&<div className={style.radioOuterDiv} onClick={(event)=>{handleCorrectOptionChange(event,index)}}>
                         <div className={`${style.radioInnerDiv} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeRadio}`}></div>
                    </div>
                }
              <input type="text" placeholder="Text" className={`${style.textImageText} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeSelectedOptions}`} name="text" onChange={(event) => handleOptionValueChange(event, index)} value={questionsData[selectedQuestion]?.options[index]?.text}/>
              <input type='text' placeholder='image URL'  className={`${style.textImageUrl} ${questionsData[selectedQuestion]?.correctOption === index&&style.activeSelectedOptions}`} name='imageurl' value={questionsData[selectedQuestion]?.options[index]?.imageurl} onChange={(event)=>{handleOptionValueChange(event,index)}}/>
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
            questionsData[selectedQuestion]?.options?.length<4&&<button onClick={addOption} className={style.addsection} style={quizzType === "Poll" ? {marginLeft:"0rem"} : {}}>Add Section</button>
          }
        </div>
      ); 
  return (
    <div className={style.optionsContainer}>
      {/* Render options based on the option type */}
      {optionType === "textImage" && renderTextImageOptions()}
      {optionType === "text" && renderTextOptions()}
      {optionType === "image" && renderImageOptions()}
    </div>
  )
}
