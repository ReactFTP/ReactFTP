import './IDPWSearch.css';
import React, {Component} from 'react';


class IDPWSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : '',
           name : '',
           email1 : '',
           email2 : '',
           phone1 : '',
           phone2 : '',
           phone3 : '',
        };
        this.openSearcher();

    }
    openSearcher = () => {  //props로 함수 받아서 실행 url
        let win = window.open("http://localhost:3000/testys", "", "height=810px, width=572px");
       
        
    }
    componentDidMount(){
     
    }
    render(){  
 
       
        
        return (
        <section class="member-wrap" > 
            <section className="join-form-wrap">
                <form name="form1" action="?tpf=member/process" method="post">
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
                                    <td><input type="text" name="name" /></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">이메일</th>
                                    <td><input type="text" name="email" placeholder="id@genergy.com" onChange={this.state.name}/></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">연락처</th>
                                    <td><input type="text" name="phone" placeholder="'-' 빼고 입력"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
        
                <p className="join-btn-wrap">
                    <a href="/" className="btn-cancel">취소</a>
                    <a href="#none" onclick="findId()" class="btn-confirm">아이디 찾기</a>
                </p>
                <form name="form2" action="?tpf=member/process" method="post">
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
                                    <td><input type="text" name="id"/></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">이름</th>
                                    <td><input type="text" name="name"/></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">이메일</th>
                                    <td><input type="text" name="email" placeholder="id@genergy.com"/></td>
                                </tr>
                                <tr className="join-form-name">
                                    <th scope="row">연락처</th>
                                    <td><input type="text" name="phone" placeholder="'-' 빼고 입력"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </form>
        
                <p className="join-btn-wrap">
                    <a href="/" className="btn-cancel">취소</a>
                    <a href="#noe" onclick="findPassword();" className="btn-confirm">임시 비밀번호 발급</a>
                </p>
        
            </section>
        </section>
            
            
        ); //return
    } //render 
    
}

export default IDPWSearch;