import React from 'react';

const Step2ProfessionalDetails = ({ formData, updateForm, nextStep, prevStep }) => {
  const handleProfessionChange = e => {
    updateForm('profession', e.target.value);
    if (e.target.value !== 'Entrepreneur') updateForm('companyName', '');
  };

  const handleNext = e => {
    e.preventDefault();
    if (!formData.addressLine1) {
      alert('Address Line 1 is required');
      return;
    }
    if (formData.profession === 'Entrepreneur' && !formData.companyName) {
      alert('Company Name is required');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <div>
        <label>Profession:</label>
        <select value={formData.profession} onChange={handleProfessionChange} required>
          <option value="">--Select--</option>
          <option>Student</option>
          <option>Developer</option>
          <option>Entrepreneur</option>
        </select>
      </div>

      {formData.profession === 'Entrepreneur' && (
        <div>
          <label>Company Name:</label>
          <input type="text" value={formData.companyName} onChange={e => updateForm('companyName', e.target.value)} required />
        </div>
      )}

      <div>
        <label>Address Line 1:</label>
        <input type="text" value={formData.addressLine1} onChange={e => updateForm('addressLine1', e.target.value)} required />
      </div>

      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2ProfessionalDetails;
