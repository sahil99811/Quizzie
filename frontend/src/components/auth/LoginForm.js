import React, { useState } from 'react';
import style from '../../styles/auth/LoginForm.module.css';
import { toast } from 'react-hot-toast';
import validator from 'validator';
import { login } from '../../apis/auth';
import { setToken } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading,setloading]=useState(false);
  const dispatch=useDispatch();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setloading(true);
    const result = await login(formData);
    if(result){
      console.log(result);
      dispatch(setToken(result))
    }
    setloading(false);
  };

  return (
    <>
    {loading&&<p style={{"position":"absolute","marginTop":"-1.5rem","fontSize":"2rem"}}>Loading...</p>}
    <form className={style.container} onSubmit={onSubmitHandler}>
      <div className={style.inputContainer}>
        <label className={style.label}>Email</label>
        <input
          type='email'
          className={style.input}
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className={style.inputContainer}>
        <label className={style.label}>Password</label>
        <input
          type='password'
          className={style.input}
          name='password'
          value={formData.password}
          onChange={onChangeHandler} 
          required
        />
      </div>
      <button type='submit' className={style.button} style={{ marginTop: "15px" }}>
        Log in
      </button>
    </form>
    </>
  );
}
