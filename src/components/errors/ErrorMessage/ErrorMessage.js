import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Alert } from 'antd';

const ErrorMessage = ({ message, className }) => {
  return (
    <div className={classNames(className)}>
      <Alert message={message} type="error" />
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default ErrorMessage;
