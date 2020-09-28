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

const getUserId = () => {
    return decode(getUserToken());
};

const getUserToken = () => {
    return localStorage.getItem(JWT);
};
//decode here
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
    return !!token;
};

// const isTokenExpried = token => {
//     try {
//         const info = decode(token);
//         if (info.exp < Date.now) {
//             return true;
//         } else return false;
//     } catch (error) {
//         return false;
//     }
// }

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
    getUserId,
};
