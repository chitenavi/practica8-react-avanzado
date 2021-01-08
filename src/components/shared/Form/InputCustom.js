import React from 'react';
import PropTypes from 'prop-types';
import { Input, Slider, Checkbox, Radio, InputNumber } from 'antd';
import FileImageLoad from '../FileImageLoad';
import { useFormContext } from './FormContext';
import SelectTags from '../SelectTags';

const InputCustom = ({ type, name, placeholder }) => {
  const { form, onChange } = useFormContext();

  const renderContent = () => {
    switch (type) {
      case 'selectTags':
        return <SelectTags onChange={onChange} defaultTags={form[name]} />;
      case 'sliderRange':
        return (
          <div>
            <span className="form-field--label">
              Price: {`${form[name][0]}€ - ${form[name][1]}€`}
            </span>
            <Slider
              onChange={value => {
                onChange({ target: { value, name: 'price' } });
              }}
              range
              min={1}
              max={10000}
              defaultValue={form[name]}
            />
          </div>
        );
      case 'radioGroup':
        return (
          <div>
            <span className="form-field--label">Type: </span>
            <Radio.Group name={name} onChange={onChange} value={form[name]}>
              <Radio style={{ color: 'white' }} value="sale">
                Sale
              </Radio>
              <Radio style={{ color: 'white' }} value="buy">
                Buy
              </Radio>
              <Radio style={{ color: 'white' }} value="all">
                All
              </Radio>
            </Radio.Group>
          </div>
        );
      case 'checkboxCred':
        return (
          <Checkbox
            style={{ color: 'white' }}
            name={name}
            checked={form[name]}
            onChange={onChange}
          >
            Remember Credentials
          </Checkbox>
        );
      case 'radioTwo':
        return (
          <div>
            <span className="form-field--label">Type: </span>
            <Radio.Group name={name} onChange={onChange} value={form[name]}>
              <Radio style={{ color: 'white' }} value>
                Sale
              </Radio>
              <Radio style={{ color: 'white' }} value={false}>
                Buy
              </Radio>
            </Radio.Group>
          </div>
        );
      case 'numberPrice':
        return (
          <div>
            <span className="form-field--label">Price: </span>
            <InputNumber
              name={name}
              onChange={value => {
                onChange({ target: { value, name: 'price' } });
              }}
              min={0}
              max={10000}
              value={form[name]}
            />
          </div>
        );
      case 'fileImage':
        return (
          <FileImageLoad
            label="Select a single image file"
            onFileSelect={file => {
              form[name] = file;
            }}
          />
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

  return <div className="form-field">{renderContent()}</div>;
};

InputCustom.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

InputCustom.defaultProps = {
  placeholder: null,
};

export default InputCustom;
