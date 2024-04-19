const valid = ({fullname, username, email, confirmPassword, password})=>{
    const error = {}

    if(!fullname){
        error.fullname = "Please add your full Name ."
    }else if(fullname.length > 25){
        error.fullname = "Full name is up to 25 characters long."
    }

    if(!username){
        error.username = "Please add your username ."
    }else if(username.replace(/ /g, '').length > 25){
        error.fullname = "username  is up to 25 characters long."
    }
   
    if(!email){
        error.email = "Please add your Valid Email ."
    }else if(!validateEmail(email)){
        error.email = "Email format is incorrect."
    }

    if(!password){
        error.password = "Please add your password ."
    }else if(!strongPassword(password)){
        error.password = "Password must be 10-16 characters long and include at least one uppercase letter, one lowercase letter, one digit."
    }

    if(password !== confirmPassword){
        error.confirmPassword = "Confirm password did not match ."
   
    }
    return{
        errMsg:error,
        errLength:Object.keys(error).length
    }
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const strongPassword = (password) => {
    return /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])\S[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{9,15}$/.test(password);
}


  export default valid;