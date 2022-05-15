//isAuthenticated
export const isAuthenticated = (state) => {
  if (state.auth.auth.accessToken) return true;
  return false;
};

export const isAuth = (user) => {
  if (user) return true;
  return false;
};
