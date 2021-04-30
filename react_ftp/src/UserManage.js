import React from 'react';
import './css/ManagePage.css';

// import * as axios from './axios';
import Tree from './Tree';
import UserItem from './UserItem';

class CompanyManage extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         sessionId : undefined,
    //         selectedTreeItem : "Home",
    //         data : {
    //             uid: "", 
    //             contents_Item: [], 
    //             object_string: "", 
    //             contents_Folder: []
    //         }
    //     };
    // }

    componentWillMount() {
        const sessionRole = window.sessionStorage.getItem('roleId');
        
        // if(sessionRole == 'u' || sessionRole == undefined){
        if(sessionRole == 'u'){
            alert("잘못된 접근입니다.")
            this.props.history.push('/home');
        }

        // this.setState({
        //     sessionId : window.sessionStorage.getItem('sessionId')
        // });

        // console.log("this.props.uid : " + 
        //     window.sessionStorage.getItem('homeUid'));
        // this.getHome();
    }

    // 처음 로딩되면서 홈 contents 가져옴
    // getHome = async() => {
    //     const info = await Promise.all([
    //         axios.getHomeContents(window.sessionStorage.getItem('homeUid'))
    //     ]);

    //     this.setState({
    //         data : info[0]
    //     }, () => {
    //         alert("TC 홈 폴더 로딩 완료");
    //         console.log("첫 로딩 후 data.object_string : " + this.state.data.object_string);
    //     });
    // }

    logout = () => {
        this.props.history.push('/');
    }

    render () {
        // const sessionRole = window.sessionStorage.getItem('roleId');
        const sessionRole = 'm';

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
                            <div className={sessionRole=='m'?'my-infomation-wrap':'sessionNone'} onClick={ ()=>{  } }>
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
                <div className="main-container">
                    <div className="main-wrap">
                        <section className="browser-section-wrap">
                            <div className="title-wrap">
                                사용자 관리
                            </div>
                            <div className={sessionRole=='a'?'search-wrap administrator':'sessionNone'}>
                                <div className="search-select-company-wrap">
                                    <select name="company">
                                        {

                                        }
                                        <option value="">회사 선택</option>
                                        <option value="">임시회사1</option>
                                        <option value="">임시회사2</option>
                                    </select>
                                </div>
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="사용자 이름 검색" maxLength="50"></input>
                                </div>
                                <div className="search-button-wrap" onClick={ ()=>{ alert("회사 검색 버튼 클릭") } }>
                                    검 색
                                </div>
                            </div>
                            <div className={sessionRole=='m'?'search-wrap':'sessionNone'}>
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="사용자 이름 검색" maxLength="50"></input>
                                </div>
                                <div className="search-button-wrap" onClick={ ()=>{ alert("회사 검색 버튼 클릭") } }>
                                    검 색
                                </div>
                            </div>
                            <div className="add-button-wrap u" onClick={ ()=>{ alert("회사 추가 버튼 클릭") } }>
                                사용자 추가
                            </div>
                            <div className="search-list-wrap">
                                <div className="search-count-wrap">
                                    조회된 직원 수 : 
                                </div>
                                <ul className="tableHead">
                                    <li className="no"></li>
                                    <li className="com">소속회사</li>
                                    <li className="user_id">아이디</li>
                                    <li className="user_name">이름</li>
                                    <li className="email">이메일</li>
                                    <li className="phone">연락처</li>
                                    {/* <li className="auth">권한</li>
                                    <li className="role">역할</li>
                                    <li className="joined-date">승인일</li> */}
                                    <li className="active">활성 상태</li>
                                    <li className="manage"></li>
                                    <li className="delete"></li>
                                    {/* 
                                    // admin : 소속회사, 아이디, 이름, 이메일, 연락처, 권한, 역할, 승인여부, 활성화여부, 삭제
                                    //              기본주소, 상세주소, 회원가입일, 승인일
                                    // manager : 아이디, 이름, 권한, 역할, 승인여부, 활성화여부, 삭제
                                    // 아이디, 패스워드, 이름, 메일, 연락처, 기본주소, 상세주소, 회사명(회사코드), 권한, 역할, 가입일, 승인여부, 활성화여부, 가입승인일, 실패횟수
                                    */}
                                </ul>
                                <UserItem />
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

export default CompanyManage;