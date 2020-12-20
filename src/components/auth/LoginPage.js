import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import MainLayout from '../layout/MainLayout';
import ModalLoader from '../shared/ModalLoader';
import Button from '../shared/Button';
import { login } from '../../api/auth';
import useForm from '../../hooks/useForm';

import './LoginPage.scss';

function LoginPage({ onLogin, history }) {
  const [form, onChange] = useForm({
    email: '',
    password: '',
    remcredentials: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { email, password, remcredentials } = form;

  const canSubmit = () => {
    return !submitting && email && password;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const { token } = await login(form);
      setSubmitting(false);
      onLogin(token).then(() => history.push('/adverts'));
    } catch (err) {
      setSubmitting(false);
      setError(err);
    }
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
                onChange={ev => {
                  onChange({
                    target: { name: ev.target.name, value: ev.target.checked },
                  });
                }}
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
        {submitting && <ModalLoader />}
        {error && (
          <div className="loginPage-error">
            <Alert message={error.message} type="error" />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LoginPage;
