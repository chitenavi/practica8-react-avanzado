import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../../../utils/storage';

import MainLayout from '../../layout/MainLayout';
import FilterForm from '../../shared/FilterForm';
import AdvertCard from '../../adverts/AdvertCard';
import ErrorMessage from '../../errors/ErrorMessage';
import Spinner from '../../shared/Spinner';
import Button from '../../shared/Button';
import { loadAdverts } from '../../../store/actions';
import { getAdverts } from '../../../store/selectors';
import { advertsConfig } from '../../../config';

import './AdvertsPage.scss';

const AdvertsPage = ({ loading, error }) => {
  const [resetFilter, setResetFilter] = useState(Date.now());
  const [filter, setFilter] = useState(
    storage.get('userFilterForm') || advertsConfig.defaultFilter,
  );

  const adverts = useSelector(getAdverts);

  const dispatch = useDispatch();

  const handleSubmit = form => {
    if (JSON.stringify(form) !== JSON.stringify(filter)) {
      if (
        JSON.stringify(form) !== JSON.stringify(advertsConfig.defaultFilter)
      ) {
        storage.set('userFilterForm', form);
      } else {
        storage.remove('userFilterForm');
      }
      setFilter(form);
    }
  };

  useEffect(() => {
    dispatch(loadAdverts(filter));
    return () => {};
  }, [filter]);

  const renderContent = () => {
    if (error) {
      return (
        <ErrorMessage
          message={error.message}
          className="advertsPage-content--error"
        />
      );
    }

    // if (!adverts) return null;

    if (adverts.length === 0) {
      return (
        <div className="advertsPage-content--noads">
          {filter === advertsConfig.defaultFilter ? (
            <>
              <h3>There are no ads!, create one...</h3>
              <Link to="/adverts/new">
                <Button className="primary">New Advert</Button>
              </Link>
            </>
          ) : (
            <div>
              <h3>Sorry, there are no ads with that filter...</h3>
              <Button
                onClick={() => {
                  setResetFilter(Date.now());
                  storage.remove('userFilterForm');
                  setFilter(advertsConfig.defaultFilter);
                }}
                className="primary"
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      );
    }

    return adverts.map(ad => {
      return (
        <AdvertCard
          key={ad._id}
          id={ad._id}
          name={ad.name}
          price={ad.price}
          sale={ad.sale}
          tags={ad.tags}
        />
      );
    });
  };

  return (
    <MainLayout title="Adverts">
      <div className="advertsPage">
        <div className="advertsPage-filter">
          <FilterForm
            key={resetFilter}
            userFilter={filter}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="advertsPage-content">
          {loading ? <Spinner /> : renderContent()}
        </div>
      </div>
    </MainLayout>
  );
};

AdvertsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
};

AdvertsPage.defaultProps = {
  error: null,
};

export default AdvertsPage;
