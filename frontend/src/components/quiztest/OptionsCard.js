import React from 'react';
import style from '../../styles/quiztest/OptionsCard.module.css';

export default function OptionsCard({id,options,selectedOptions,setSelectedOptions,optionType}) {
  const onClickHandler = (event) => {
    const selectedOption = event.currentTarget.dataset.id;
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [id]: selectedOption
    }));
  };

  const renderTextOptions = () => (
    <div className={style.textcontainer}>
      {options?.map((option, index) => (
        <div
          key={index}
          className={`${style.text} ${selectedOptions[id] ===`${index+1}`&& style.active}`}
          onClick={onClickHandler}
          data-id={index + 1}
        >
          <span>{option?.text}</span>
        </div>
      ))}
    </div>
  );
  const renderImageOptions = () => (
    <div className={style.imgcontainer}>
      {options?.map((option, index) => (
      
        <div key={index} className={`${style.image} ${selectedOptions[id] ===`${index+1}`&& style.active}`} onClick={onClickHandler} data-id={index + 1}> 
          <img src={option?.imageurl} alt={`img${index + 1}`}  />
        </div>
      ))}
    </div>
  );

  const renderTextImageOptions = () => (
    <div className={style.textimagecontainer}>
      {options?.map((option, index) => (
        <div key={index} className={`${style.textimage} ${selectedOptions[id] ===`${index+1}`&& style.active}`} onClick={onClickHandler} data-id={index + 1}>
          <span>{option?.text}</span>
          <img src={option?.imageurl} alt={`img${index + 1}`} />
        </div>
      ))}
    </div>
  );

  return (
    <div className={style.optionsContainer}>
      {optionType === "textImage" && renderTextImageOptions()}
      {optionType === "text" && renderTextOptions()}
      {optionType === "image" && renderImageOptions()}
    </div>
  );
}
