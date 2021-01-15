import React from 'react';
import { shallow } from 'enzyme';

import AdvertDetailPage from './AdvertDetailPage';
import ModalLoader from '../../shared/ModalLoader';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'adId1',
  }),
}));

describe('AdvertDetailPage', () => {
  const onDelete = jest.fn();
  const loadDetail = jest.fn();
  const advert = null;
  const loading = true;
  const error = null;

  const mockUseEffect = () => {
    React.useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    React.useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
  });

  const render = () =>
    shallow(
      <AdvertDetailPage
        loading={loading}
        error={error}
        advert={advert}
        loadDetail={loadDetail}
        onDelete={onDelete}
      />,
    );

  const wrapper = render();

  it('should render a loader while loading prop is true', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(<ModalLoader />)).toBe(true);
  });

  it('should render page with error', () => {
    wrapper.setProps({ loading: false, error: { message: 'error' } });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.exists('.adError-error')).toBe(true);
  });

  it('should call loadDetail when there is not advert', () => {
    wrapper.setProps({ error: null });

    expect(loadDetail).toHaveBeenCalled();
  });
  it('should call loadDetail if id param is different to store advert', () => {
    wrapper.setProps({
      advert: {
        _id: 'adId2',
        name: 'ad2',
        price: 25,
        tags: ['work'],
        sale: true,
        photo: 'image',
        photoUrl: 'pathtoimage',
      },
    });

    expect(loadDetail).toHaveBeenCalled();
  });

  it('should not call loadDetail if id param is equal to stora advert', () => {
    wrapper.setProps({
      advert: {
        _id: 'adId1',
        name: 'ad',
        price: 25,
        tags: ['work'],
        sale: true,
        photo: 'image',
        photoUrl: 'pathtoimage',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(loadDetail).not.toHaveBeenCalled();
    expect(wrapper.find('.product-title').text()).toEqual('ad');
  });

  it('should call onDelete if close modal with true', () => {
    const modal = wrapper.find('ModalConfirm');

    modal.simulate('close', true);
    expect(onDelete).toHaveBeenCalled();
  });
});
