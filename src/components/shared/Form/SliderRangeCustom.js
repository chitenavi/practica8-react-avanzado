import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Slider } from 'antd';
import { useFormContext } from './FormContext';

const SliderRangeCustom = ({ name, label, min, max, className }) => {
  const { form, onChange } = useFormContext();

  return (
    <div className={classNames('from-field', className)}>
      <span className="form-field--label">
        {label}: {`${form[name][0]}€ - ${form[name][1]}€`}
      </span>
      <Slider
        onChange={value => {
          onChange({ target: { value, name } });
        }}
        range
        min={min}
        max={max}
        defaultValue={form[name]}
      />
    </div>
  );
};

SliderRangeCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
};

SliderRangeCustom.defaultProps = {
  min: 1,
  max: 10000,
  className: '',
};

export default SliderRangeCustom;
