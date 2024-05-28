import axios from "axios";
import {toast} from 'react-hot-toast';
import { json } from "react-router-dom";
const backendURL=process.env.REACT_APP_BACKEND_BASE_URL;
export const login=async(formdata)=>{
    
    try {
        const result=await axios.post(`${backendURL}/auth/login`,formdata,{
            validateStatus(status){
                return status===201||status===402||status===401
            }
        })
        if(result.status===201){
            toast.success(result.data.message);
            console.log(result.data.token);
            localStorage.setItem('token',JSON.stringify(result.data.token));
            return result.data.token;
        }
        else {
            toast.error(result.data.message);
            return null;
        }
    } catch (error) {
        toast.error("Internal server error");
        console.log(error);
        return null;
    }
}

export const signup=async(formdata)=>{
    try{
        console.log(formdata);
    const result=await axios.post(`${backendURL}/auth/signup`,formdata,{
        validateStatus(status){
            return status===400||status===401||status===201
        }
    });
    if(result.status===400){
        toast.error(result.data.message);
        return  false;
    }else if(result.status===401){
        toast.error(result.data.message)
        return false;
    }else if(result.status===201){
        toast.success(result.data.message)
        return true;
    }
    }catch(error){
        toast.error("Internal server error")
        console.log(error);
        return false;
    }
}