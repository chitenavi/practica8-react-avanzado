import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';
import Button from '../../shared/Button';
import ModalConfirm from '../../shared/ModalConfirm';
import ErrorMessage from '../../errors/ErrorMessage';
import { getAdvertById } from '../../../store/selectors';
import { advertsConfig } from '../../../config';

import './AdvertDetailPage.scss';

function AdvertDetailPage({ onDelete, error, loading }) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const advert = useSelector(getAdvertById(id));

  const renderContent = () => {
    if (error) {
      return (
        <div className="adDelete">
          <ErrorMessage className="adDelete-error" message={error.message} />
        </div>
      );
    }

    if (!advert) return null;

    return (
      <div className="product">
        <h2 className="product-title">{advert.name}</h2>
        <div className="product-container">
          <div className="product-container-img">
            <img
              src={
                advert.photo
                  ? `${advertsConfig.apiUrl}${advert.photo}`
                  : 'http://via.placeholder.com/600x400?text=No+Image'
              }
              alt={advert.name}
            />
          </div>

          <div className="product-container-detail">
            <p>
              <span>Type: </span>
              {advert.sale ? 'Sale' : 'Buy'}
            </p>
            <p>
              <span>Price: </span>
              {advert.price} €
            </p>
            <p>
              <span>Tags: </span>
              {advert.tags.join(', ')}
            </p>
          </div>
        </div>
        <Button
          className="secondary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

  return (
    <MainLayout title="Advert Detail">
      {loading ? <ModalLoader /> : renderContent()}
      <ModalConfirm
        title="Delete Advert"
        onClose={isConfirmed => {
          if (isConfirmed) onDelete(id);

          setShowModal(false);
        }}
        show={showModal}
      >
        Are you sure to delete it?
      </ModalConfirm>
    </MainLayout>
  );
}

AdvertDetailPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  onDelete: PropTypes.func.isRequired,
};

AdvertDetailPage.defaultProps = {
  error: null,
};

export default AdvertDetailPage;
