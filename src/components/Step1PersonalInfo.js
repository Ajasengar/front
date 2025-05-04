import React, { useState, useEffect } from 'react';
import PasswordStrengthMeter from './PasswordStrengthMeter';

const Step1PersonalInfo = ({ formData, updateForm, nextStep }) => {
  const [preview, setPreview] = useState(null);
  const [usernameStatus, setUsernameStatus] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type) && file.size <= 2 * 1024 * 1024) {
      updateForm('profilePhoto', file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Invalid file (only JPG/PNG, max 2MB)');
    }
  };

  const checkUsername = async () => {
    const res = await fetch(`/api/username-check?username=${formData.username}`);
    const data = await res.json();

    if (data.available) {
      setUsernameStatus('Username is available');
      updateForm('usernameAvailable', true);
    } else {
      setUsernameStatus('Username is already taken');
      updateForm('usernameAvailable', false);
    }
  };

  const handleNext = e => {
    e.preventDefault();

    console.log("profilePhoto:", formData.profilePhoto);
    console.log("username:", formData.username);
    console.log("usernameAvailable:", formData.usernameAvailable);

    if (!formData.profilePhoto || !formData.username || formData.usernameAvailable === null) {
      alert('Please complete all required fields');
      return;
    }

    // ✅ New password validation
    const newPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (formData.newPassword) {
      if (!newPasswordRegex.test(formData.newPassword)) {
        alert('New password must be at least 8 characters long, contain at least 1 number and 1 special character');
        return;
      }
      if (!formData.currentPassword) {
        alert('Please enter current password to change your password');
        return;
      }
    }

    nextStep();
  };

  useEffect(() => {
    if (formData.username.length < 4 || formData.username.length > 20) {
      setUsernameStatus('Username must be between 4-20 characters');
      updateForm('usernameAvailable', false);
    } else if (formData.username.length > 0) {
      checkUsername();
    } else {
      setUsernameStatus(null);
      updateForm('usernameAvailable', null);
    }
  }, [formData.username]);

  return (
    <form onSubmit={handleNext}>
      <div>
        <label>Profile Photo (JPG/PNG ≤2MB):</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        {preview && <img src={preview} alt="preview" style={{ width: 100, height: 100 }} />}
      </div>

      <div>
        <label>Username (4-20 chars):</label>
        <input
          type="text"
          value={formData.username}
          onChange={e => updateForm('username', e.target.value)}
          onBlur={checkUsername}
          minLength={4}
          maxLength={20}
          pattern="^\S+$"
          required
        />
        {usernameStatus && <span>{usernameStatus}</span>}
      </div>

      <div>
        <label>Current Password (required if changing password):</label>
        <input
          type="password"
          value={formData.currentPassword}
          onChange={e => updateForm('currentPassword', e.target.value)}
        />
      </div>

      <div>
        <label>New Password (min 8 chars, 1 special char, 1 number):</label>
        <input
          type="password"
          value={formData.newPassword}
          onChange={e => updateForm('newPassword', e.target.value)}
          pattern="^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
          title="At least 8 characters, 1 number, 1 special character"
        />
        <PasswordStrengthMeter password={formData.newPassword} />
      </div>

      <button type="submit">Next</button>
    </form>
  );
};

export default Step1PersonalInfo;
