import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useFormContext } from './FormContext';
import SelectTags from '../SelectTags';

const SelectCustom = ({ name, placeholder, className }) => {
  const { form, onChange } = useFormContext();

  return (
    <div className={classNames('form-field', className)}>
      <SelectTags
        onChange={onChange}
        defaultTags={form[name]}
        placeholder={placeholder}
      />
    </div>
  );
};

SelectCustom.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SelectCustom.defaultProps = {
  placeholder: '',
  className: '',
};

export default SelectCustom;
