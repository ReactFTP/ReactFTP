import React from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom'

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
        //세션 종료하기
        if(window.sessionStorage.getItem("sessionId")){
            //axios.logout(window.sessionStorage.getItem('appXsession'));
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
      console.log(id,pw)
      await this.setState({message:"" });
      let result = await axios.login(id,pw);
      if(result!=''){
        await this.setState({message: result});
      }
      
      this.openLink();

    }

    openLink= async() => {
        if (this.state.message != ''){
            this.closeModal();
            return;
        }
        window.sessionStorage.setItem('sessionId', this.state.id);
        let user = await axios.getUser(this.state.id, this.state.pw);
        console.log(user);
        window.sessionStorage.setItem('roleId', user[10]);
        window.sessionStorage.setItem('authId', user[11]);
        window.sessionStorage.setItem('coId', user[12]);
        this.props.history.push('/home');
    }

    openModal = () => {
        this.setState({ modalOpen: true });
    }
    closeModal = () => {
        this.setState({ modalOpen: false });
    }

    openPopup(){
        window.open("http://localhost:3000/idpwsearch", "", "height=830px, width=572px");
    }

    openSignUp(){
        this.props.history.push('/signup');
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
                                <Link to="./signup"><button><span>회원가입</span></button></Link>
                                <p className="margin center medium-small forget-pw">Forgot your account? <a onClick={this.openPopup}>ID/PW찾기</a></p>
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