import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormContext } from './FormContext';
import FileImageLoad from '../FileImageLoad';

const SelectCustom = ({ name, className }) => {
  const { form } = useFormContext();

  return (
    <div className={classNames('form-field', className)}>
      <FileImageLoad
        label="Select a single image file"
        onFileSelect={file => {
          form[name] = file;
        }}
      />
    </div>
  );
};

SelectCustom.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SelectCustom.defaultProps = {
  className: '',
};
export default SelectCustom;
