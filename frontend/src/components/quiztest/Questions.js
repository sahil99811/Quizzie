import React, { useEffect, useState } from 'react';
import style from '../../styles/quiztest/Questions.module.css';
import OptionsCard from './OptionsCard';
import Score from './Score';
import { getQuizQuestions, submitQuiz } from '../../apis/quiz';
import { useParams } from 'react-router-dom';

export default function Questions() {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState({});
  const [qno, setQno] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState("OFF");
  const timerSetting = "OFF";
  const fetchQuestions = async () => {
    const result = await getQuizQuestions(quizId);
    if (result) {
      if(result?.timer!=="OFF")
      setTimer(Number(result?.timer));
      setQuizData(result);
      
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [ ]);
  console.log(quizData);
  useEffect(() => {
    if (timer!== "OFF") {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [qno]);

  useEffect(() => {
    if (timer === 0 && timerSetting !== "OFF") {
      nextQuestionHandler();
    }
  }, [timer]);

  const nextQuestionHandler = () => {
    if (qno <= quizData?.questions?.length - 1) {
      setQno(qno + 1);
      setTimer(10);
    } 
  };

  return (
    Object.keys(quizData).length !== 0 && (
      <div className={style.container}>
        {qno < quizData?.questions?.length ? (
          <>
            <div className={style.totalQuestion}>
              <span className={style.questionNo}>{`${qno + 1}/${quizData?.questions?.length}`}</span>
              {timerSetting !== "OFF" && (
                <span className={style.timer}>{`00:${timer < 10 ? `0${timer}` : timer}s`}</span>
              )}
            </div>
            <div className={style.questionDetails}>
              <p>{quizData?.questions[qno]?.description}</p>
              <OptionsCard 
                id={quizData?.questions[qno]._id}
                options={quizData?.questions[qno]?.options}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                optionType={quizData?.questions[qno]?.optionType}
              />
              <button className={style.button} onClick={nextQuestionHandler}>{qno === quizData?.questions?.length - 1 ? "Submit" : "Next"}</button>
            </div>
          </>
        ) : (
          <Score quizId={quizData?._id} quizzType={quizData?.quizzType} selectedOptions={selectedOptions} totalQz={qno}/>
        )}
      </div>
    )
  );
}
