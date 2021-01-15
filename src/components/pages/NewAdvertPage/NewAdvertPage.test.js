import React from 'react';
import { shallow } from 'enzyme';

import NewAdvertPage from './NewAdvertPage';
import ModalLoader from '../../shared/ModalLoader';

describe('NewAdvertPage', () => {
  const onCreate = jest.fn();
  const loading = true;
  const error = null;

  const render = () =>
    shallow(
      <NewAdvertPage onCreate={onCreate} loading={loading} error={error} />,
    );

  const wrapper = render();

  it('should render a loader while loading prop is true', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(<ModalLoader />)).toBe(true);
  });

  it('should render page with error', () => {
    wrapper.setProps({ loading: false, error: { message: 'error' } });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.exists('.newAdPage-error')).toBe(true);
  });

  it('snapshot with error', () => {
    expect(wrapper.exists('.newAdPage-error')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render new advert page', () => {
    wrapper.setProps({ error: null });
    expect(wrapper.exists()).toBe(true);
  });

  it('should call onCreate when submit form', () => {
    const data = {};

    const form = wrapper.find('Form');
    form.simulate('submit', data);

    expect(wrapper.exists()).toBe(true);
    expect(onCreate).toHaveBeenCalled();
  });

  it('snapshot before advert creation', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
