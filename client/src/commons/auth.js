import decode from 'jwt-decode';

const JWT = "user_token_id";

const setUserToken = token =>{
    localStorage.setItem(JWT, token);
};

const getUserToken = () =>{
    return localStorage.getItem(JWT);
};
//decode here
const getUser = () => {
    const userToken = getUserToken();
    if (isLogin()){
        const user = decode(userToken);
        return user;
    }
    else return null;
};
const isLogin = () => {
    const token = getUserToken();
    return !!token;
};

const logout =() => {
    localStorage.removeItem(JWT);
}

// const logout = () =>{
//     global.auth.logout();   
//     props.close('logout');
//     props.history.push('/');
// }

global.auth = {setUserToken, getUser, logout};