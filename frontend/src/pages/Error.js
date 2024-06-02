import React from 'react'; // Import React library
import style from '../styles/error.module.css'; // Import CSS module for styling
import errorStatus from '../assets/statuscode.png'
// Functional component to display error message
export default function Error() {
    return (
        <div className={style.container}>
            <img src={errorStatus} alt='errorImage'  />
        </div>
    );
}
