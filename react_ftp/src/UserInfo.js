import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
class UserInfo extends Component{

    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form">
            <div className="row">
                <div className="main-title">
                <h4>정보확인</h4>
                <p className="center">정보를 변경하려면 수정버튼을 클릭하세요.</p>
                </div>
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><FingerprintIcon/></icon>
                <label for="id"> 아이디  </label>
                <input id="id" name="id" type="text" value="사용자아이디" disabled/>
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
                <input id="email" name="email" type="text" size="10" value="abc123" disabled/>@
                <input id="email1" name="email1" type="combo" size="15" value="genergyplm.com" disabled/> 
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone" type="text" size="2" value="010" disabled/> - 
                <input id="phone" name="phone" type="text" size="5" value="1234" disabled/> - 
                <input id="phone" name="phone" type="text" size="5" value="5678" disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" value="서울시 강서구 마곡나루 인강프라이빗타워 2차" disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" value="813호 제너지" disabled/>
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
export default UserInfo;