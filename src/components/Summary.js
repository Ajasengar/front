import React from 'react';

const Summary = ({ formData, prevStep, setStep, setFormData }) => {

  const handleSubmit = async () => {

    console.log('Submitting the following data:', formData);

    const fd = new FormData();
    if (formData.profilePhoto instanceof File) {
      fd.append('profilePhoto', formData.profilePhoto);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'profilePhoto') {
        if (typeof value === 'object' && value !== null) {
          fd.append(key, JSON.stringify(value));
        } else {
          fd.append(key, value);
        }
      }
    });

    try {
      const res = await fetch('https://backend-edvinbweb-comps-projects-9855a82b.vercel.app/api/save-profile', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        alert('Profile submitted successfully!');
        setStep(1);  
        setFormData({
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

      } else {
        alert(data.error || 'Failed to submit profile');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting profile');
    }
  };

  const profilePhotoPreview = formData.profilePhoto instanceof File
  ? URL.createObjectURL(formData.profilePhoto)
  : null;

  return (
    <div>
    <h3>Summary</h3>

  
    {profilePhotoPreview && (
      <div>
        <h4>Profile Photo:</h4>
        <img 
          src={profilePhotoPreview} 
          alt="Profile" 
          style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }} 
        />
      </div>
    )}

   
    <pre>{JSON.stringify(formData, null, 2)}</pre>

    <button onClick={prevStep}>Back</button>
    <button onClick={handleSubmit}>Submit</button>
  </div>
  );
};

export default Summary;
