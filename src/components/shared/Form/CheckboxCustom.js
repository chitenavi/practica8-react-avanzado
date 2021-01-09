import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import { useFormContext } from './FormContext';

const CheckboxCustom = ({ name, label, className }) => {
  const { form, onChange } = useFormContext();

  return (
    <div className={classNames('form-field', className)}>
      <Checkbox
        style={{ color: 'white' }}
        name={name}
        checked={form[name]}
        onChange={onChange}
      >
        {label}
      </Checkbox>
    </div>
  );
};

CheckboxCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CheckboxCustom.defaultProps = {
  className: '',
};
export default CheckboxCustom;
