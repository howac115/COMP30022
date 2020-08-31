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

const logout =() => {
    localStorage.removeItem(UserToken);
}

/* const logout = () =>{
*   global.auth.logout();
*   props.close('logout');
*   props.history.push('/');
*}
*
*/
global.auth = {setUserToken, getUser, logout};