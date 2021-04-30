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
import * as axios from './axios';

class UserInfoPopup extends Component{
    state = {
            name: '',
            id: '',
            email1: '',
            email2: '',
            phone1: '',
            phone2: '',
            phone3: '',
            addr1: '',
            addr2: '',
            company: '',
            role:'',
            auth:'',
            active:'',
            join:'',
        }
    componentWillMount(){
        let url = window.location.search;
        let parameter = url.substring(1, url.length);
        this.getInfoById(parameter);
    }  

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    getInfoById = async(id) => {
        
        let info = await axios.getUser(id);
        console.log(info);
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
            role: info[10],
            auth: info[11],
            active: info[13],
            join: info[14]
        });
        
    }

    submit = async() => {
        let result = await axios.editUserSet(this.state.id, this.state.auth, this.state.active, this.state.join);
        result? alert('반영되었습니다.'):
        alert('실패하였습니다. 개발자에게 문의하세요.')

    }

    cancle = async() => {
        window.opener.location.reload();
        window.close();
    }

    authAIF = () => {
        if( this.state.role == ''){ 
            return;
        } //어드민이 a권한을 보고 있다면
        if( this.state.auth == 'a' && window.sessionStorage.getItem('roleId') =='a'){
            return <option value="a" selected>A class</option>
        }if( (this.state.auth == 'b'||this.state.auth == 'c') && window.sessionStorage.getItem('roleId') =='a' ){
            return <option value="a" >A class</option>
        }if( this.state.auth == 'a' && this.state.role == 'u'){
            return <option value="a" selected>A class</option>
        }if(( this.state.auth == 'b'||this.state.auth == 'c') && this.state.role == 'u'){
            return <option value="a" >A class</option>
        }if(this.state.auth == 'a' && (window.sessionStorage.getItem('roleId') == this.state.role)){
            return <option value="a" selected disabled >A class</option>
        } if(window.sessionStorage.getItem('roleId') == this.state.role){
            return <option value="a" selected disabled >A class</option>
        }
    }
    authBIF = () => {
        if( this.state.role == ''){ 
            return;
        } //어드민이 a권한을 보고 있다면
        if( this.state.auth == 'b' && window.sessionStorage.getItem('roleId') =='a'){
            return <option value="b" selected>B class</option>
        }if( (this.state.auth == 'a'||this.state.auth == 'c') && window.sessionStorage.getItem('roleId') =='a' ){
            return <option value="b" >B class</option>
        }if( this.state.auth == 'b' && this.state.role == 'u'){
            return <option value="b" selected>B class</option>
        }if(( this.state.auth == 'a'||this.state.auth == 'c') && this.state.role == 'u'){
            return <option value="b" >B class</option>
        }if(this.state.auth == 'b' && (window.sessionStorage.getItem('roleId') == this.state.role)){
            return <option value="b" selected disabled >B class</option>
        }if(window.sessionStorage.getItem('roleId') == this.state.role){
            return <option value="b" selected disabled >B class</option>
        }
    }
    authCIF = () => {
        if( this.state.role == ''){ 
            return;
        } //어드민이 a권한을 보고 있다면
        if( this.state.auth == 'c' && window.sessionStorage.getItem('roleId') =='a'){
            return <option value="c" selected>C class</option>
        }if( (this.state.auth == 'b'||this.state.auth == 'a') && window.sessionStorage.getItem('roleId') =='a' ){
            return <option value="c" >C class</option>
        }if( this.state.auth == 'c' && this.state.role == 'u'){
            return <option value="c" selected>C class</option>
        }if(( this.state.auth == 'b'||this.state.auth == 'a') && this.state.role == 'u'){
            return <option value="c" >C class</option>
        }if(this.state.auth == 'c' && (window.sessionStorage.getItem('roleId') == this.state.role)){
            return <option value="c" selected disabled >C class</option>
        } if(window.sessionStorage.getItem('roleId') == this.state.role){
            return <option value="c" selected disabled >C class</option>
        }
    }
    render(){
        
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form">
            <div className="row">
                <div className="main-title">
                <h4>회원정보</h4>
                <p className="center">정보를 변경하려면 수정버튼을 클릭하세요.</p>
                </div>
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><FingerprintIcon/></icon>
                <label for="id"> 아이디  </label>
                <input id="id" name="id" type="text" value={this.state.id} disabled/>
                </div>
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <AccountBoxIcon/></icon>
                <label for="username"> 이름 </label>
                <input id="username" name="username" type="text" value={this.state.name} disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email" type="text" size="10" value={this.state.email1} disabled/>@
                <input id="email1" name="email1" type="combo" size="15" value={this.state.email2} disabled/> 
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone" type="text" size="2" value={this.state.phone1} disabled/> - 
                <input id="phone" name="phone" type="text" size="5" value={this.state.phone2} disabled/> - 
                <input id="phone" name="phone" type="text" size="5" value={this.state.phone3} disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" value={this.state.addr1} disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" value={this.state.addr2} disabled/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="company"> 회사 </label>
                <input id="company" name="company" type="text" size="30" value={this.state.company} disabled/>
                </div>
            </div>
           
            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="join"> 가입 요청  </label>
                <select className="join" name='join' onChange={this.onChange}>
                    {
                     this.state.join == ''? null:
                     this.state.join=='N'?    <option value="N" selected>거절</option>: //승락이 되어있지 않으면 N
                     window.sessionStorage.getItem('roleId') == this.state.role? <option value="N" disabled>거절</option>: //로그인한 role과 클릭한 role이 같으면 선택 불가
                     window.sessionStorage.getItem('roleId') == 'a' && (this.state.role =='m' || this.state.role =='u')? <option value="N" >거절</option>: //승락이 되어있지만 내가 어드민이고 상대가 m,u면 선택가능한 거절
                     window.sessionStorage.getItem('roleId') == 'm' && this.state.role =='u'? <option value="N" >거절</option>: //승락이 되어있지만 내가 매니저고 상대가 u면 선택가능한 거절
                     <option value="N">거절</option>
                    }
                    {
                     this.state.join == ''? null:
                     this.state.join=='Y'?    <option value="Y" selected>수락</option>: //수락이 되어있다면
                     window.sessionStorage.getItem('roleId') == this.state.role? <option value="Y" disabled>수락</option>: //로그인한 role과 클릭한 role이 같으면 선택 불가
                     window.sessionStorage.getItem('roleId') == 'a' && (this.state.role =='m' || this.state.role =='u')? <option value="Y" >수락</option>: //승락이 되어있지만 내가 어드민이고 상대가 m,u면 선택가능한 거절
                     window.sessionStorage.getItem('roleId') == 'm' && this.state.role =='u'? <option value="Y" >수락</option>: //승락이 되어있지만 내가 매니저고 상대가 u면 선택가능한 거절
                     <option value="Y">수락</option>
                    }
                </select>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="auth"> 권한 레벨 </label>
                <select className="join" name="auth" onChange={this.onChange}>
                    {
                     this.authAIF()
                    }
                      {
                     this.authBIF()
                    }
                      {
                     this.authCIF()
                    }
                  
                </select>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="active"> 활성화 여부 </label>
                <select className="join" name="active"onChange={this.onChange}>
                    {
                     this.state.active == ''? null:
                     this.state.active=='N'?    <option value="N" selected>비활성화</option>: 
                     window.sessionStorage.getItem('roleId') == this.state.role? <option value="N" disabled>비활성화</option>: 
                     window.sessionStorage.getItem('roleId') == 'a' && (this.state.role =='m' || this.state.role =='u')? <option value="N" >비활성화</option>:
                     window.sessionStorage.getItem('roleId') == 'm' && this.state.role =='u'? <option value="N" >비활성화</option>:
                     <option value="N">비활성화</option>
                    }
                     {
                     this.state.active == ''? null:
                     this.state.active=='Y'?    <option value="Y" selected>활성화</option>: 
                     window.sessionStorage.getItem('roleId') == this.state.role? <option value="Y" disabled>활성화</option>: 
                     window.sessionStorage.getItem('roleId') == 'a' && (this.state.role =='m' || this.state.role =='u')? <option value="Y" >활성화</option>: 
                     window.sessionStorage.getItem('roleId') == 'm' && this.state.role =='u'? <option value="Y" >활성화</option>:
                     <option value="Y">활성화</option>
                    }
                </select>
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                <button type="button" className="btn waves-effect waves-light col s12" onClick={this.submit}>반영</button>
                <button type="button" className="btn waves-effect waves-light col s12" onClick={this.cancle}>취소</button>
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default UserInfoPopup;