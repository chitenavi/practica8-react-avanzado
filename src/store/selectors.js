export const getAuthUser = state => state.auth;

export const getIsLoggedUser = state => state.auth.isLogged;

export const getUi = state => state.ui;

export const getTags = state => {
  if (!state.adverts.tags) return null;

  return state.adverts.tags;
};

export const getAdverts = state => {
  const { ads } = state.adverts;

  if (!ads) {
    return null;
  }

  return ads;
};

export const getAdvertById = advertId => state => {
  return state.adverts.ads.find(adv => adv._id === advertId);
};

export const getLocation = state => state.router.location;
