import jwt from 'jwt-decode';

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

export const checkIfIsLoggedIn = () => {
    const token = getToken();

    if (!token) {
        return false;
    }

    const decodedToken = jwt(token, { complete: true });
    var dateNow = new Date();
    if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        return false;
    }
    return true
}

export const getLoggedInUserId = () => {
    const token = getToken();

    if (!token) {
        return "";
    }

    return jwt(token, { complete: true }).sub;
}