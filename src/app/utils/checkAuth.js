export const checkAuth = (res) => {
    if (res.authorized === false) {
        window.location.href = "/login";
        localStorage.clear();
    }
};
