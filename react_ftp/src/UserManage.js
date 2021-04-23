import React from 'react';
import './css/ManagePage.css';

// import * as axios from './axios';
import Tree from './Tree';
import TableItem from './CompanyTableItem';

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
        // if(window.sessionStorage.getItem('sessionId')==undefined 
        //     || window.sessionStorage.getItem('homeUid')==undefined){
        //     this.props.history.push('/');
        //     alert("로그인이 필요합니다.");
        //     return;
        // }

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

    // logout = () => {
    //     this.props.history.push('/');
    // }

    render () {
        //let contentsFolder = this.state.selectedTreeItem;

        return (
            <div className="Manage">
                <header>
                    <div className="header-wrap">
                        <div className="logo-wrap">
                            <img src={process.env.PUBLIC_URL + '/logo.png'} onClick={()=>{ this.props.history.push('/home') }} /> 
                        </div>
                        <div className="top-menu-wrap">
                            <div className="company-manage-wrap" onClick={ ()=>{ this.props.history.push('/companymanage') } }>
                                <span>회사 관리</span>
                            </div>
                            <div className="user-manage-wrap" onClick={ ()=>{ this.props.history.push('/usermanage') } }>
                                <span>사용자 관리</span>
                            </div>
                            {/* <div className="my-infomation-wrap" onClick={ ()=>{  } }>
                                <span>내 정보 관리</span>
                            </div> */}
                            <div className="sessionNone" onClick={ ()=>{  } }>
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
                            <div className="search-wrap administrator">
                                <div className="search-select-company-wrap">
                                    <select name="company">
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
                            <div className="search-wrap">
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
                                    {/* <li className="tableName">회사코드</li>
                                    <li className="tableRev">회사명</li>
                                    <li className="tableType">회사 설명</li>
                                    <li className="tableMod">대표 번호</li>
                                    <li className="tableOwner">이메일</li>
                                    <li className="tableDelete">삭제</li> */}
                                    <li className="no"></li>
                                    <li className="code">회사코드</li>
                                    <li className="name">회사명</li>
                                    <li className="desc">회사 설명</li>
                                    <li className="phone">대표 번호</li>
                                    <li className="email">이메일</li>
                                    <li className="delete"></li>
                                </ul>
                                <TableItem />
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