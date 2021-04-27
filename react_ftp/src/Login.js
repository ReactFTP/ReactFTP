import React from 'react';
import './css/Login.css';

import * as axios from './axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : "",
            pw : "",
            message : "",
            modalOpen: false,
        };
    }

    componentWillMount(){
        if(window.sessionStorage.getItem("sessionId")){
            axios.logout(window.sessionStorage.getItem('appXsession'));
            window.sessionStorage.clear();
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onKeyPress = (e) => {
        if(e.key == 'Enter'){
            this.loginCheck();
        }
    }

    loginCheck = () => {
        if(this.state.id == ""){
            alert("아이디를 입력해주세요.");
            return;
        }
        if(this.state.pw== ""){
            alert("패스워드를 입력해주세요.");
            return;
        }
        this.openModal();
        this.fetchUserInfo(this.state.id, this.state.pw);
    }

    fetchUserInfo = async(id, pw) => {
        const info = await Promise.all([
            axios.getUserInfo(id, pw)
        ]);
        this.setState({
            message : info[0].message,
        }, () => {
            window.sessionStorage.setItem('homeUid', info[0].uid);
            window.sessionStorage.setItem('appXsession', info[0].appXsession);
            this.openLink();
        });
    }

    openLink() {
        if (this.state.message == "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다."){
            this.closeModal();
            return;
        }
        window.sessionStorage.setItem('sessionId', this.state.id);
        this.props.history.push('/Home');
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }
    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    render () {
        return (
            <div className="Login" onKeyPress={ this.onKeyPress }>
                <div className="main-container">
                    <div className="main-wrap">
                        <header>
                            <div className="logo-wrap">
                                <img src={process.env.PUBLIC_URL + '/logo.png'} onClick={()=>{ this.props.history.push('/') }}/>
                            </div>
                        </header>
                        <section className="login-input-section-wrap">
                            <div className="login-input-wrap">
                                <input name="id" placeholder="아이디" type="text" onChange={ this.onChange } onKeyPress={ this.onKeyPress } ></input>
                            </div>
                            <div className="login-input-wrap password-wrap">
                                <input name="pw" placeholder="비밀번호" type="password" onChange={ this.onChange } onKeyPress={ this.onKeyPress } ></input>
                            </div>
                            <div id="login-error-message">
                                {this.state.message}
                            </div>
                            <div className="login-button-wrap">
                                <button onClick={ this.loginCheck }><span>로그인</span></button>
                            </div>
                        </section>
                        <div className={ this.state.modalOpen ? 'open-modal' : 'close-modal' }>
                            로그인 정보를 확인하고 있습니다.<br></br><br></br>
                            잠시만 기다려주세요.
                            <div onClick={this.closeModal}>닫기</div>
                        </div>
                        <footer>
                            <div className="copyright-wrap"></div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;