const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const removeUser = () => {
  // console.log("getUser 1", getUser())
  localStorage.removeItem(USER_KEY);
  // console.log("getUser 2", getUser())

};

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
