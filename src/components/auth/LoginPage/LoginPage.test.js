import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  const onLogin = jest.fn();
  const loading = false;
  const error = null;

  const render = () =>
    shallow(<LoginPage onLogin={onLogin} loading={loading} error={error} />);
  it('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
  it('snapshot with error', () => {
    const wrapper = render();
    wrapper.setProps({ error: { message: 'Error' } });
    expect(wrapper.exists('.loginPage-error')).toBe(true);

    expect(wrapper).toMatchSnapshot();
  });

  it('should call a onLogin', () => {
    const data = {};
    const wrapper = render();

    const form = wrapper.find('Form');
    form.simulate('submit', data);

    expect(wrapper.exists()).toBe(true);
    expect(onLogin).toHaveBeenCalled();
  });
});
