import client from './client';

// TODO: Make changes to connect new API

const adverstUrl = 'api/v1/adverts';
const { REACT_APP_API_URL: apiUrl } = process.env;

export const getAdverts = form => {
  const searchParams = new URLSearchParams();
  if (form) {
    if (form.name) searchParams.append('name', form.name);
    if (form.price[0] !== 1 || form.price[1] !== 10000)
      searchParams.append('price', `${form.price[0]}-${form.price[1]}`);
    if (form.type !== 'all') searchParams.append('sale', form.type === 'sale');
    if (form.tags.length) searchParams.append('tags', form.tags.join(','));
    searchParams.append('fields', 'name,price,tags,sale');
  }
  const url = `${adverstUrl}?${searchParams.toString()}`;
  return client.get(url);
};

export const getAdvertDetail = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.get(url).then(response => {
    response.advert.photoUrl = `${apiUrl}${response.advert.image}`;
    return response;
  });
};

export const getAllTags = () => {
  const url = `${adverstUrl}/tags`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  const headers = { 'Content-Type': 'application/json' };
  return client.delete(url, headers);
};

export const createAdvert = data => {
  const url = `${adverstUrl}`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  return client.post(url, data, headers);
};
