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
  <div>
    <section className="vh-100" style={{ backgroundColor: '#fee2e2' }}>
      <form onSubmit={handleSubmit}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://img.freepik.com/premium-vector/concept-illustration-man-woman-friends-having-online-conversation-messaging-chatting-communication-texting-messages-mobile-phone-apps-flat-cartoon-style_270158-412.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          onChange={handleChnageInput}
                          value={email}
                          name="email"
                        />
                        <label className="form-label" htmlFor="form2Example17">Email address</label>
                      </div>

                      <div className="form-outline mb-9 relative">
                        <input
                          type={typePass ? "text" : "password"}
                          id="form2Example27"
                          className="form-control form-control-lg pr-10"
                          onChange={handleChnageInput}
                          value={password}
                          name="password"
                        />
                        <small
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          style={{ height: '44px' }}
                          onClick={() => setTypePass(!typePass)}
                        >
                          {typePass ? (
                            <AiOutlineEyeInvisible className="w-6 h-6" />
                          ) : (
                            <AiOutlineEye className="w-6 h-6" />
                          )}
                        </small>
                        <label className="form-label" htmlFor="form2Example27">Password</label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">Forgot password?</a>
                      <Link to="/register">
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a>
                        </p>
                      </Link>
                      <a href="#!" className="small text-muted">Terms of use.</a>
                      <a href="#!" className="small text-muted">Privacy policy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
);
};

export default Login;