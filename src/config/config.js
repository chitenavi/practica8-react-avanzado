import { setupTokenClient } from '../api/client';
import { getAllTags, getAdverts } from '../api/adverts';
import storage from '../utils/storage';

export const getPreloadedState = async () => {
  const initialUserAuthToken = storage.get('userAuthToken') || null;

  if (initialUserAuthToken) {
    try {
      setupTokenClient(initialUserAuthToken);
      const tags = await getAllTags();
      const { rows: ads } = await getAdverts();
      return { auth: { isLogged: true }, adverts: { tags, ads } };
    } catch (error) {
      return { ui: { error } };
    }
  }
  return {};
};

export const advertsConfig = {
  apiUrl: process.env.REACT_APP_API_URL,
  defaultFilter: {
    name: '',
    type: 'all',
    price: [1, 10000],
    tags: [],
  },
};
