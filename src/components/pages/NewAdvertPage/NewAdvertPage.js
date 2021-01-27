import React from 'react';
import PropTypes from 'prop-types';
import Form, {
  InputCustom,
  SelectCustom,
  InputImage,
  RadioGroup,
} from '../../shared/Form';
import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';
import ErrorMessage from '../../errors/ErrorMessage';
import { formNewAd } from '../../../config';

import './NewAdvertPage.scss';

const NewAdvertPage = ({ onCreate, error, loading }) => {
  const onSubmitForm = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key !== 'file' && key !== 'validateFields') {
        if (key === 'tags') data[key].forEach(val => formData.append(key, val));
        else formData.append(key, data[key]);
      }
    });

    if (data.file) formData.append('image', data.file);

    onCreate(formData);
  };

  return (
    <MainLayout title="New Advert">
      <div className="newAdPage">
        {loading && <ModalLoader />}
        <Form
          method="POST"
          encType="multipart/form-data"
          onSubmit={onSubmitForm}
          initialValue={formNewAd}
          submitLabel="Create Ad"
        >
          <InputCustom type="text" name="name" placeholder="Advert name" />
          <div className="form-field--group">
            <InputCustom type="price" name="price" />
            <RadioGroup label="Type" name="sale" options={['sale', 'buy']} />
          </div>
          <SelectCustom placeholder="Select Tags" name="tags" />
          <InputImage name="file" className="centered" />
        </Form>
        {error && (
          <ErrorMessage message={error.message} className="newAdPage-error" />
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
