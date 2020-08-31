const UserToken = "user_token_id";

<<<<<<< HEAD
const setUserToken = token =>{
    localStorage.setItem(UserToken, token);
};

const getUserToken = token =>{
=======
const setUserToken = token => {
    localStorage.setItem(UserToken, token);
};

const getUserToken = token => {
>>>>>>> master
    return localStorage.getItem(UserToken);
};
//decode here
const getUser = () => {
    const userToken = getUserToken();
<<<<<<< HEAD
    if (isLogin()){
        const user = {/*decode(userToken)*/};
=======
    if (isLogin()) {
        const user = {/*decode(userToken)*/ };
>>>>>>> master
        return user;
    }
    return null;
};
<<<<<<< HEAD
const isLogin = () =>{
=======
const isLogin = () => {
>>>>>>> master
    const token = getUserToken();
    return !!token;
};

<<<<<<< HEAD
const logout =() => {
=======
const logout = () => {
>>>>>>> master
    localStorage.removeItem(UserToken);
}

/* const logout = () =>{
*   global.auth.logout();
*   props.close('logout');
*   props.history.push('/');
*}
*
*/
<<<<<<< HEAD
global.auth = {setUserToken, getUser, logout};
=======
global.auth = { setUserToken, getUser, logout };
>>>>>>> master
