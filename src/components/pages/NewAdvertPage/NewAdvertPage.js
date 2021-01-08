import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { Form, InputCustom } from '../../shared/Form';
import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';

import './NewAdvertPage.scss';

const NewAdvertPage = ({ onCreate, error, loading }) => {
  const formNewAd = {
    name: '',
    sale: true,
    tags: [],
    price: 0,
    file: null,
    validateFields: ['name', 'tags', 'price'],
  };

  const onSubmitForm = data => {
    const formData = new FormData();
    // Object.keys(form).forEach(key => {
    //   if (key === 'tags') tags.forEach(val => formData.append(key, val));
    //   else formData.append(key, form[key]);
    // });

    if (data.file) formData.append('photo', data.file);

    // onCreate(formData);
  };

  return (
    <MainLayout title="New Advert">
      <div className="newAdPage">
        <Form
          method="POST"
          encType="multipart/form-data"
          onSubmit={onSubmitForm}
          initialValue={formNewAd}
          submitLabel="Create Advert"
        >
          <InputCustom type="text" name="name" placeholder="Advert name" />
          <InputCustom type="numberPrice" name="price" />
          <InputCustom type="radioTwo" name="sale" />
          <InputCustom type="selectTags" name="tags" />
          <InputCustom type="fileImage" name="file" />
        </Form>
        {loading && <ModalLoader />}
        {error && (
          <div className="newAdPage-error">
            <Alert message={error.message} type="error" />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

NewAdvertPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  onCreate: PropTypes.func.isRequired,
};

NewAdvertPage.defaultProps = {
  error: null,
};

export default NewAdvertPage;
