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
            }
        };
    }

    componentWillMount() {
        // if(window.sessionStorage.getItem('sessionId')==undefined 
        //     || window.sessionStorage.getItem('homeUid')==undefined){
        //     this.props.history.push('/');
        //     alert("로그인이 필요합니다.");
        //     return;
        // }
        window.sessionStorage.setItem('sessionId', 'administrator');
        this.setState({
            sessionId : window.sessionStorage.getItem('sessionId')
        });

        // console.log("this.props.uid : " + 
        //     window.sessionStorage.getItem('homeUid'));
        this.getHome();
    }

    // 처음 로딩되면서 홈 contents 가져옴
    getHome = async() => {
        const info = await Promise.all([
            // axios.getHomeContents_BK(window.sessionStorage.getItem('homeUid'))
            axios.getHomeContents_BK()
        ]);

        console.log(info[0]);

        this.setState({
            data : info[0]
        }, () => {
            // alert("FTP 홈 폴더 로딩 완료");
        });
    }

    // logout = () => {
    //     this.props.history.push('/');
    // }

    render () {
        //let contentsFolder = this.state.selectedTreeItem;

        return (
            //<div className="Home" onLoad={ this.HomedataLoad }>
            <div className="Home">
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
                            <div className="my-infomation-wrap" onClick={ ()=>{  } }>
                                <span>내 정보 관리</span>
                            </div>
                        </div>
                        <div className="user-info-wrap">
                            <div className="logout-button-wrap" onClick={ ()=>{ alert("로그아웃 버튼 클릭!") } }>
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
                            <Tree data={this.state.data} />
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