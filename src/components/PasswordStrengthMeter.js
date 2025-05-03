import React from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const strength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[!@#$%^&*]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    return score;
  };

  const label = ['Weak', 'Medium', 'Strong'][strength() - 1] || 'Too short';
  const color = ['red', 'orange', 'green'][strength() - 1] || 'gray';

  return (
    <div>
      <small>Password Strength: <span style={{ color }}>{label}</span></small>
    </div>
  );
};

export default PasswordStrengthMeter;
