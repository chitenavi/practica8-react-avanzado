import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, InputNumber } from 'antd';

import { useFormContext } from './FormContext';

const InputCustom = ({ type, name, placeholder, className }) => {
  const { form, onChange } = useFormContext();

  const renderContent = () => {
    switch (type) {
      case 'price':
        return (
          <div>
            <span className="form-field--label">{`${type[0].toUpperCase()}${type.slice(
              1,
            )}: `}</span>
            <InputNumber
              name={name}
              onChange={value => {
                onChange({ target: { value, name } });
              }}
              min={0}
              max={10000}
              value={form[name]}
            />
          </div>
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            value={form[name]}
            onChange={onChange}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className={classNames('form-field', className)}>{renderContent()}</div>
  );
};

InputCustom.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

InputCustom.defaultProps = {
  placeholder: '',
  className: '',
};

export default InputCustom;
