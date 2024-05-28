import React, { useEffect, useState } from 'react';
import style from '../../styles/dashboard/TrendingQuiz.module.css';
import QuizChip from './QuizChip';
import {getTrendingQuiz} from '../../apis/quiz'
import { useSelector } from 'react-redux';
export default function TrendingQuiz() {
  const {token}=useSelector((state)=>state.auth)
  const [trendingQuiz,setTrendingQuiz]=useState({});
  const fetchTrendingQuiz=async ()=>{
     const result= await getTrendingQuiz(token);
     setTrendingQuiz(result?.data);
  }

  
  useEffect(()=>{
     fetchTrendingQuiz();
  },[]);
  return (
      <div className={style.container}>
        <section className={style.upperSection}>
          <div className={style.quizInfo}>
            <div className={`${style.quizBox1} ${style.Box1}`}>
              <p className={style.quizCreated}>{trendingQuiz?.totalQuizzes?trendingQuiz?.totalQuizzes:0}<span className={style.title}> Quiz</span></p>
              <p className={style.title}>Created</p>
            </div>
          </div>
          <div className={style.quizInfo}>
            <div className={`${style.quizBox1} ${style.Box2}`}>
              <p className={style.questionCreated}>{trendingQuiz?.totalQuestions?(trendingQuiz?.totalQuestions):0}<span> questions</span></p>
              <p >Created</p>
            </div>
          </div>
          <div className={style.quizInfo}>
            <div className={`${style.quizBox1} ${style.Box3}`}>
              <p className={style.impression}>
                {trendingQuiz?.totalImpressions?(trendingQuiz?.totalImpressions<1000?trendingQuiz?.totalImpressions:`${(trendingQuiz.totalImpressions/1000).toFixed(1)}K`):0}
                <span> Total</span>
              </p>
              <p>Impressions</p>
            </div>
          </div>
        </section>
        <section className={style.lowerSection}>
          <h3>Trending Quizs</h3>
          <div className={style.quizContainer}>
            {
              trendingQuiz?.trendingQuizzes?.map(quiz => (
                <QuizChip key={quiz._id} quiz={quiz} />
              ))  
            }
          </div>
        </section>
      </div>
  );
  
}
