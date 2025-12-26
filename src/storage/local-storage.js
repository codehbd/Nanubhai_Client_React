export const storeToken = (value) => {
  localStorage.setItem(import.meta.env.VITE_TOKEN_NAME, value);
};
export const getToken = () => {
  return localStorage.getItem(import.meta.env.VITE_TOKEN_NAME) || null;
};
export const removeToken = () => {
  return localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
};
