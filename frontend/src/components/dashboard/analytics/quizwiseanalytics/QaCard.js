import React from 'react'
import style from '../../../../styles/dashboard/analytics/quizwiseanalytics/QaCard.module.css'
export default function QaCard({question,qno}) {
  return (
    <div  className={style.container}>
      <h2>{`1.${qno} ${question.description}`}</h2>
      <div className={style.optionContainer}>
        <div className={style.answerOption}>
          <h3>{question?.correctAnswered+question?.incorrectAnswered}</h3>
          <span>People Attempted the question</span>
        </div>
        <div className={style.answerOption}>
          <h3>{question?.correctAnswered}</h3>
          <span>People Answered Correctly</span>
        </div>
        <div className={style.answerOption}>
          <h3>{question?.incorrectAnswered}</h3>
          <span>People Answered InCorrectly</span>
        </div>
      </div>
      <div className={style.border}></div>
    </div>
  )
}
