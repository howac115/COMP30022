import decode from 'jwt-decode';
import axios from 'axios';

const JWT = "user_token_id";

const setUserToken = token => {
    localStorage.setItem(JWT, token);
};

const getUserToken = () => {
    return localStorage.getItem(JWT);
};
//decode here
const getUser = () => {
    const user = decode(getUserToken());
    return axios
        .get('/user/' + user.id)
        .then(res => { console.log(res.data); return res.data })
};
const isLogin = () => {
    const token = getUserToken();
    return !!token;
};

const isTokenExpried = token => {
    try {
        const info = decode(token);
        if (info.exp < Date.now / 1000) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
}

const logout = () => {
    localStorage.removeItem(JWT);
}

// const logout = () =>{
//     global.auth.logout();   
//     props.close('logout');
//     props.history.push('/');
// }

global.auth = { setUserToken, getUser, logout };