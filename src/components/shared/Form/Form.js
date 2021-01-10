import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import useForm from '../../../hooks/useForm';
import { FormContext } from './FormContext';

function Form({
  children,
  initialValue,
  onSubmit,
  submitLabel,
  method,
  encType,
}) {
  const [form, onChange] = useForm(initialValue);

  const submitForm = ev => {
    ev.preventDefault();
    onSubmit(form);
  };

  const canSubmit = () => {
    if (!form.validateFields) return true;
    let canSub = true;
    for (let i = 0; i < form.validateFields.length; i += 1) {
      if (Array.isArray(form[form.validateFields[i]])) {
        if (form[form.validateFields[i]].length === 0) {
          canSub = false;
          break;
        }
      }
      if (!form[form.validateFields[i]]) {
        canSub = false;
        break;
      }
    }
    return canSub;
  };

  return (
    <form
      method={method}
      encType={encType}
      className="form"
      action=""
      onSubmit={submitForm}
      noValidate
    >
      <FormContext.Provider value={{ form, onChange }}>
        {children}
      </FormContext.Provider>
      <div className="form-button">
        <Button type="submit" className="secondary" disabled={!canSubmit()}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  initialValue: PropTypes.objectOf(PropTypes.any).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string,
  method: PropTypes.string,
  encType: PropTypes.string,
};

Form.defaultProps = {
  submitLabel: 'Submit',
  method: 'GET',
  encType: 'application/x-www-form-urlencoded',
};

export default Form;
