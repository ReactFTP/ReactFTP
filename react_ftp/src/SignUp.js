import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
class SignUp extends Component{
    state = {
       idCheck:'',
       pwCheck: '',
       pwCheckResult: '일치여부'
    }

    handleChangeID = async(e) => {
        //await axios로 중복체크 e.target.value
        
      }

    handleChangePW1 = async(e) => {
        await this.setState({
            pwCheck : e.target.value
        });
    }

    handleChangePW2 = async(e) => {
        if(e.target.value == this.state.pwCheck){
            await this.setState({pwCheckResult:'일치'});
        }else{
            await this.setState({pwCheckResult:'불일치'});
        }
    }

    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form">
            <div className="row">
                <div className="main-title">
                <h4>회원가입</h4>
                <p className="center">Join to our community now !</p>
                </div>
            </div>
            {/* 매니저로 가입 체크박스 아이디 패스워드 재확인 이름 이메일 연락처 기본주소 상세주소 회사 /제출 취소*/}
            <div className="check-type">
                <input id="type" type="checkbox"/>
                <label id="label" for="type"> 매니저로 가입</label>  
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><FingerprintIcon/></icon>
                <label for="id"> 아이디  </label>
                <input id="id" name="id" type="text" onChange={this.handleChangeID}/> 
                {this.state.idCheck}
                </div>
            </div>
            
            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password"> 비밀번호 </label>
                <input id="password" name="password" type="password" onChange={this.handleChangePW1}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password_a"> 비밀번호 확인 </label>
                <input id="password_a" name="cpassword" type="password" onChange={this.handleChangePW2} />
                {this.state.pwCheckResult}
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <AccountBoxIcon/></icon>
                <label for="username"> 이름 </label>
                <input id="username" name="username" type="text"/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email" type="text" size="10" />@
                <input id="email1" name="email1" type="combo" size="15" /> 
                <select name="emails">
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="naver.com" >naver.com</option>
                    <option value="" selected="selected">직접입력</option>
                </select>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone" type="text" size="2"/> - 
                <input id="phone" name="phone" type="text" size="5"/> - 
                <input id="phone" name="phone" type="text" size="5"/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" />
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" />
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="company"> 회사 </label>
                <input id="company" name="company" type="text" size="30" />
                <button type="button" className="btn1 waves-effect waves-light col s11">
                    <img src="./search_icon.png" height="10" width="10"></img>
                </button>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                <button type="submit" className="btn waves-effect waves-light col s12">제출</button>
                <button type="button" className="btn waves-effect waves-light col s12">취소</button>
                
                </div>
                <div className="input-field col s12">
                <p className="margin center medium-small sign-up">Already have an account? <a href="./login">Login</a></p>
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default SignUp;