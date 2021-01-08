import React from 'react';
import PropTypes from 'prop-types';

import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';
import ErrorMessage from '../../errors/ErrorMessage';
import Button from '../../shared/Button/Button';
import useForm from '../../../hooks/useForm';

import './LoginPage.scss';

function LoginPage({ onLogin, loading, error }) {
  const [form, onChange] = useForm({
    email: '',
    password: '',
    remcredentials: false,
  });

  const { email, password, remcredentials } = form;

  const canSubmit = () => {
    return !loading && email && password;
  };

  const handleSubmit = ev => {
    const credentials = form;
    ev.preventDefault();
    onLogin(credentials);
  };

  return (
    <MainLayout title="Welcome to Nodepop SPA">
      <div className="loginPage">
        <form onSubmit={handleSubmit} className="formLogin">
          <div className="formLogin-field">
            <input
              type="text"
              onChange={onChange}
              name="email"
              value={email}
              placeholder="email"
            />
          </div>
          <div className="formLogin-field">
            <input
              type="password"
              onChange={onChange}
              value={password}
              name="password"
              placeholder="password"
            />
          </div>

          <div className="formLogin-field">
            <label htmlFor="remember">
              <input
                type="checkbox"
                id="remember"
                name="remcredentials"
                onChange={onChange}
                checked={remcredentials}
              />
              Remember credentials
            </label>
          </div>
          <div className="formLogin-field">
            <Button type="submit" className="secondary" disabled={!canSubmit()}>
              Log in
            </Button>
          </div>
        </form>
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
