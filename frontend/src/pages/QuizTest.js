import React, { useEffect } from 'react'
import style from '../styles/quiztest/QuizTest.module.css';
import Questions from '../components/quiztest/Questions';
export default function QuizTest() {

  return (
    <div className={style.container}>
      <Questions/>
    </div>
  )
}
   