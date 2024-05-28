import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import style from '../../styles/auth/TemplateForm.module.css';

export default function TemplateForm() {
  const [formType, setFormType] = useState("signup");
  return (
    <div className={style.container}>
      <h2 className={style.heading}>QUIZZIE</h2>
      <div className={style.formButton}>
        <button 
          className={`${style.button} ${formType === 'signup' && style.active }`} 
          onClick={() => setFormType('signup')}
        >
          Sign Up
        </button>
        <button 
          className={`${style.button} ${formType === 'login'&& style.active}`} 
          onClick={() => setFormType('login')}
        >
          Log In
        </button>
      </div>
      {
        formType === "signup" ? <SignupForm  /> : <LoginForm/>
      }
    </div>
  );
}
