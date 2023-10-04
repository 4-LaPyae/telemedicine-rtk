export const setLocalStorage = (data) => {
  return new Promise((resolve) => {
    localStorage.setItem("user", JSON.stringify(data));
    resolve(data);
  });
};

export const getLocalStorage = (key) => {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem(key)));
  });
};

export const clearLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
