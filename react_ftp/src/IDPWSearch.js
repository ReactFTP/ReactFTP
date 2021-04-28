import './IDPWSearch.css';
import React, {Component} from 'react';
import * as axios from './axios.js'


class IDPWSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
           nameForID : '',
           nameForPW : '',
           emailForID : '',
           emailForPW : '',
           phoneForID : '',
           phoneForPW : '',
        };
    }

    handleId = async(e) => {
        await this.setState({
            id: e.target.value
        });
    }


    handleNameInID = async(e) => {
        await this.setState({
            nameForID: e.target.value
        });
    }

    handleNameInPW = async(e) => {
        await this.setState({
            nameForPW: e.target.value
        });
    }

    handleEmailInID = async(e) => {
        await this.setState({
            emailForID: e.target.value
        });
    }

    handleEmailInPW = async(e) => {
        await this.setState({
            emailForPW: e.target.value
        });
    }
    
    handlePhoneInID = async(e) => {
        await this.setState({
            phoneForID: e.target.value
        });
    }

    handlePhoneInPW = async(e) => {
        await this.setState({
            phoneForPW: e.target.value
        });
    }

    getID = async() => {
        let name = this.state.nameForID;
        let phone = this.state.phoneForID;
        let email = this.state.emailForID;
        let result = await axios.findID(name, email, phone);
        result == ''? alert('입력하신 정보가 존재하지 않습니다.'):
        alert('아이디 검색 결과 : ' + result)
    }

    setPW = async() => {
        let id = this.state.id;
        let name = this.state.nameForPW;
        let phone = this.state.phoneForPW;
        let email = this.state.emailForPW;
        let result = await axios.getNewPW(id ,name, email, phone);
        result == ''? alert('입력하신 정보가 존재하지 않습니다.'):
        alert('임시 비밀번호가 발급되었습니다. [' + result +']');
        
    }

    render(){  
 
        return (
        <section className="member-wrap" > 
            <section className="join-form-wrap">
                <input type="hidden" name="mode" value="find_id"/>
                    <fieldset>
                        <legend>아이디 찾기<span>회원정보에 입력하신 성함과 이메일 주소 또는 연락처를 입력해 주세요.</span></legend>
                        <table className="form-table">
                            <colgroup>
                                <col width="30%"/>
                                <col width="*"/>
                            </colgroup>
                            <tbody>
                                <tr className="join-form-name">
                                    <th scope="row"><label for="">이름</label></th>
                                    <td><input type="text" name="name" onChange={this.handleNameInID}/></td>
                                </tr>
                                {this.state.phoneForID==''?
                                <tr className="join-form-name">
                                    <th scope="row">이메일</th>
                                    <td><input type="text" name="email" placeholder="id@genergy.com" onChange={this.handleEmailInID}/></td>
                                </tr>:
                                null
                                }
                                {this.state.emailForID==''?
                                <tr className="join-form-name">
                                    <th scope="row">연락처</th>
                                    <td><input type="text" name="phone" placeholder="010-XXXX-XXXX" onChange={this.handlePhoneInID}/></td>
                                </tr>:
                                null
                                }
                            </tbody>
                        </table>
                    </fieldset>
        
                <p className="join-btn-wrap">
                    <a className="btn-cancel" onClick={window.close} >취소</a>
                    <a onClick={this.getID} className="btn-confirm">아이디 찾기</a>
                </p>
                <input type="hidden" name="mode" value="find_password"/>
                    <fieldset>
                        <legend>비밀번호 찾기<span>회원정보에 입력하신 아이디, 성함과 이메일 주소 또는 연락처를 입력하시면 임시 비밀번호를 발급해드립니다.</span></legend>
                        <table className="form-table">
                            <colgroup>
                                <col width="30%"/>
                                <col width="*"/>
                            </colgroup>
                            <tbody>
                                <tr className="join-form-name">
                                    <th scope="row">아이디</th>
                                    <td><input type="text" name="id" onChange={this.handleId}/></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">이름</th>
                                    <td><input type="text" name="name" onChange={this.handleNameInPW}/></td>
                                </tr>
                                {this.state.phoneForPW==''?
                                <tr className="join-form-name">
                                    <th scope="row">이메일</th>
                                    <td><input type="text" name="email" placeholder="id@genergy.com" onChange={this.handleEmailInPW}/></td>
                                </tr>:
                                null
                                }
                                   {this.state.emailForPW==''?
                                <tr className="join-form-name">
                                    <th scope="row">연락처</th>
                                    <td><input type="text" name="phone" placeholder="010-XXXX-XXXX" onChange={this.handlePhoneInPW}/></td>
                                </tr>:
                                null
                                }
                            </tbody>
                        </table>
                    </fieldset>
        
                <p className="join-btn-wrap">
                    <a className="btn-cancel" onClick={window.close}>취소</a>
                    <a onClick={this.setPW} className="btn-confirm">임시 비밀번호 발급</a>
                </p>
        
            </section>
        </section>
            
            
        ); //return
    } //render 
    
}

export default IDPWSearch;