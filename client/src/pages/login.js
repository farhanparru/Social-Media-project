import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";
import {useDispatch,useSelector} from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = { email: "", password: "" }; // Corrected 'pasword' to 'password'

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass,setTypePass] = useState(false)
  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()
  const navigate = useNavigate() 

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const handleChnageInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

 const handleSubmit = e =>{
    e.preventDefault()
    dispatch(login(userData))

 }


 return (
  <div className="auth_page items-center justify-center">
    <form onSubmit={handleSubmit}>
      <div class="flex flex-wrap">
        <div class="flex w-full flex-col md:w-1/2">
          <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <a href="#" class="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">Damasus.</a>
          </div>
          <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p class="text-left text-3xl font-bold italic hover:not-italic">Welcome back, Social Media App</p>
            <p class="mt-2 text-left text-gray-500">Welcome back, please enter your details.</p>
            <button class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white">
              <img class="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt /> Log in with Google
            </button>
            <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
            </div>
            <div class="flex flex-col pt-3 md:pt-8">
              <div class="flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input 
                    class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
                    placeholder="Email"
                    type="email"
                    onChange={handleChnageInput}
                    value={email}
                    name="email"
                  />
                </div>
              </div>
              <div class="mb-12 flex flex-col pt-4">
                <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input 
                    id="login-password" 
                    class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password" 
                    type={typePass ? "text" : "password"}
                    onChange={handleChnageInput}
                    value={password}
                    name="password"
                  />
                  <small
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setTypePass(!typePass)}
                  >
                    {typePass ? <AiOutlineEyeInvisible className="w-6 h-6 ml-2" /> : <AiOutlineEye className="w-6 h-6 ml-2" />}
                  </small>
                </div>
              </div>
              <button type="submit" class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2">Log in</button>
            </div>
            <div class="py-12 text-center">
              <p class="whitespace-nowrap text-gray-600">
                Don't have an account?
                <Link to="/register"> <a href="#" class="underline-offset-4 font-semibold text-gray-900 underline">Sign up for free.</a></Link>
              </p>
            </div>
          </div>
        </div>
        <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p class="mb-8 text-3xl font-semibold leading-10">.</p>
            <p class="mb-4 text-3xl font-semibold"></p>
            <p class=""></p>
            <p class="mb-7 text-sm opacity-70"></p>
          </div>
          <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://img.freepik.com/premium-vector/concept-illustration-man-woman-friends-having-online-conversation-messaging-chatting-communication-texting-messages-mobile-phone-apps-flat-cartoon-style_270158-412.jpg" />
        </div>
      </div>
    </form>
  </div>
);

};

export default Login;
