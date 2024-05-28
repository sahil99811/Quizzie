import React, { useEffect, useState } from 'react';
import QaCard from './QaCard';
import PollCard from './PollCard';
import style from '../../../../styles/dashboard/analytics/quizwiseanalytics/QuizAnalytics.module.css';
import { getQuizzAnalysis } from '../../../../apis/quiz';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {formattedDate} from '../../../../utility/dateFormatter'
export default function QuestionCard() {
  
  const { token } = useSelector(state => state.auth);
  const { quizId } = useParams();
  const [quizz, setQuizz] = useState({});
  const date=formattedDate(quizz?.createdAt);
  const fetchQuizz = async () => {
    
    const result = await getQuizzAnalysis(token, quizId);
    if (result) {
      setQuizz(result?.data?.quizz);
    }
  };

  useEffect(() => {
    fetchQuizz();
  }, [ ]);

  return (
    Object.keys(quizz)?.length !== 0 && (
      <div className={style.container}>
        <section className={style.upperContainer}>
          <p>{`${quizz?.quizzName} Question Analysis`}</p>
          <div className={style.quizDetails}>
            <span>{`Created on : ${date}`}</span>
            <span>{`Impression : ${quizz.impression}`}</span>
          </div>
        </section>
        <section className={style.lowerContainer}>
          <div className={style.questionsData}>
            {quizz?.questions?.map((question, index) => ( 
              quizz?.quizzType==="Q&A"?<QaCard question={question} key={question._id} qno={index + 1} />:<PollCard question={question} key={question._id} qno={index + 1}/>
            ))}
          </div>
        </section>
      </div>
    )
  );
}
