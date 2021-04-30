import './SignUp.css';
import React, {Component} from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import * as axios from './axios.js'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class AddCompany extends Component{
    state = {
       name:'',
       email1: '',
       email2: '',
       phone1: '',
       phone2: '',
       phone3: '',
       desc: '',
    }

    componentWillMount() {
       
    }

    handleChangeEmail = async(e) => {

        if(e.target.value == "직접입력"){
            await this.setState({email2 : ''});    
        }else{
        await this.setState({email2 : e.target.value});
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    onSubmit = async(e) => {

        e.preventDefault();
        let name = this.state.name;
        let email = this.state.email1 + '@' + this.state.email2;
        let phone = this.state.phone1 + '-' + this.state.phone2 + '-' + this.state.phone3;
        let desc = this.state.desc;

        name == ''? alert('이름을 입력해주세요.'):
        this.state.email1 == '' || this.state.email2 == ''? alert('이메일을 입력해주세요.'):
        this.state.email1.includes('@') || this.state.email2.includes('@')?  alert('이메일 형식이 올바른지 확인해주세요.'):
        this.state.phone1 == ''||this.state.phone2 == ''||this.state.phone3 == ''? alert('휴대폰 번호를 입력해주세요.'):
        window.sessionStorage.getItem('roleId')=='a'? await axios.addCompany(name, email, phone, desc):
        alert('Admin session이 만료되었습니다.')

        window.opener.location.reload();

        
        
        
      };

    render(){
        return(
        <div id="login-page" className="row">
            <div className="col s12 z-depth-4 card-panel">
            <form className="login-form" onSubmit={this.onSubmit}>
            <div className="row">
                <div className="main-title">
                <h4>회사 추가</h4>
                <p className="center">Join to our community now !</p>
                </div>
            </div>
         
            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <AccountBoxIcon/></icon>
                <label for="username"> 회사이름 </label>
                <input id="username" name="name" type="text" onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"><EmailIcon/></icon>
                <label for="email"> 이메일 </label>
                <input id="email" name="email1" type="text" size="10" onChange={this.onChange}/>@
                
                { this.state.email2=='gmail.com' || this.state.email2=='daum.net'|| this.state.email2=='naver.com'?
                <input id="email1" name="email2" type="text" size="15" value={this.state.email2}/>
                : <input id="email" name="email2" type="text" size="15" onChange={this.onChange} />
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
                <label for="phone"> 대표번호 </label>
                <input id="phone" name="phone1" type="text" size="2" maxlength='3' onChange={this.onChange}/> - 
                <input id="phone" name="phone2" type="text" size="5" maxlength='4' onChange={this.onChange}/> - 
                <input id="phone" name="phone3" type="text" size="5" maxlength='4' onChange={this.onChange}/>
                </div>
            </div>

            <div className="row margin">
                <div className="input-field col s12">
                <icon className ="material-icons"> <HomeIcon/></icon>
                <label for="addr"> 회사 설명</label>
                <input id="desc" name="desc" type="text" size="40" placeholder="100자 이내" onChange={this.onChange}/>
                </div>
            </div>

          

            <div className="row">
                <div className="input-field col s12">
                <button type="button" className="btn waves-effect waves-light col s12" onClick={this.onSubmit}>추가</button>
                <button type="button" className="btn waves-effect waves-light col s12" onClick={()=> {window.close()}}>취소</button>
                </div>
            </div>


            </form>
        </div>
        </div>
        );
    }
}
export default AddCompany;