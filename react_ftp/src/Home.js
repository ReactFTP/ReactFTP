import React from 'react';
import './css/Home.css';
import * as axios from './axios';
import Tree from './Tree';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sessionId : undefined,
            selectedTreeItem : "REACT FTP",
            data : {
                fid: "0", 
                fname: "REACT FTP", 
                folderList: [], 
                fileList: []
            },
            userInfo : {},
        };
    }

    componentWillMount() {
        if(window.sessionStorage.getItem('sessionId')==undefined){
            this.props.history.push('/');
            alert("로그인이 필요합니다.");
            return;
        }
        
        this.setState({
            sessionId : window.sessionStorage.getItem('sessionId'),
            userInfo : {
                roleId : window.sessionStorage.getItem('roleId'),
                authId : window.sessionStorage.getItem('authId'),
                coId : window.sessionStorage.getItem('coId'),
            },
        });

        console.log("componentWillmount() 호출");
        this.getHome();
    }

    // 처음 로딩되면서 홈 contents 가져옴
    getHome = async() => {
        const info = await Promise.all([
            axios.ftpConnect(window.sessionStorage.getItem('sessionId'))
        ]);

        console.log(info[0]);

        this.setState({
            data : info[0]
        });
    }

    logout = () => {
        this.props.history.push('/');
    }

    render () {
        return (
            <div className="Home">
                <header>
                    <div className="header-wrap">
                        <div className="logo-wrap">
                            <img src={process.env.PUBLIC_URL + '/logo.png'} onClick={()=>{ this.props.history.push('/home') }} />
                        </div>
                        <div className="top-menu-wrap">
                            <div className={this.state.userInfo.roleId=='a'?'company-manage-wrap':'sessionNone'} onClick={ ()=>{ this.props.history.push('/companymanage') } }>
                                <span>회사 관리</span>
                            </div>
                            <div className={this.state.userInfo.roleId=='u'?'sessionNone':'user-manage-wrap'} onClick={ ()=>{ this.props.history.push('/usermanage') } }>
                                <span>사용자 관리</span>
                            </div>
                            <div className={this.state.userInfo.roleId=='a'?'sessionNone':'my-infomation-wrap'} onClick={ ()=>{ this.props.history.push('/userinfo') } }>
                                <span>내 정보 관리</span>
                            </div>
                        </div>
                        <div className="user-info-wrap">
                            <div className="logout-button-wrap" onClick={ ()=>{ this.props.history.push('/') } }>
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
                                홈
                            </div>
                            <Tree data={this.state.data} userInfo={this.state.userInfo}/>
                        </section>
                        <footer>
                            <div className="copyright-wrap">copyright-wrap</div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;