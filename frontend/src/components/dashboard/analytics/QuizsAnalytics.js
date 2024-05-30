import React, { useEffect, useState } from 'react';
import sharelogo from '../../../assets/share.png';
import deletelogo from '../../../assets/delete.png';
import editlogo from '../../../assets/edit.png';
import { Link, useLocation } from 'react-router-dom';
import style from '../../../styles/dashboard/analytics/QuizsAnalytics.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizzsAnalysis, deleteQuiz,quizDetails } from "../../../apis/quiz";
import copy from "copy-to-clipboard";
import { toast } from 'react-hot-toast';
import { formattedDate } from '../../../utility/dateFormatter';
import { setDeletePopup,setEditPopup } from '../../../slices/popupSlice';
import QuestionCard from '../createquiz/QuestionCard';

// Frontend base URL
const frontendURL = process.env.REACT_APP_FRONTEND_BASE_URL;

export default function QuizsAnalytics() {
  // Redux hooks
  const { deletePopup, createPopup,editPopup } = useSelector((state) => state.popup);
  const dispatch = useDispatch();

  // Local state
  const [deleteQuizId, setDeleteQuizId] = useState("");
  const { token } = useSelector(state => state.auth);
  const [quizzs, setQuizzs] = useState([]);
  const [quizzData,setQuizzData]=useState({});
  const location = useLocation();
  
  // Open delete confirmation popup
  const openPopupHandler = (event) => {
    const quizId = event.target.dataset.id;
    setDeleteQuizId(quizId)
    dispatch(setDeletePopup(!deletePopup))
  }

  // Close delete confirmation popup
  const closePopupHandler = (event) => {
    event.preventDefault();
    dispatch(setDeletePopup(!deletePopup))
    setDeleteQuizId("");
  }

  // Copy quiz URL to clipboard
  const shareQuizHandler = (event) => {
    event.preventDefault();
    const quizId = event.target.dataset.id;
    copy(`${frontendURL}/quizTest/${quizId}`)
    toast.success("Link copied to Clipboard")
  }

  //edit quiz 
  const editPopupHandler=async(event)=>{
    const quizId = event.target.dataset.id;
    const result=await quizDetails(quizId,token,dispatch)
    if(result)
     {
      setQuizzData(result?.data?.quizDetails)
      dispatch(setEditPopup(true));
     }
  }

  // Delete quiz handler
  const deleteQuizHandler = async (event) => {
    event.preventDefault();
    await deleteQuiz(deleteQuizId, token);
    setDeleteQuizId("");
    dispatch(setDeletePopup(!deletePopup));
    fetchQuizzAnalysis();
  }

  // Fetch quiz analysis data
  const fetchQuizzAnalysis = async () => {
    const result = await getQuizzsAnalysis(token,dispatch);
    setQuizzs(result?.data?.quizzs);
  }

  useEffect(() => {
    if (createPopup !== true && location.pathname === '/dashboard/quizzes') {
      fetchQuizzAnalysis();
    }
  }, [createPopup]);

  return (
    <>
      {/* Quiz Analysis Container */}
      <div className={`${style.container} ${deletePopup && style.active}`}>
        <h2>Quiz Analysis</h2>
        <div className={style.tableContainer}>
          {/* Table displaying quiz data */}
          {quizzs?.length !== 0 && (
            <table className={style.table}>
              <thead className={style.tableHeading}>
                <tr className={style.tableHeadingRow}>
                  <th>S.No</th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {quizzs?.map((quiz, index) => (
                  <tr className={style.tableDataRow} key={quiz._id}>
                    <td>{index + 1}</td>
                    <td>{quiz.quizzName}</td>
                    <td>{formattedDate(quiz?.createdAt)}</td>
                    <td>{quiz.impression}</td>
                    <td className={style.buttons}>
                      <img src={editlogo} alt='edit quiz' onClick={editPopupHandler} data-id={quiz._id}/>
                      <img src={deletelogo} alt='delete quiz' onClick={openPopupHandler} data-id={quiz._id} />
                      <img src={sharelogo} alt='share quiz' onClick={shareQuizHandler} data-id={quiz._id} />
                    </td>
                    <td style={{ "color": "black" }}>
                      <Link to={`/dashboard/quizzes/${quiz._id}`}>
                        Question Wise Analysis
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup && (
        <div className={style.popupContainer}>
          <div className={style.messageContainer}>
            <span>Are You Confirm You</span>
            <span>Want to delete ?</span>
          </div>
          <div className={style.buttonContainer}>
            <button className={style.confirmButton} onClick={deleteQuizHandler}>Confirm Delete</button>
            <button className={style.cancelButton} onClick={closePopupHandler}>Cancel</button>
          </div>
        </div>
      )}
      {
        editPopup&&(<QuestionCard quizzData={quizzData}/>)
      }
    </>
  );
}
