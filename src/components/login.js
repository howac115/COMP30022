import React from "react";

//React.fragement 可用于两个并列的component 

class Login extends React.Component{
    render(){
        return (
            <div className="login">
                <form className="box login_box">
                    <label class="label">Login</label>
                    <div class="field">
                        <p class="control ">
                            <input class="input" type="email" placeholder="Email"/>
                            <span class="icon is-small is-left"></span>
                            <span class="icon is-small is-right"></span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" type="password" placeholder="Password"/>
                            <span class="icon is-small is-left"> </span>
                        </p>
                    </div>
                    <div class="control">
                        <button class="button is-dark">LOGIN</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Login;