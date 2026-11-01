// src/components/ErrorPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from 'react-icons/fa'
import { errorConstants } from '../../constants/errorConstants'
export const ErrorPage = ({message}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
        <FaExclamationTriangle className='text-6xl text-red-500 mb-4' />
        <h1 className=' text-2xl md:text-4xl font-bold mb-2'>
            {errorConstants.errorTitle}
        </h1>
        <p className='text-gray-600 mb-6 text-center'>
            {message ? message : errorConstants.errorMessage}
        </p>
        <button onClick={() => {
            navigate("/dashboard");
        }}
        className='px-4 py-2 text-white rounded bg-btn hover:bg-blue-600 transition cursor-pointer'
        >
            {errorConstants.DASHBOARD}
        </button>
    </div>
  );
};
