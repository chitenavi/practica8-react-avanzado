import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import ModalLoader from '../../shared/ModalLoader';
import Button from '../../shared/Button';
import ModalConfirm from '../../shared/ModalConfirm';
import ErrorMessage from '../../errors/ErrorMessage';

import './AdvertDetailPage.scss';

function AdvertDetailPage({ loadDetail, advert, onDelete, error, loading }) {
  const { id } = useParams();
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (!advert) {
      loadDetail(id);
    } else if (advert._id !== id) loadDetail(id);

    return () => {
      // eslint-disable-next-line no-console
      console.log('cleanup');
    };
  }, []);

  const renderContent = () => {
    if (error) {
      return (
        <div className="adError">
          <ErrorMessage className="adError-error" message={error.message} />
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
                advert.image
                  ? `${advert.photoUrl}`
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
            <p>
              <span>Description: </span>
              {advert.description}
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
  advert: PropTypes.objectOf(PropTypes.any),
  loadDetail: PropTypes.func.isRequired,
};

AdvertDetailPage.defaultProps = {
  error: null,
  advert: null,
};

export default AdvertDetailPage;
