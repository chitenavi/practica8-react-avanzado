import { useState } from 'react';

const useForm = (...formFields) => {
  const [form, setForm] = useState(...formFields);

  const handleFormChange = event => {
    if (event.target.type === 'checkbox') {
      return setForm({ ...form, [event.target.name]: event.target.checked });
    }
    return setForm({ ...form, [event.target.name]: event.target.value });
  };

  return [form, handleFormChange];
};

export default useForm;
