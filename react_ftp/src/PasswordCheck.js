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

class PasswordCheck extends Component{

    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form">
            <div className="row">
                <div className="main-title">
                <h4>정보수정</h4>
                </div>
            </div>
            
            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><VpnKeyIcon/></icon>
                <label for="password"> 비밀번호 </label>
                <input id="password" name="password" type="password" />
                </div>
            </div>

            <div className="row">
                <div className="input-field col s12">
                <Link to="./edituser">
                <button type="submit" className="btn waves-effect waves-light col s12" >확인</button>
                </Link>
                <Link to="./home">
                <button type="button" className="btn waves-effect waves-light col s12">홈</button>
                </Link>
                
                </div>
               
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default PasswordCheck;