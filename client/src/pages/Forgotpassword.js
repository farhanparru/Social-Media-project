import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';     
import { ForgotPassword, changePassword } from '../redux/actions/authAction'; // Import both actions
import axios from 'axios';

const ForgotPasswordPage = () => {
  const { id, token } = useParams(); 
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Dispatch ForgotPassword action
      await dispatch(ForgotPassword(id, token)); 
      
      // Call API to change password
      const response = await axios.post(
        `http://localhost:4000/api/${id}/${token}`, // Corrected comma here
        {
          password: password,
          confirm: confirmPassword // Corrected variable name here
        }
      );

    
      
      // Check response status
      if (response.status === 201) {
        setMessage('Password updated successfully.');
      } else {
        setMessage('Failed to update password.');     
      }
    } catch (error) {
      // Handle error here
      console.error('Password change failed:', error);
      setMessage('Failed to update password.');
    }
  };
       
  const setValue = (e) => {
    setPassword(e.target.value);
  };
      
  const setValue1 = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-8">
          <div className="mb-8 text-center text-indigo-400">
            <h1 className="text-3xl font-bold tracking-widest">Change Password</h1>
            <p><span className="font-bold">Enter your new password and confirm</span></p>
          </div>
          <div className="space-y-6">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              onChange={setValue}
              value={password}  
              className="w-full rounded-full border bg-gray-200 focus:outline-none focus:bg-white focus:border-indigo-500 px-4 py-2"
            />
            <div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm New Password"
                onChange={setValue1}
                value={confirmPassword}
                className="w-full rounded-full border bg-gray-200 focus:outline-none focus:bg-white focus:border-indigo-500 px-4 py-2"
              />
              <p id="validation" className="text-center text-blue-500 italic text-sm">{error}</p>
              <p id="message" className="text-center text-green-500 italic text-sm">{message}</p>
            </div>
            <button
              id="showPw"
              className="w-full rounded-full bg-indigo-500 text-white px-4 py-2 hover:bg-blue-500"
              onClick={handleFormSubmit} 
            >
              <span id="showHide">Submit</span> 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
