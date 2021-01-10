import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Radio } from 'antd';
import { useFormContext } from './FormContext';

const RadioGroup = ({ name, label, className, options }) => {
  const { form, onChange } = useFormContext();

  const renderContent = () => {
    if (options.length <= 1) return null;
    if (options.length === 2) {
      return (
        <>
          <Radio style={{ color: 'white' }} value>
            {options[0].toUpperCase()}
          </Radio>
          <Radio style={{ color: 'white' }} value={false}>
            {options[1].toUpperCase()}
          </Radio>
        </>
      );
    }

    return options.map(value => (
      <Radio key={value} style={{ color: 'white' }} value={value}>
        {value.toUpperCase()}
      </Radio>
    ));
  };

  return (
    options && (
      <div className={classNames('form-field', className)}>
        <span className="form-field--label">{label}: </span>
        <Radio.Group name={name} onChange={onChange} value={form[name]}>
          {renderContent()}
        </Radio.Group>
      </div>
    )
  );
};

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

RadioGroup.defaultProps = {
  className: '',
};
export default RadioGroup;
