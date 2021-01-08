import React from 'react';

import MainLayout from '../../layout/MainLayout';
import { Form, InputCustom } from '../../shared/Form';

function LoginPageRefact() {
  const formLogin = {
    email: '',
    password: '',
    tags: [],
    price: [1, 10000],
  };

  // const canSubmit = () => {
  //   return !loading && email && password;
  // };

  const handleSubmit = data => {
    // const credentials = form;
    // ev.preventDefault();
    console.log(data);
    // console.log(formLogin);
  };

  return (
    <MainLayout title="Welcome to Nodepop SPA">
      <div>
        <Form
          initialValue={formLogin}
          onSubmit={handleSubmit}
          submitLabel="Log In"
        >
          <InputCustom type="text" name="email" />
          <InputCustom type="password" name="password" />
          <InputCustom type="select" name="tags" />
          <InputCustom type="slider" name="price" />
        </Form>
      </div>
    </MainLayout>
  );
}

export default LoginPageRefact;
