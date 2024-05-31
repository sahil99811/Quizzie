import React, { useEffect, useState } from 'react';
import QaCard from './QaCard';
import PollCard from './PollCard';
import style from '../../../../styles/dashboard/analytics/quizwiseanalytics/QuizAnalytics.module.css';
import { getQuizzAnalysis } from '../../../../apis/quiz';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formattedDate } from '../../../../utility/dateFormatter';
 import {useDispatch} from 'react-redux'
export default function QuestionCard() {
  const { token } = useSelector(state => state.auth);
  const { quizId } = useParams();
  const [quizz, setQuizz] = useState({});
  const [loading,setLoading]=useState(false);
  const date = formattedDate(quizz?.createdAt);
  const dispatch=useDispatch();
  /**
   * Function to fetch quiz analysis data
   */
  const fetchQuizz = async () => {
    setLoading(true);
    const result = await getQuizzAnalysis(token, quizId,dispatch);
    if (result) {
      setQuizz(result?.data?.quizz);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizz();
  }, []);

  return (
    <>
    {loading&&<p style={{ "position": "absolute", "marginTop": "1rem", "marginLeft":"30%", "fontSize": "2rem" }}>Loading...</p>}
    {
      !loading&&Object.keys(quizz)?.length !== 0 && (
        <div className={style.container}>
          {/* Upper Container */}
          <section className={style.upperContainer}>
            <p>{`${quizz?.quizzName} Question Analysis`}</p>
            {/* Quiz Details */}
            <div className={style.quizDetails}>
              <span>{`Created on : ${date}`}</span>
              <span>{`Impression : ${quizz.impression}`}</span>
            </div>
          </section>
          {/* Lower Container */}
          <section className={style.lowerContainer}>
            <div className={style.questionsData}>
              {/* Map through questions */}
              {quizz?.questions?.map((question, index) => (
                quizz?.quizzType === "Q&A" ? (
                  <QaCard question={question} key={question._id} qno={index + 1} />
                ) : (
                  <PollCard question={question} key={question._id} qno={index + 1} />
                )
              ))}
            </div>
          </section>
        </div>
      )
    }
    </>
  );
}
