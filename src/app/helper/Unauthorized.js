export const unAuthorized = (response = 200) => {
  if (response.status === 401) {
    window.location.href = "/login";
    localStorage.clear();
  }
};
