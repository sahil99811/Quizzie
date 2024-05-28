import React, { useState } from 'react';
import style from '../../styles/auth/SignupForm.module.css';
import formValidation from '../../utility/formValidation';
import { toast } from 'react-hot-toast';
import {signup} from '../../apis/auth'
import {setToken} from '../../slices/authSlice'
export default function SignupForm() {
  
    const [signupData, setSignupData] = useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setSignupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const onSubmitHandler =async  (event) => {
        event.preventDefault();

        const allFieldsFilled = Object.values(signupData).every(data => data !== "");
        if (!allFieldsFilled) {
            
            toast.error("All fields are required");
            return;
        }

        const validationErrors = formValidation(signupData);
        console.log(validationErrors);
        setErrors(validationErrors);
        if (!validationErrors.name&&!validationErrors.email&&!validationErrors.password&&!validationErrors.confirmpassword) {
         await signup(signupData)
         setSignupData({ name:"",email:"",password:"",confirmpassword:""})
        } 
    };
    if(errors.name&&signupData.name!==""){
        setSignupData({...signupData,name:""});
      
    }
    if(errors.email&&signupData.email!==""){
        setSignupData({...signupData,email:""});
       
    }
    if(errors.password&&signupData.password!==""){
        setSignupData({...signupData,password:""});
        
    }
    if(errors.confirmpassword&&signupData.confirmpassword!==""){
        setSignupData({...signupData,confirmpassword:""});
       
    }
    return (
        <form className={style.container} onSubmit={onSubmitHandler}>
            <div className={style.inputContainer}>
                <label className={style.label}>Name</label>
                <input
                    type='text'
                    name='name'
                    className={`${style.input} ${errors.name && style.active}`}
                    value={signupData.name}
                    onChange={onChangeHandler}
                    placeholder={errors.name}
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.label}>Email</label>
                <input
                    type='text'
                    name='email'
                    className={`${style.input} ${errors.email && style.active}`}
                    value={signupData.email}
                    onChange={onChangeHandler}
                    placeholder={errors.email }
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.label}>Password</label>
                <input
                    type='password'
                    name='password'
                    className={`${style.input} ${errors.password && style.active}`}
                    value={signupData.password}
                    onChange={onChangeHandler}
                    placeholder={errors.password}
                />
            </div>
            <div className={style.inputContainer}>
                <label className={style.label}>Confirm Password</label>
                <input
                    type='password'
                    name='confirmpassword'
                    className={`${style.input} ${errors.confirmpassword && style.active}`}
                    value={signupData.confirmpassword}
                    onChange={onChangeHandler}
                    placeholder={errors.confirmpassword || ""}
                />
            </div>
            <button type='submit' className={style.button}>Sign-Up</button>
        </form>
    );
}
