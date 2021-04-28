import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import { Link } from 'react-router-dom';
import * as axios from './axios.js'

class UserManager extends Component{
    state = {
        id:'',
        pw: '',
        pwCheckResult: '일치여부',
        name: '',
        email1: '',
        email2: '',
        phone1: '',
        phone2: '',
        phone3: '',
        addr1: '',
        addr2: '',
        company: '',
     }

     componentWillMount(){
        this.getInfoById(window.sessionStorage.getItem('sessionId'));
    }  

    getInfoById = async(id) => {
        let info = await axios.getUser(id);
        await this.setState({
            id: info[0],
            name: info[1],
            email1: info[2],
            email2: info[3],
            phone1: info[4],
            phone2: info[5],
            phone3: info[6],
            addr1: info[7],
            addr2: info[8],
            company: info[9],
            info: info,
        });
        
    }
     onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleChangePW = async(e) => {
        if(e.target.value == this.state.pw){
            await this.setState({pwCheckResult:'일치'});
        }else{
            await this.setState({pwCheckResult:'불일치'});
        }
    }

    onSubmit = async(e) => {

        e.preventDefault();
        let id = this.state.id; 
        let pw = this.state.pw;
        let pwCheck = this.state.pwCheckResult;
        let email = this.state.email1 + '@' + this.state.email2;
        let phone = this.state.phone1 + '-' + this.state.phone2 + '-' + this.state.phone3;
        let addr1 = this.state.addr1;
        let addr2 = this.state.addr2;
        let checkEmail = this.state.info[2]+ '@'+ this.state.info[3];
        let checkPhone = this.state.info[4]+ '-'+ this.state.info[5]+'-'+ this.state.info[6];
        let result = false;
        if(pw != ''){
            if(pwCheck != '일치'){  // 비밀번호 불일치
                alert('PW 일치를 확인해주세요.')
                return;
            }
        }

        if(this.state.email1.includes('@') || this.state.email2.includes('@')){ // 이메일 포맷 확인
            alert('이메일 형식이 올바른지 확인해주세요.') 
            return;
        } 
        if((email == checkEmail) && (phone == checkPhone)){ // DB 이메일, 연락처와 사용자가 입력한 이메일, 연락처가 일치하는 경우
            if(await axios.editUser(id, pw, email, phone, addr1, addr2)){    // 변경된 사항이 없으면 바로 수정
                alert("변경 완료")
                window.location.assign('./userinfo');
            }else    // 수정 실패
                alert("변경 실패")
            return;
        }
        if(email != checkEmail){    // DB 이메일과 사용자가 입력한 이메일 일치하지 않는 경우
            if(await axios.emailCheck(email)){  // 사용자가 입력한 이메일이 DB 에 존재하는 경우
                alert('이미 존재하는 이메일입니다.')
                return;
            } 
        }
        if((phone != checkPhone)){  // 연락처 불일치
                if(await axios.phoneCheck(phone)){
                    alert('이미 존재하는 휴대폰 번호입니다.')
                    return;
                } 
        }

        if(await axios.editUser(id, pw, email, phone, addr1, addr2)){
            alert('변경완료');
            window.location.assign('./userinfo');
        }else{
            alert('변경실패');
        }
        
      };

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
                <input id="id" name="id" type="text" value={this.state.id} disabled />
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password"> 새 비밀번호 </label>
                <input id="password" name="pw" type="password"  onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password_a"> 비밀번호 확인 </label>
                <input id="password_a" name="pwCheck" type="password"  onChange={this.handleChangePW}/>
                {this.state.pwCheckResult}
                </div>
                
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <AccountBoxIcon/></icon>
                <label for="username"> 이름 </label>
                <input id="username" name="name" type="text" value={this.state.name} disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email1" type="text" size="10" placeholder={this.state.email1} onChange={this.onChange}/>@
                <input id="email1" name="email2" type="combo" size="15" placeholder={this.state.email2} onChange={this.onChange}/> 
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone1" type="text" size="2" placeholder={this.state.phone1}  maxlength='3' onChange={this.onChange}/> - 
                <input id="phone" name="phone2" type="text" size="5" placeholder={this.state.phone2}   maxlength='4' onChange={this.onChange}/> - 
                <input id="phone" name="phone3" type="text" size="5" placeholder={this.state.phone3}   maxlength='4' onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" placeholder={this.state.addr1}  onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" placeholder={this.state.addr2} onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="company"> 회사 </label>
                <input id="company" name="company" type="text" size="30" value={this.state.company} disabled/>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                <button type="button" className="btn waves-effect waves-light col s12" onClick={this.onSubmit}>수정</button>
                <Link to="./home">
                <button type="button" className="btn waves-effect waves-light col s12">취소</button>
                </Link>
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default UserManager;