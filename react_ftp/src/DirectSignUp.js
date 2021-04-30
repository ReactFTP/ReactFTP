import './SignUp.css';
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
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
import BootstrapTable from 'react-bootstrap-table-next';

class DirectSignUp extends Component{
    state = {
       idCheck: '',
       idCheckResult: '',
       pwCheck: '',
       pwCheckResult: '일치여부',
       name:'',
       email1: '',
       email2: '',
       phone1: '',
       phone2: '',
       phone3: '',
       addr1: '',
       addr2: '',
       company: '',
       companyId: '',
       companyModal: false,
       companies:[],
       searchCompanies:[],
       type: false,
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
    
    onSubmit = async(e) => {

        e.preventDefault();
        let id = this.state.idCheck;
        let idCheck = this.state.idCheckResult;
        let pw = this.state.pwCheck;
        let pwCheck = this.state.pwCheckResult;
        let name = this.state.name;
        let email = this.state.email1 + '@' + this.state.email2;
        let phone = this.state.phone1 + '-' + this.state.phone2 + '-' + this.state.phone3;
        let addr1 = this.state.addr1;
        let addr2 = this.state.addr2;
        let company = '';
        if (window.sessionStorage.getItem('roleId')=='m'){
             company = 'manager'
        }else{
             company = this.state.company;
        }
        
        let manager = this.state.type;

        console.log(id, idCheck, pw, pwCheck, name, email, phone, addr1, addr2, company, manager);       
        

        idCheck != '사용가능'? alert('ID 중복을 확인주세요.'):
        pwCheck != '일치'? alert('PW 일치를 확인해주세요.'):
        name == ''? alert('이름을 입력해주세요.'):
        this.state.email1 == '' || this.state.email2 == ''? alert('이메일을 입력해주세요.'):
        this.state.email1.includes('@') || this.state.email2.includes('@')?  alert('이메일 형식이 올바른지 확인해주세요.'):
        await axios.emailCheck(email)? alert('이미 존재하는 이메일입니다.'):
        this.state.phone1 == ''||this.state.phone2 == ''||this.state.phone3 == ''? alert('휴대폰 번호를 입력해주세요.'):
        await axios.phoneCheck(phone)? alert('이미 존재하는 휴대폰 번호입니다.'):
        addr1 == '' ? alert('주소를 입력해주세요.'):
        company == ''?alert('소속 회사를 선택해주세요.'):
        window.sessionStorage.getItem('roleId')=='m'?  await axios.directSignUp(id, pw, name, email, phone, addr1, addr2,window.sessionStorage.getItem('coId'), manager, 'manager'):
        window.sessionStorage.getItem('roleId')=='a'? await axios.directSignUp(id, pw, name, email, phone, addr1, addr2,this.state.companyId, manager, 'admin'):
        console.log('end')

        window.opener.location.reload();

        
        
        
      };

    handleChangeType =async(e) => { await this.setState({type : e.target.checked});    }
    handleChangeName =async(e) => { await this.setState({name : e.target.value});    }
    handleChangePhone1 =async(e) => { await this.setState({phone1 : e.target.value});    }
    handleChangePhone2 =async(e) => { await this.setState({phone2 : e.target.value});    }
    handleChangePhone3 =async(e) => { await this.setState({phone3 : e.target.value});    }
    handleChangeAddr1 =async(e) => { await this.setState({addr1 : e.target.value});    }
    handleChangeAddr2 =async(e) => { await this.setState({addr2 : e.target.value});    }

    openCompanyModal = async() => {
        let result = await axios.getCompanies();
        await this.setState({companyModal: true});
        console.log(Object.keys(result));
        const keyList = Object.keys(result);
        var myArray2 = new Array(keyList.length);
        for (let i = 0; i < keyList.length; i++){
            let key = keyList[i];
            myArray2[i] = result[key];
        }
        
        await this.setState({companies: myArray2, searchCompanies: myArray2});
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

    searchCompany = async(e) => {
        console.log(e.target.value);
        var input = e.target.value;
        var list = [];
        this.state.companies.map(e => {
            if(e.coId.includes(input) || e.coName.includes(input)){
                list.push(e);
            }
        });
        await this.setState({
            searchCompanies : list
        });

    }
    

    clickCompany = {
        onClick: async (e, row, rowIndex) => {
            await this.setState({company : row.coName, companyId : row.coId});
            this.closeCompanyModal();
        }
      };
  
    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form" onSubmit={this.onSubmit}>
            <div className="row">
                <div className="main-title">
                <h4>사용자 추가</h4>
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
                <input id="phone" name="phone" type="text" size="2" maxlength='3' onChange={this.handleChangePhone1}/> - 
                <input id="phone" name="phone" type="text" size="5" maxlength='4' onChange={this.handleChangePhone2}/> - 
                <input id="phone" name="phone" type="text" size="5" maxlength='4' onChange={this.handleChangePhone3}/>
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
                {window.sessionStorage.getItem('roleId') == 'a'? (
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
                                    <input type="search" id="search" placeholder="회사명 또는 회사 코드 검색..." onChange={this.searchCompany}/>
                                 </div>
                            </div>
                            {/*테이블*/}
                            <BootstrapTable keyField='id' 
                            data={this.state.searchCompanies} 
                            columns={[{dataField: 'coId', text: '회사코드'}, {dataField: 'coName', text: '회사명'}]}
                            hover
                            noDataIndication="Table is Empty"
                            rowEvents={ this.clickCompany } 
                             />


                    </Modal>
                </div>):
                null
                }
            </div>

            <div className="row">
                <div className="input-field col s12">
                <button type="button" className="btn waves-effect waves-light col s12" onClick={this.onSubmit}>제출</button>
                <button type="button" className="btn waves-effect waves-light col s12" onClick={()=> {window.close()}}>취소</button>
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default DirectSignUp;