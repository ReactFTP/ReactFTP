import React from 'react';
import './css/ManagePage.css';
import * as axios from './axios.js';
import Tree from './Tree';
import CompanyItem from './CompanyItem';

class CompanyManage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            companies:[],
            input: ''
        }
    };

    componentWillMount() {
        this.setCompanyList();   
    }

    setCompanyList = async() => {
        var companyList = await axios.getCompanies();
        if(companyList == null){return;}
        const keyList = Object.keys(companyList);
        var myArray2 = new Array(keyList.length -1);
        for (let i = 0; i < keyList.length; i++){
            
            let key = keyList[i];
            if(key!='-'){
                myArray2[i] = companyList[key];
            }
        }
        console.log(myArray2)
        await this.setState({
            companies : myArray2,
        })
    }
   
    mapToComponent =  (input) => {
        return this.state.companies.map((company,i) => {
            if(input == ''){
                return (<CompanyItem data={company}  num={i} key={i}/>)
            }
            if((company.coName.includes(input))){
                return (<CompanyItem data={company}  num={i} key={i}/>)
            }
          
        })
    }  
    
    handleInput = async(e) => {
        await this.setState({
            input : e.target.value
        })
        this.mapToComponent(e.target.value)
    }
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
                                회사 관리
                            </div>
                            <div className="search-wrap">
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="회사이름 검색" maxLength="50"  onChange={this.handleInput}></input>
                                </div>
                                
                            </div>
                            <div className="add-button-wrap" onClick={ ()=> {window.open("http://localhost:3000/addCompany", "사용자 추가", "directories=no,resizable=no,status=no,toolbar=no,menubar=no, height=450px, width=400px"); }}>
                                회사 추가
                            </div>
                            <div className="search-list-wrap">
                                <ul className="tableHead">
                                    {/* <li className="tableName">회사코드</li>
                                    <li className="tableRev">회사명</li>
                                    <li className="tableType">회사 설명</li>
                                    <li className="tableMod">대표 번호</li>
                                    <li className="tableOwner">이메일</li>
                                    <li className="tableDelete">삭제</li> */}
                                    <li className="no">no</li>
                                    <li className="name">회사명</li>
                                    <li className="desc">회사 설명</li>
                                    <li className="phone">대표 번호</li>
                                    <li className="email">이메일</li>
                                    <li className="delete">삭제</li>
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

export default CompanyManage;