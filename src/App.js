import React, { useState } from 'react';
import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2ProfessionalDetails from './components/Step2ProfessionalDetails';
import Step3Preferences from './components/Step3Preferences';
import Summary from './components/Summary';
import './styles.css';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePhoto: null,
    username: '',
    usernameAvailable: null,
    currentPassword: '',
    newPassword: '',
    profession: '',
    companyName: '',
    addressLine1: '',
    country: '',
    state: '',
    city: '',
    subscriptionPlan: 'Basic',
    newsletter: true
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const updateForm = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetAddress = () => {
    updateForm('state', '');
    updateForm('city', '');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1PersonalInfo formData={formData} updateForm={updateForm} nextStep={nextStep} />;
      case 2:
        return <Step2ProfessionalDetails formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3Preferences formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} resetAddress={resetAddress} />;
      case 4:
        return <Summary formData={formData} prevStep={prevStep} setStep={setStep} setFormData={setFormData} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="container">
      <h2>User Profile Update</h2>
      {renderStep()}
    </div>
  );
};

export default App;
