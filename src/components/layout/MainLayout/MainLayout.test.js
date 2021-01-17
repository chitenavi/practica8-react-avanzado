import React from 'react';
import { shallow } from 'enzyme';

import MainLayout from './MainLayout';

describe('MainLayout', () => {
  const title = 'title';
  const children = 'node';

  const render = () =>
    shallow(<MainLayout title={title}>{children}</MainLayout>);

  it('should render a title', () => {
    const wrapper = render();

    expect(wrapper.exists('.layout-main--title')).toBe(true);

    expect(wrapper.find('.layout-main--title').text()).toEqual('title');
  });
});
