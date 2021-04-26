import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import * as axios from './axios.js'
import Modal from 'react-modal';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


class SignUp extends Component{
    state = {
       idCheck: '',
       idCheckResult: '',
       pwCheck: '',
       pwCheckResult: '일치여부',
       email1: '',
       email2: '',
       company: '',
       companyModal: false,
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    handleChangeID = async(e) => {
        await this.setState({
            idCheck : e.target.value
        });
        
    } 

    idCheckSubmit = async() => {
        const id = this.state.idCheck;
        console.log(id);
        // await axios.idCheck(id);
        let result = await axios.idCheck(id);
        if(result==true){
            await this.setState({idCheckResult : '사용불가'});
        }else{
            await this.setState({idCheckResult : '사용가능'});
        }   
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

    handleChangeEmail = async(e) => {

        if(e.target.value == "직접입력"){
            await this.setState({email2 : ''});    
        }else{
        await this.setState({email2 : e.target.value});
        }
    }

    getEmail1 = async(e) => {
        await this.setState({email1 : e.target.value});
    }
    getEmail2 = async(e) => {
        await this.setState({email2 : e.target.value});
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
      };

    handleChangeType =async(e) => { await this.setState({type : e.target.value});    }
    handleChangeName =async(e) => { await this.setState({name : e.target.value});    }
    handleChangePhone1 =async(e) => { await this.setState({phone1 : e.target.value});    }
    handleChangePhone2 =async(e) => { await this.setState({phone2 : e.target.value});    }
    handleChangePhone3 =async(e) => { await this.setState({phone3 : e.target.value});    }
    handleChangeAddr1 =async(e) => { await this.setState({addr1 : e.target.value});    }
    handleChangeAddr2 =async(e) => { await this.setState({addr2 : e.target.value});    }

    openCompanyModal = async() => {
        await this.setState({companyModal: true});
    }

    closeCompanyModal = async() => {
        await this.setState({companyModal: false});
    }

    companyColumns = [{
        dataField: 'id',
        text: '회사코드'
      }, {
        dataField: 'name',
        text: '회사명'
    }];
    
    getCompanies = async() => {
        await axios.getCompanies();
    }

    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form" onSubmit={this.onSubmit}>
            <div className="row">
                <div className="main-title">
                <h4>회원가입</h4>
                <p className="center">Join to our community now !</p>
                </div>
            </div>
            {/* 매니저로 가입 체크박스 아이디 패스워드 재확인 이름 이메일 연락처 기본주소 상세주소 회사 /제출 취소*/}
            <div className="check-type">
                <input id="type" type="checkbox" onChange={this.handleChangeType}/>
                <label id="label" for="type"> 매니저로 가입</label>  
            </div>


            <div className="row margin">
                <div className="input-field col s12">
                {/* <form onSubmit={this.idCheckSubmit} method="post"> */}
                    <icon className ="material-icons"><FingerprintIcon/></icon>
                    <label for="id"> 아이디  </label>
                    <input id="id" name="id" type="text" onChange={this.handleChangeID}/> 
                    <input id="id-btn" type="button" value="중복확인" className="submit-btn" onClick={this.idCheckSubmit}/>
                    {this.state.idCheckResult}
                {/* </form> */}
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
                <input id="username" name="username" type="text" onChange={this.handleChangeName}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email" type="text" size="10" onChange={this.getEmail1}/>@
                
                { this.state.email2=='gmail.com' || this.state.email2=='daum.net'|| this.state.email2=='naver.com'?
                <input id="email1" name="email2" type="text" size="15" value={this.state.email2}/>
                : <input id="email" name="email1" type="text" size="15" onChange={this.getEmail2} />
                }
                
                <select name="emails" onChange={this.handleChangeEmail}>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="naver.com" >naver.com</option>
                    <option value="직접입력" selected="selected">직접입력</option>
                </select>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><PhoneIcon/></icon>
                <label for="phone"> 연락처 </label>
                <input id="phone" name="phone" type="text" size="2" onChange={this.handleChangePhone1}/> - 
                <input id="phone" name="phone" type="text" size="5" onChange={this.handleChangePhone2}/> - 
                <input id="phone" name="phone" type="text" size="5" onChange={this.handleChangePhone3}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 기본 주소 </label>
                <input id="addr1" name="addr1" type="text" size="40" placeholder="시, 군, 구" onChange={this.handleChangeAddr1}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr2"> 상세 주소 </label>
                <input id="addr2" name="addr2" type="text" size="40" placeholder="건물주소, 호수" onChange={this.handleChangeAddr2}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <LocationCityIcon/></icon>
                <label for="company"> 회사 </label>
                <input id="company" name="company" type="text" size="30" value={this.state.company} />
                <button type="button" className="btn1 waves-effect waves-light col s11" onClick={this.openCompanyModal}>
                    <img src="./search_icon.png" height="10" width="10"></img>
                </button>
                    {/*모달창*/}

                    <Modal  className="company-modal"
                            isOpen={this.state.companyModal}
                            //onAfterOpen={afterOpenModal}
                            onRequestClose={this.closeCompanyModal}
                            contentLabel="Company Modal"
                            >
                            
                            <div class="box">
                                 <div class="search-container-1">
                                    <span class="icon">
                                        <i class="fa fa-search"></i>
                                    </span>
                                    <input type="search" id="search" placeholder="회사명 검색..." />
                                 </div>
                            </div>
                            {/*테이블*/}
                            {this.getCompanies}

                    </Modal>
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