import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, Input, InputNumber, Alert } from 'antd';
import useForm from '../../../hooks/useForm';
import MainLayout from '../../layout/MainLayout';
import SelectTags from '../../shared/SelectTags';
import Button from '../../shared/Button';
import ModalLoader from '../../shared/ModalLoader';
import FileImageLoad from '../../shared/FileImageLoad';
import './NewAdvertPage.scss';

const NewAdvertPage = ({ onCreate, error, loading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, onChange] = useForm({
    name: '',
    sale: true,
    tags: [],
    price: 0,
  });
  const { name, sale, tags, price } = form;

  const canSubmit = () => {
    return name && tags.length && price;
  };

  const onSubmitForm = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (key === 'tags') tags.forEach(val => formData.append(key, val));
      else formData.append(key, form[key]);
    });

    if (selectedFile) formData.append('photo', selectedFile);

    onCreate(formData);
  };

  // TODO: Create image thumbnail in the app when user select one
  return (
    <MainLayout title="New Advert">
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={onSubmitForm}
        className="formNewAd"
      >
        <div className="formNewAd-field">
          <Input
            onChange={onChange}
            name="name"
            value={name}
            placeholder="Advert name"
          />
        </div>
        <div className="formNewAd-group">
          <div className="formNewAd-field">
            <span className="formNewAd-field--label">Price: </span>
            <InputNumber
              name="price"
              onChange={value => {
                onChange({ target: { value, name: 'price' } });
              }}
              min={0}
              max={10000}
              value={price}
            />
          </div>
          <div className="formNewAd-field">
            <span className="formNewAd-field--label">Type: </span>
            <Radio.Group name="sale" onChange={onChange} value={sale}>
              <Radio style={{ color: 'white' }} value>
                Sale
              </Radio>
              <Radio style={{ color: 'white' }} value={false}>
                Buy
              </Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="formNewAd-field centered">
          <SelectTags onChange={onChange} defaultTags={tags} />
        </div>
        <div className="formNewAd-field centered">
          <FileImageLoad
            label="Select a single image file"
            onFileSelect={file => {
              // console.log(URL.createObjectURL(file));
              setSelectedFile(file);
            }}
          />
        </div>

        <div className="formNewAd-field centered">
          <Button type="submit" className="secondary" disabled={!canSubmit()}>
            Create Advert
          </Button>
        </div>
      </form>
      {loading && <ModalLoader />}
      {error && (
        <div className="newAdPage-error">
          <Alert message={error.message} type="error" />
        </div>
      )}
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
