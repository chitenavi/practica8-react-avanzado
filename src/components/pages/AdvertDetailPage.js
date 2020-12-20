import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Alert } from 'antd';
import MainLayout from '../layout/MainLayout';
import Loader from '../shared/Spinner';
import ModalLoader from '../shared/ModalLoader';
import Button from '../shared/Button';
import ModalConfirm from '../shared/ModalConfirm';
import { getAdvertDetail, deleteAdvert } from '../../api/adverts';
import './AdvertDetailPage.scss';

function AdvertDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [advert, setAdvert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingAd, setLoadingAd] = useState(true);
  const [deletingAd, setDeletingAd] = useState(false);
  const [error, setError] = useState(null);

  const getAdDetail = async adId => {
    setLoadingAd(true);
    try {
      const ad = await getAdvertDetail(adId);
      setLoadingAd(false);
      if (!ad) history.push('/404');
      else setAdvert(ad);
    } catch (err) {
      setLoadingAd(false);
      history.push('/404');
    }
  };

  const deleteAd = async () => {
    setDeletingAd(true);
    try {
      await deleteAdvert(id);
      setDeletingAd(false);
      history.push('/adverts');
    } catch (err) {
      setDeletingAd(false);
      setError(err);
    }
  };

  useEffect(() => {
    getAdDetail(id);
  }, []);

  const renderContent = () => {
    return (
      <div className="product">
        <h2 className="product-title">{advert.name}</h2>
        <div className="product-container">
          <div className="product-container-img">
            <img
              src={
                advert.photo
                  ? `${advert.photoUrl}`
                  : 'https://via.placeholder.com/600x400?text=No+Image'
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
      {loadingAd ? <Loader size="medium" /> : advert && renderContent()}
      <ModalConfirm
        title="Delete Advert"
        onClose={isConfirmed => {
          if (isConfirmed) deleteAd();

          setShowModal(false);
        }}
        show={showModal}
      >
        Are you sure to delete it?
      </ModalConfirm>
      <div className="adDelete">
        {deletingAd ? (
          <ModalLoader />
        ) : (
          error && (
            <Alert
              className="adDelete-error"
              message={error.message}
              type="error"
            />
          )
        )}
      </div>
    </MainLayout>
  );
}

export default AdvertDetailPage;
