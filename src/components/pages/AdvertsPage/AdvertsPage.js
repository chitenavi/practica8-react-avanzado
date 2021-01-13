import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import storage from '../../../utils/storage';
import MainLayout from '../../layout/MainLayout';
import Form, {
  InputCustom,
  SliderRangeCustom,
  RadioGroup,
  SelectCustom,
} from '../../shared/Form';
import AdvertCard from '../../adverts/AdvertCard';
import ErrorMessage from '../../errors/ErrorMessage';
import Spinner from '../../shared/Spinner';
import Button from '../../shared/Button';
import { advertsConfig } from '../../../config';

import './AdvertsPage.scss';

const AdvertsPage = ({ adverts, loading, error, loadAdverts }) => {
  const [resetFilter, setResetFilter] = useState(Date.now());
  const [filter, setFilter] = useState(
    storage.get('userFilterForm') || advertsConfig.defaultFilter,
  );

  // TODO: Refact function to compare 2 forms in separate file
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
      loadAdverts(form);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <ErrorMessage
          message={error.message}
          className="advertsPage-content--error"
        />
      );
    }

    if (adverts.length === 0) {
      return (
        <div className="advertsPage-content--noads">
          {filter === advertsConfig.defaultFilter ? (
            <div>
              <h3>There are no ads!, create one...</h3>
              <Link to="/adverts/new">
                <Button className="primary">New Advert</Button>
              </Link>
            </div>
          ) : (
            <div>
              <h3>Sorry, there are no ads with that filter...</h3>
              <Button
                onClick={() => {
                  setResetFilter(Date.now());
                  storage.remove('userFilterForm');
                  setFilter(advertsConfig.defaultFilter);
                  loadAdverts();
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
          <Form
            key={resetFilter}
            initialValue={filter}
            onSubmit={handleSubmit}
            submitLabel="Apply Filter"
          >
            <InputCustom type="text" name="name" placeholder="Advert name" />
            <RadioGroup
              label="Type"
              name="type"
              options={['sale', 'buy', 'all']}
              className="centered"
            />
            <SliderRangeCustom label="Price range" name="price" />
            <SelectCustom name="tags" placeholder="Select tags" />
          </Form>
        </div>
        <div className="advertsPage-content">
          {loading ? <Spinner /> : renderContent()}
        </div>
      </div>
    </MainLayout>
  );
};

AdvertsPage.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any),
  loadAdverts: PropTypes.func.isRequired,
};

AdvertsPage.defaultProps = {
  error: null,
};

export default AdvertsPage;
