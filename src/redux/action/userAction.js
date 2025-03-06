export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const USER_LOGOUT_SUCCESS = "LOGOUT";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

export const doLogin = (data) => {
  return { type: FETCH_USER_LOGIN_SUCCESS, payload: data };
};

export const doLogout = () => {
  return { type: USER_LOGOUT_SUCCESS };
};

export const updateUserProfile = (profileData) => {
  return { type: UPDATE_USER_PROFILE, payload: profileData };
};
