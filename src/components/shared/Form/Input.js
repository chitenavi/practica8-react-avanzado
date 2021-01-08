import React from 'react';
import PropTypes from 'prop-types';
import { Input, Slider } from 'antd';
import { useFormContext } from './FormContext';
import SelectTags from '../SelectTags';

const InputCustom = ({ type, name }) => {
  const { form, onChange } = useFormContext();

  const renderContent = () => {
    switch (type) {
      case 'select':
        return <SelectTags onChange={onChange} defaultTags={form[name]} />;
      case 'slider':
        return (
          <Slider
            onChange={value => {
              onChange({ target: { value, name: 'price' } });
            }}
            range
            min={1}
            max={10000}
            defaultValue={form[name]}
          />
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            value={form[name]}
            onChange={onChange}
          />
        );
    }
  };

  return <div className="formField">{renderContent()}</div>;
};

InputCustom.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputCustom;
