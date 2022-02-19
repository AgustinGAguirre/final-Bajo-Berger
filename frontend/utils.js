export const getToken = () => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.getItem("token");
    }
};

export const setToken = (token) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.setItem("token", token);
    }
};

export const removeToken = (token) => {
    if (typeof localStorage !== 'undefined') {
        return localStorage.removeItem("token");
    }
};