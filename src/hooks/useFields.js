import { useState } from 'react';

const useFields = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (evt) => {
    setFormData((formData) => (
      {
        ...formData,
        [evt.target.name]: evt.target.value
      }
    ))
  }
  const resetFormData = () => {
    setFormData(initialState);
  }
  const resetPasswordField = () => {
    setFormData((formData) => (
      {
        ...formData,
        password: ''
      }
    ))
  }
  return [formData, handleChange, resetFormData, resetPasswordField];
}

export default useFields;