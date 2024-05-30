import React, { useState } from 'react'; // Import React and useState hook
import style from '../../styles/auth/SignupForm.module.css'; // Import CSS module for styling
import formValidation from '../../utility/formValidation'; // Import form validation utility function
import toast from 'react-hot-toast'; // Import toast notification library
import { signup } from '../../apis/auth'; // Import signup API function

// Component for signup form
export default function SignupForm({ setForm }) {
    const [loading, setloading] = useState(false); // State to manage loading state
    const [signupData, setSignupData] = useState({ // State to manage form data
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    const [errors, setErrors] = useState({ // State to manage form validation errors
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    });

    // Event handler for input change
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

    // Event handler for form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        // Check if all fields are filled
        const allFieldsFilled = Object.values(signupData).every(data => data !== "");
        if (!allFieldsFilled) {
            toast.error("All fields are required");
            return;
        }

        // Validate form data
        const validationErrors = formValidation(signupData);
        setErrors(validationErrors);

        // If no validation errors, call signup API
        if (!validationErrors.name && !validationErrors.email && !validationErrors.password && !validationErrors.confirmpassword) {
            setloading(true);
            const result = await signup(signupData);
            if (result) {
                setForm("login"); // Switch to login form after successful signup
                setSignupData({ name: "", email: "", password: "", confirmpassword: "" }); // Clear form data
            }
            setloading(false);
        }
    };

    // Reset input value if there is an error
    if (errors.name && signupData.name !== "") {
        setSignupData({ ...signupData, name: "" });
    }
    if (errors.email && signupData.email !== "") {
        setSignupData({ ...signupData, email: "" });
    }
    if (errors.password && signupData.password !== "") {
        setSignupData({ ...signupData, password: "" });
    }
    if (errors.confirmpassword && signupData.confirmpassword !== "") {
        setSignupData({ ...signupData, confirmpassword: "" });
    }

    return (
        <>
            {
                loading && <p style={{ "position": "absolute", "marginTop": "-1.5rem", "fontSize": "2rem" }}>Loading...</p>
            }
            {/* Signup form */}
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
                        placeholder={errors.email}
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
        </>
    );
}
