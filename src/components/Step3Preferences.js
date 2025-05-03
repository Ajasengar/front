import React, { useState, useEffect } from 'react';

const Step3Preferences = ({ formData, updateForm, nextStep, prevStep, resetAddress }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/countries')
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`http://localhost:5000/api/states/${formData.country}`)
        .then(res => res.json())
        .then(setStates)
        .catch(err => console.error('Error fetching states:', err));
      resetAddress();
      updateForm('state', '');
      updateForm('city', '');
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetch(`http://localhost:5000/api/cities/${formData.state}`)
        .then(res => res.json())
        .then(setCities)
        .catch(err => console.error('Error fetching cities:', err));
      updateForm('city', '');
    }
  }, [formData.state]);

  const handleNext = e => {
    e.preventDefault();
    if (!formData.country || !formData.state || !formData.city) {
      alert('Please select Country, State, and City');
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleNext}>
      <div>
        <label>Gender:</label>
        <select value={formData.gender} onChange={e => updateForm('gender', e.target.value)} required>
          <option value="">--Select Gender--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {formData.gender === 'Other' && (
          <div>
            <label>Specify Gender:</label>
            <input
              type="text"
              value={formData.customGender || ''}
              onChange={e => updateForm('customGender', e.target.value)}
              placeholder="Enter your gender"
            />
          </div>
        )}
      </div>

      <div>
        <label>Country:</label>
        <select value={formData.country} onChange={e => updateForm('country', e.target.value)} required>
          <option value="">--Select Country--</option>
          {countries.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>State:</label>
        <select value={formData.state} onChange={e => updateForm('state', e.target.value)} required>
          <option value="">--Select State--</option>
          {states.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>City:</label>
        <select value={formData.city} onChange={e => updateForm('city', e.target.value)} required>
          <option value="">--Select City--</option>
          {cities.map(ci => (
            <option key={ci} value={ci}>{ci}</option>
          ))}
        </select>
      </div>

      

      <div>
        <label>Subscription Plan:</label>
        <label>
          <input type="radio" name="sub" value="Basic" checked={formData.subscriptionPlan === 'Basic'} onChange={e => updateForm('subscriptionPlan', e.target.value)} /> Basic
        </label>
        <label>
          <input type="radio" name="sub" value="Pro" checked={formData.subscriptionPlan === 'Pro'} onChange={e => updateForm('subscriptionPlan', e.target.value)} /> Pro
        </label>
        <label>
          <input type="radio" name="sub" value="Enterprise" checked={formData.subscriptionPlan === 'Enterprise'} onChange={e => updateForm('subscriptionPlan', e.target.value)} /> Enterprise
        </label>
      </div>

      <div>
        <label>
          <input type="checkbox" checked={formData.newsletter} onChange={e => updateForm('newsletter', e.target.checked)} />
          Subscribe to newsletter
        </label>
      </div>

      <button type="button" onClick={prevStep}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step3Preferences;
