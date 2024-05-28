import validator from "validator";

const formValidation=(formdata)=>{
    const newError={
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    }   
        const validName=/^[a-zA-z\s]+$/.test(formdata.name)
        if(!validName){
          newError.name="Invalid name";
        }
        if(!validator.isEmail(formdata.email)){
            newError.email="Invalid email"
        }
        if(/^[a-z]+$/.test(formdata.password)||/^[A-Z]+$/.test(formdata.password)||/^\d+$/.test(formdata.password)||formdata.password.length<6){
            newError.password="Weak Password"
        }
        if(formdata.password!==formdata.confirmpassword)
            newError.confirmpassword="Password doesn't match"
    return newError;
}
export default formValidation;