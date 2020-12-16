import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import Button from './Button';
import './FileImageLoad.scss';

const FileImageLoad = ({ onFileSelect, label }) => {
  const [file, setFile] = useState('');
  const inputRef = createRef(null);

  const handleFileInput = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileSelect(e.target.files[0]);
    }
  };

  const handleClick = () => {
    const { current: fileInput } = inputRef;
    fileInput.click();
  };

  return (
    <div className="fileLoad">
      <div className="fileLoad-file">
        <Button onClick={handleClick} className="primary customLabel">
          {label}
        </Button>
        <input
          ref={inputRef}
          type="file"
          id="file"
          onChange={handleFileInput}
          hidden
        />
      </div>
      <div className="fileLoad-filename">
        {file && `Filename: ${file.name}`}
      </div>
      <div className="fileLoad-image">
        <Image
          width={200}
          height={200}
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://via.placeholder.com/200x200?text=No+Image'
          }
        />
      </div>
    </div>
  );
};

FileImageLoad.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default FileImageLoad;
