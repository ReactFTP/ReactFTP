import React from 'react';
import './css/ManagePage.css';

import * as axios from './axios.js';
import Tree from './Tree';
import UserItem from './UserItem.js';

class UserManage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            members:[],
            input:'',
            many:0,
            companies:[],
            company:'',
        }
    };
    

    componentWillMount() {
        const sessionRole = window.sessionStorage.getItem('roleId');
        
        // if(sessionRole == 'u' || sessionRole == undefined){
        if(sessionRole == 'u'){
            alert("잘못된 접근입니다.")
            this.props.history.push('/home');
        }
        if(sessionRole == 'm'||sessionRole == 'a'){
            this.setMemberList();   
        }
        

     
    }

  
    logout = () => {
        this.props.history.push('/');
    }

    handleInput = async(e) => {
        await this.setState({
            input : e.target.value
        })
        this.mapToComponent(e.target.value)
    }
    setMemberList = async() => {
        var memberList = await axios.getUserInCompany(window.sessionStorage.getItem('coId'));
        await this.setState({
            members : memberList,
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    getCompanyList = async() => {
        //<option value="">회사 선택</option>
        var allCom = await axios.getCompanies();
        if(allCom == null){return;}
        const keyList = Object.keys(allCom);
        var myArray2 = new Array(keyList.length);
        for (let i = 0; i < keyList.length; i++){
            let key = keyList[i];
            myArray2[i] = allCom[key];
        }
        console.log(myArray2)
        await this.setState({
            companies: myArray2,
        })
        console.log('스테이트 변경')
    }
    mapToComponent =  (input) => {
        

         return this.state.members.map( (member, i) => {
                 if(member.roleId == 'a'){
                     return;
                 }
                 if((member.memberId.includes(input) || member.memberName.includes(input)) && window.sessionStorage.getItem('roleId') == 'm' ){
                    return (<UserItem data={member} num ={i} key={i} />);
                 }

                 if((member.memberId.includes(input) || member.memberName.includes(input)) && window.sessionStorage.getItem('roleId') == 'a' && member.coId == this.state.company ){
                    return (<UserItem data={member} num ={i} key={i} />);
                 }
                 if(input == ''&& this.state.company ==''){
                    return (<UserItem data={member} num ={i} key={i} />);
                 }

                 if((member.memberId.includes(input) || member.memberName.includes(input))&& this.state.company ==''){
                    return (<UserItem data={member} num ={i} key={i} />);
                 }
              
                 if(input == '' && window.sessionStorage.getItem('roleId') == 'a' &&  member.coId == this.state.company){
                    return (<UserItem data={member} num ={i} key={i} />);
                 }
            
            
             }  
         );
        
    }
    render () {
        const sessionRole = window.sessionStorage.getItem('roleId');
        // const sessionRole = 'u';
        
        return (
            <div className="Manage">
                <header>
                    <div className="header-wrap">
                        <div className="logo-wrap">
                            <img src={process.env.PUBLIC_URL + '/logo.png'} onClick={()=>{ this.props.history.push('/home') }} /> 
                        </div>
                        <div className="top-menu-wrap">
                            <div className={sessionRole=='a'?'company-manage-wrap':'sessionNone'} onClick={ ()=>{ this.props.history.push('/companymanage') } }>
                                <span>회사 관리</span>
                            </div>
                            <div className="user-manage-wrap" onClick={ ()=>{ this.props.history.push('/usermanage') } }>
                                <span>사용자 관리</span>
                            </div>
                            <div className={sessionRole=='m'?'my-infomation-wrap':'sessionNone'} onClick={ ()=>{ this.props.history.push('/userinfo') } }>
                                <span>내 정보 관리</span>
                            </div>
                        </div>
                        <div className="user-info-wrap">
                            <div className="logout-button-wrap" onClick={this.logout}>
                                로그아웃
                            </div>
                            <div className="user-id-wrap">
                                {window.sessionStorage.getItem("sessionId")} 님
                            </div>
                        </div>
                    </div>
                </header>
                <div className="main-container" >
                    <div className="main-wrap" >
                        <section className="browser-section-wrap">
                            <div className="title-wrap">
                                사용자 관리
                            </div>
                            <div className={sessionRole=='a'?'search-wrap administrator':'sessionNone'}>
                                <div className="search-select-company-wrap">
                                    <select name="company" onClick={this.getCompanyList}  onChange={this.onChange}>
                                        <option value="" selected>전체</option>
                                        {
                                          this.state.companies.map((company, i) => {
                                              if(company.coId == '-'){return;}
                                              return(
                                                <option value={company.coId}>{company.coName}</option>
                                                );
                                          })  
                                        }
                                    </select>
                                </div>
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="사용자 이름 또는 아이디 검색" maxLength="50" onChange={this.handleInput}></input>
                                </div>
                            </div>
                            <div className={sessionRole=='m'?'search-wrap':'sessionNone'}>
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="사용자 이름 또는 아이디 검색" maxLength="50" onChange={this.handleInput}></input>
                                </div>
                           
                            </div>
                            <div className="add-button-wrap u" onClick={ ()=>{ window.open("http://localhost:3000/directsignup", "사용자 추가", "directories=no,resizable=no,status=no,toolbar=no,menubar=no, height=600px, width=400px"); } }>
                                사용자 추가
                            </div>
                            <div className="search-list-wrap">
                                {/* <div className="search-count-wrap">
                                    조회된 직원 수 : {this.props.num + 1}
                                </div> */}
                                <ul className="tableHead">
                                    <li className="no">NO</li>
                                    <li className="com">소속회사</li>
                                    <li className="user_id">아이디</li>
                                    <li className="user_name">이름</li>
                                    <li className="email">이메일</li>
                                    <li className="phone">연락처</li>
                                    <li className="auth">권한</li>
                                    <li className="role">역할</li>                                
                                    <li className="active">활성 상태</li>
                                    <li className="manage">가입</li>
                                    {/* 
                                    // admin : 소속회사, 아이디, 이름, 이메일, 연락처, 권한, 역할, 승인여부, 활성화여부, 삭제
                                    //              기본주소, 상세주소, 회원가입일, 승인일
                                    // manager : 아이디, 이름, 권한, 역할, 승인여부, 활성화여부, 삭제
                                    // 아이디, 패스워드, 이름, 메일, 연락처, 기본주소, 상세주소, 회사명(회사코드), 권한, 역할, 가입일, 승인여부, 활성화여부, 가입승인일, 실패횟수
                                    */}
                                </ul>
                                {this.mapToComponent(this.state.input)}
                            </div>
                        </section>
                    </div>
                    <footer>
                        <div className="copyright-wrap">copyright-wrap</div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default UserManage;