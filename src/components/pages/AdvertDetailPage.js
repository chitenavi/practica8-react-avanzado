import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ModalLoader from '../shared/ModalLoader';
import Button from '../shared/Button';
import ModalConfirm from '../shared/ModalConfirm';
import ErrorMessage from '../errors/ErrorMessage';
import { getAdvertDetail, deleteAdvert } from '../../api/adverts';
import './AdvertDetailPage.scss';

function AdvertDetailPage() {
  const { id } = useParams();
  const history = useHistory();
  const [advert, setAdvert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingAd, setLoadingAd] = useState(true);
  // const [deletingAd, setDeletingAd] = useState(false);
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
    setLoadingAd(true);
    try {
      await deleteAdvert(id);
      setLoadingAd(false);
      history.push('/adverts');
    } catch (err) {
      setLoadingAd(false);
      setError(err);
    }
  };

  useEffect(() => {
    getAdDetail(id);
  }, []);

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
      {loadingAd ? <ModalLoader /> : renderContent()}
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
    </MainLayout>
  );
}

export default AdvertDetailPage;
