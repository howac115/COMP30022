const UserToken = "user_token_id";

const setUserToken = token =>{
    localStorage.setItem(UserToken, token);
};

const getUserToken = token =>{
    return localStorage.getItem(UserToken);
};
//decode here
const getUser = () => {
    const userToken = getUserToken();
    if (isLogin()){
        const user = {/*decode(userToken)*/};
        return user;
    }
    return null;
};
const isLogin = () =>{
    const token = getUserToken();
    return !!token;
};

global.auth = {setUserToken, getUser};