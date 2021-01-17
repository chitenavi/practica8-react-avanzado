import React from 'react';
import { shallow } from 'enzyme';

import ModalConfirm from './ModalConfirm';

describe('ModalConfirm', () => {
  const children = 'something';
  const show = false;
  const title = 'Modal';
  const onClose = jest.fn();

  const render = () =>
    shallow(
      <ModalConfirm show={show} title={title} onClose={onClose}>
        {children}
      </ModalConfirm>,
    );

  const wrapper = render();

  it('should not render component if show prop is false', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('should render component when show prop is true', () => {
    wrapper.setProps({ show: true });
    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find('.modalConfirm-dialog--title').text()).toEqual(title);
    expect(wrapper.find('.modalConfirm-dialog--content').text()).toEqual(
      children,
    );
  });

  it('should call onClose function', () => {
    const button = wrapper.find('.secondary');

    button.simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
