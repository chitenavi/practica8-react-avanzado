export const getAuthUser = state => state.auth;

export const getIsLoggedUser = state => state.auth.isLogged;

export const getUi = state => state.ui;

export const getTags = state => {
  const { tags } = state.adverts;

  if (!tags) return null;

  return tags;
};

export const getAdverts = state => {
  const { ads } = state.adverts;

  if (!ads) {
    return null;
  }

  return ads;
};

export const getAdvertById = advertId => state => {
  const { ads } = state.adverts;

  if (ads) {
    return state.adverts.ads.find(adv => adv._id === advertId);
  }
  return null;
};

export const getAdvertDetail = state => state.adverts.adDetail;

export const getLocation = state => state.router.location;
