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

class UserInfo extends Component{
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
        });
        
    }
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

            <div className="row">
                <div className="input-field col s12">
                <Link to="./pwcheck">
                <button type="submit" className="btn waves-effect waves-light col s12">수정</button>
                </Link>   
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
export default UserInfo;