import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const popanimation = keyframes`
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    25% {
      transform: translateY(100px);
      opacity: 1;
    }
    50% {
      transform: translateY(100px);
      opacity: 1;
    }
    75% {
      transform: translateY(100px);
      opacity: 1;
    }
    100% {
      transform:translateY(0);
      opacity: 0;
    }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: -100px;
  left: 0;
  right: 0;
  opacity: 0;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${popanimation} 2s ease-in-out;
  z-index: 9998;
`;

const FlashMessage = ({ notification }) => {
  if (!notification.type) return null;

  const { type, message } = notification;
  return (
    <AlertContainer>
      <Alert
        style={{ zIndex: 9999 }}
        message={type.toUpperCase()}
        description={message}
        type={type}
        showIcon
      />
    </AlertContainer>
  );
};

FlashMessage.defaultProps = {
  notification: {
    type: '',
    message: '',
  },
};

FlashMessage.propTypes = {
  notification: PropTypes.objectOf(PropTypes.string),
};

export default FlashMessage;
