import React from "react";

//React.fragement 可用于两个并列的component 
/**
 * 1.命名和绑定
 * events
 * this
 * 传递参数
 */


class Login extends React.Component{

    /*合成事件对象*/
    handleLogin = event =>{
        event.preventDefault(); //阻止默认行为
        //处理登录逻辑
        if (!this.state.email){
            alert("Please enter Email")
        }
        else if (!this.state.password){
            alert("Please enter Password")
        }
        //跳转首页
        else this.props.history.push('/');
    };
    
    state = {
        email:'',
        password:''
    };

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };

    render(){
        return (
            <div className="login">
                <form className="box login_box" onSubmit={this.handleLogin}>
                    <label className="label"><center><strong><font size="50px">LOGIN</font></strong></center></label>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control ">
                            <input className="input" type="email" 
                                    placeholder="Email" 
                                    value={this.state.email} 
                                    name='email'
                                    onChange={this.handleInput}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" 
                                placeholder="Password" 
                                value={this.state.password} 
                                name='password'
                                onChange={this.handleInput}/>
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-dark">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default Login;