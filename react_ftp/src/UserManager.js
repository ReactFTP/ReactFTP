import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
class UserManager extends Component{
    state = {
        pwCheck: '',
        pwCheckResult: '일치여부'
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
                <h4>정보수정</h4>
                <p className="center">이메일, 연락처, 비밀번호, 주소만 수정 가능합니다.</p>
                </div>
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><FingerprintIcon/></icon>
                <label for="id"> 아이디  </label>
                <input id="id" name="id" type="text" value="사용자아이디" disabled />
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password"> 새 비밀번호 </label>
                <input id="password" name="password" type="password"  onChange={this.handleChangePW1}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password_a"> 비밀번호 확인 </label>
                <input id="password_a" name="cpassword" type="password"  onChange={this.handleChangePW2}/>
                {this.state.pwCheckResult}
                </div>
                
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <AccountBoxIcon/></icon>
                <label for="username"> 이름 </label>
                <input id="username" name="username" type="text" value="홍길동" disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email" type="text" size="10" placeholder="abc123"/>@
                <input id="email1" name="email1" type="combo" size="15" placeholder="genergyplm.com"/> 
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone" type="text" size="2" placeholder="010"/> - 
                <input id="phone" name="phone" type="text" size="5" placeholder="1234"/> - 
                <input id="phone" name="phone" type="text" size="5" placeholder="5678"/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" placeholder="서울시 강서구 마곡나루 인강프라이빗타워 2차"/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" placeholder="813호 제너지"/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="company"> 회사 </label>
                <input id="company" name="company" type="text" size="30" value="제너지" disabled/>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                <button type="submit" className="btn waves-effect waves-light col s12">수정</button>
                <button type="button" className="btn waves-effect waves-light col s12">취소</button>
                
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default UserManager;