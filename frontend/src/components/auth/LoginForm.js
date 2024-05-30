import React, { useState } from 'react';
import style from '../../styles/auth/LoginForm.module.css';
import { toast } from 'react-hot-toast'; // Importing toast from react-hot-toast for displaying notifications
import validator from 'validator'; // Importing validator for email validation
import { login } from '../../apis/auth'; // Importing login function from auth API
import { setToken } from '../../slices/authSlice'; // Importing setToken action creator from authSlice
import { useDispatch } from 'react-redux'; // Importing useDispatch hook from react-redux for dispatching actions

// Component for login form
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); // State variable for loading indicator
  const dispatch = useDispatch(); // useDispatch hook to get the dispatch function

  // Function to handle input change
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validating email format
    if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true); // Set loading to true while making API call
    const result = await login(formData); // Calling login API function
    if (result) {
      dispatch(setToken(result)); // Dispatching setToken action with the token received from login API
    }
    setLoading(false); // Set loading back to false after API call
  };

  return (
    <>
      {/* Display loading indicator while loading */}
      {loading && <p style={{ "position": "absolute", "marginTop": "-1.5rem", "fontSize": "2rem" }}>Loading...</p>}
      {/* Login form */}
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
