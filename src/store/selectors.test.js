import { getAdvertById, getTags } from './selectors';

describe('getAdvertById', () => {
  const state = {
    adverts: {
      ads: [
        { _id: '3', data: 'data3' },
        { _id: '1', data: 'data1' },
      ],
    },
  };
  it('should return undefined if advert id not exist', () => {
    const id = '23';

    expect(getAdvertById(id)(state)).toBeUndefined();
  });

  it('should return an advert by id', () => {
    const expectedAdv = {
      _id: '1',
      data: 'data1',
    };
    const id = '1';

    expect(getAdvertById(id)(state)).toEqual(expectedAdv);
  });
});

describe('getTags', () => {
  const state = {
    adverts: {
      tags: ['work', 'mobile', 'lifestyle', 'motor'],
    },
  };

  it('should return array of tags', () => {
    const expectedTags = ['work', 'mobile', 'lifestyle', 'motor'];
    expect(getTags(state)).not.toHaveLength(0);
    expect(getTags(state)).toHaveLength(4);
    expect(getTags(state)).toEqual(expectedTags);
  });

  it('should return null if there are not tags', () => {
    state.adverts = {};
    expect(getTags(state)).toEqual(null);
  });
});
