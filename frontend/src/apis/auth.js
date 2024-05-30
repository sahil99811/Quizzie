import axios from "axios";
import { toast } from 'react-hot-toast';

const backendURL = process.env.REACT_APP_BACKEND_BASE_URL;

// Function to handle user login
export const login = async (formdata) => {
    try {
        const result = await axios.post(`${backendURL}/auth/login`, formdata, {
            validateStatus(status) {
                return status === 201 || status === 401 || status === 403; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success(result.data.message); // Show success toast
            localStorage.setItem('token', JSON.stringify(result.data.token)); // Store token in local storage
            return result.data.token; // Return the token if status is 201
        } else {
            toast.error(result.data.message); // Show error toast
            return null; // Return null if status is 401 or 403
        }
    } catch (error) {
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return null; // Return null in case of an exception
    }
}

// Function to handle user signup
export const signup = async (formdata) => {
    try {
        console.log(formdata);
        const result = await axios.post(`${backendURL}/auth/signup`, formdata, {
            validateStatus(status) {
                return status === 400 || status === 409 || status === 201; // Only resolve these status codes
            }
        });

        if (result.status === 201) {
            toast.success(result.data.message); // Show success toast
            return true; // Return true if status is 201
        }
        toast.error(result.data.message); // Show error toast if status is 400 or 409
        return false; // Return false if status is 400 or 409
    } catch (error) {
        toast.error("Internal server error"); // Show error toast for any exception
        console.log(error); // Log the error for debugging
        return false; // Return false in case of an exception
    }
}
