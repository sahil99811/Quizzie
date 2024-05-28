import React, { useEffect, useState } from 'react';
import style from '../../styles/quiztest/Score.module.css';
import trophy from '../../assets/trophy.png';
import { submitQuiz } from '../../apis/quiz';

export default function Score({ quizId, quizzType, selectedOptions, totalQz }) {
  const [score, setScore] = useState(0);
  const [pollSubmitted, setPollSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchScore = async () => {
    setLoading(true);
    const result = await submitQuiz(quizId, selectedOptions);
    if (result) {
      if (quizzType === "Q&A") {
        setScore(result.data?.score);
      } else if (quizzType === "Poll") {
        setPollSubmitted(true);
      }
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className={style.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        quizzType !== "Poll" ? (
          <>
            <p>Congrats Quiz is completed</p>
            <img src={trophy} alt="trophy" />
            <p className={style.score}>Your Score is <span>{`${score}/${totalQz}`}</span></p>
          </>
        ) : (
          pollSubmitted && (
            <p className={style.pollOutput}>Thank You For Participating in the Poll</p>
          )
        )
      )}
    </div>
  );
}
