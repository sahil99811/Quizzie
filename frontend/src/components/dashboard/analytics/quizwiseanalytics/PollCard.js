import React from 'react'
import style from '../../../../styles/dashboard/analytics/quizwiseanalytics/PollCard.module.css'
export default function PollCard({question,qno}) {
  return (
    <div className={style.container}>
      <h2 >{`1.${qno} ${question.description}`}</h2>
      <div className={style.optionContainer}>
        <div className={style.selectedOption}>
          <h3>{question?.selectedOptions?.["option1"]}</h3>
          <spa>Option 1</spa>
        </div>
        <div className={style.selectedOption}>
          <h3>{question?.selectedOptions?.["option2"]}</h3>
          <spa>Option 2</spa>
        </div>
        <div className={style.selectedOption}>
          <h3>{question?.selectedOptions?.["option3"]}</h3>
          <spa>Option 3</spa>
        </div>
        <div className={style.selectedOption}> 
          <h3>{question?.selectedOptions?.["option4"]}</h3>
          <spa>Option 4</spa>
        </div>
      </div>
      <div className={style.border}></div>
    </div>
  )
}
