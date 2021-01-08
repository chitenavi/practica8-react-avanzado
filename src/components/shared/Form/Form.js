import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import useForm from '../../../hooks/useForm';
import { FormContext } from './FormContext';

function Form({ children, initialValue, onSubmit, submitLabel }) {
  const [form, onChange] = useForm(initialValue);

  const submitForm = ev => {
    ev.preventDefault();
    onSubmit(form);
  };

  const canSubmit = () => {
    if (!form.validateFields) return true;
    let canSub = true;
    for (let i = 0; i < form.validateFields.length; i += 1) {
      if (!form[form.validateFields[i]]) {
        canSub = false;
        break;
      }
    }
    return canSub;
  };

  return (
    <form action="" onSubmit={submitForm}>
      <FormContext.Provider value={{ form, onChange }}>
        {children}
      </FormContext.Provider>
      <Button type="submit" className="secondary" disabled={!canSubmit()}>
        {submitLabel}
      </Button>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  initialValue: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
};

Form.defaultProps = {
  submitLabel: 'Submit',
};

export default Form;
