import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const { auth , alert} = useSelector(state => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    fullname: '',
    email:'',
    password:'',
    username:'',
    confirmPassword:'',
    gender:'male',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(initialState);

  const {fullname, username, email, confirmPassword, password} = userData;

  const handleChnageInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(userData));
  };

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-16 w-auto"
            src="https://img.freepik.com/free-vector/follow-us-background_23-2148039524.jpg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              World Social Media Platform
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                <input
      id="fullname"
      name="fullname"
      type="text"
      value={fullname}
      onChange={handleChnageInput}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
      style={{ background: alert.fullname ? '#fd2d6a14' : '' }}
    />
       <small className="form-text text-danger">
        {alert.fullname ? alert.fullname :''}
       </small>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username.toLowerCase().replace(/ /g,'')}
                    onChange={handleChnageInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    style={{ background: alert.username ? '#fd2d6a14' : '' }}
                    />
       
                </div>
                <small className="form-text text-danger">
              {alert.username ? alert.username :''}
              </small>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChnageInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    style={{ background: alert.email ? '#fd2d6a14' : '' }} />
                    <small className="form-text text-danger">
        {alert.email ? alert.email :''}
       </small>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handleChnageInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    style={{ background: alert.password ? '#fd2d6a14' : '' }}/>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <AiOutlineEye
                        className="h-5 w-5 text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
               
                  </div>
                  <small className="form-text text-danger">
                 {alert.password ? alert.password :''}
                  </small>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 mb-2 rounded-md shadow-sm">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChnageInput}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    style={{ background: alert.confirmPassword ? '#fd2d6a14' : '' }}/>
                    <small className="form-text text-danger">
        {alert.confirmPassword ? alert.confirmPassword :''}
       </small>
                </div>
              </div>

              <div className="row justify-content-between mx-0 mb-4">
  <div className="col-auto">
    <label htmlFor="male" className="d-flex align-items-center">
      <input type="radio" id="male" name="gender" value="male" defaultChecked onChange={handleChnageInput} />
      <span className="ml-1">Male</span>
    </label>
  </div>
  <div className="col-auto">
    <label htmlFor="Female" className="d-flex align-items-center">
      <input type="radio" id="Female" name="gender" onChange={handleChnageInput} />
      <span className="ml-1">Female</span>
    </label>
  </div>
  <div className="col-auto">
    <label htmlFor="Other" className="d-flex align-items-center">
      <input type="radio" id="Other" name="gender" value="Other" onChange={handleChnageInput} />
      <span className="ml-1">Other</span>
    </label>
  </div>
</div>


              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create account
                  </button>
                </span>
              </div>
            </form>
            <div className="mt-6 text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Register;
