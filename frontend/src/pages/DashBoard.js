 import React from 'react';
 import SideBar from '../components/dashboard/SideBar'
import { Outlet } from 'react-router-dom'
import CreateQuiz from '../components/dashboard/createquiz/CreateQuiz';
import { useSelector } from 'react-redux';
import style from '../styles/dashboard/Dashboard.module.css'
 export default function DashBoard() {

  const{deletePopup,createPopup}=useSelector((state)=>state.popup);
   return (
     <div className={style.container}>
        <SideBar/>
        <div className={style.outletContainer}>
          <Outlet></Outlet>
        </div>
       {    
        (deletePopup || createPopup) && (
          <div className={style.backgroundColor}></div>
         )
       }
       {
        createPopup&&<CreateQuiz/>
       }
     </div>
   )
 }
 