import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';
import ErrorMessage from '../../errors/ErrorMessage';

import { Form, InputCustom } from '../../shared/Form';

import './LoginPage.scss';

function LoginPage({ onLogin, loading, error }) {
  const formLogin = {
    email: '',
    password: '',
    remcredentials: false,
    validateFields: ['email', 'password'],
  };

  const handleSubmit = data => {
    onLogin(data);
  };

  return (
    <MainLayout title="Welcome to Nodepop SPA">
      <div className="loginPage">
        <Form
          initialValue={formLogin}
          onSubmit={handleSubmit}
          submitLabel="Log In"
        >
          <InputCustom type="email" name="email" placeholder="Your email" />
          <InputCustom
            type="password"
            name="password"
            placeholder="Your password"
          />
          <InputCustom type="checkboxCred" name="remcredentials" />
        </Form>
        {loading && <ModalLoader />}
        {error && (
          <ErrorMessage className="loginPage-error" message={error.message} />
        )}
      </div>
    </MainLayout>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
};

LoginPage.defaultProps = {
  error: null,
};

export default LoginPage;
