import React from 'react'
import style from '../../styles/dashboard/QuizChip.module.css'
import impression from '../../assets/impression.png'
import {formattedDate} from '../../utility/dateFormatter'
export default function QuizChip({quiz}) {
  const date = formattedDate(quiz?.createdAt)
  return (
    <div className={style.container}>
        <div className={style.upperContainer}>
            <h3 >{quiz.quizzName}</h3>
            <div className={style.impressionContainer}>
             <p>{quiz.impression} </p>
             <img src={impression} alt="impression"></img>
            </div>
        </div>
        <span>{`Created on : ${date}`}</span>
    </div>
  )
}
