import React, { useState } from 'react';

const withFormHandling = (WrappedComponent, initialState) => {
  return function FormHandlingComponent(props) {
    const [formData, setFormData] = useState(initialState);
    const [validationErrors, setValidationErrors] = useState({});

    // Function to update the form field value in state
    const handleFieldChange = (fieldName, value) => {
      setFormData({ ...formData, [fieldName]: value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validateForm(formData);
      setValidationErrors(errors);

      
      // Do something with the form data, e.g., save it to the database
      console.log('Form data submitted:', formData);
    };

    return (
      <WrappedComponent
        formData={formData}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        validationErrors={validationErrors}
        {...props}
      />
    );
  };
};

export default withFormHandling;
