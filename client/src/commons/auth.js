import decode from 'jwt-decode';

const JWT = 'user_token_id';
const Name = 'user_name';

const setUserToken = token => {
    localStorage.setItem(JWT, token);
};

const setUserName = userName => {
    localStorage.setItem(Name, userName);
};

const getUserName = () => {
    return localStorage.getItem(Name);
};

const getUserToken = () => {
    return localStorage.getItem(JWT);
};

const getUser = () => {
    const userToken = getUserToken();
    if (isLogin()) {
        const user = decode(userToken);
        return user;
    } else {
        return null;
    }
};

const isLogin = () => {
    const token = getUserToken();
    return !!token && !isTokenExpired(token);
};

const isTokenExpired = token => {
    try {
        const info = decode(token);
        const expirationTime = info.exp;
        console.log(Date.now() / 1000);
        console.log(expirationTime);
        if (Date.now() / 1000 >= expirationTime - 60) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
};

const logout = () => {
    localStorage.removeItem(JWT);
    localStorage.removeItem(Name);
};

global.auth = {
    setUserToken,
    getUser,
    logout,
    setUserName,
    getUserName,
};
