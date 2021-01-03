import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { getTags } from '../../../store/selectors';

function SelectTags({ onChange, defaultTags }) {
  const { Option } = Select;
  const tags = useSelector(getTags);

  return (
    <Select
      onChange={value => {
        onChange({ target: { value, name: 'tags' } });
      }}
      mode="tags"
      style={{ width: '100%' }}
      defaultValue={defaultTags}
      placeholder="Select tags"
    >
      {tags && tags.map(tag => <Option key={tag}>{tag}</Option>)}
    </Select>
  );
}

SelectTags.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SelectTags;
