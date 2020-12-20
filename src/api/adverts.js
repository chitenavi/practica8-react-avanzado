import client from './client';

const adverstUrl = 'apiv1/adverts';
const { REACT_APP_API_URL: apiUrl } = process.env;

export const getAdverts = (queryString = '') => {
  const url = `${adverstUrl}?${queryString}`;
  return client.get(url);
};

export const getAdvertDetail = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.get(url).then(response => {
    response.photoUrl = `${apiUrl}${response.photo}`;
    // console.log(response);
    return response;
  });
};

export const getAllTags = () => {
  const url = `${adverstUrl}/tags`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.delete(url);
};

export const createAdvert = data => {
  const url = `${adverstUrl}`;
  const headers = { 'Content-Type': 'multipart/form-data' };
  return client.post(url, data, headers);
};
