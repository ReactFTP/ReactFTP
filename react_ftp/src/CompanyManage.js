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
   
    logout = () => {
        this.props.history.push('/');
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

    logout = () => {
        this.props.history.push('/');
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
                                <span>?????? ??????</span>
                            </div>
                            <div className="user-manage-wrap" onClick={ ()=>{ this.props.history.push('/usermanage') } }>
                                <span>????????? ??????</span>
                            </div>
                        </div>
                        <div className="user-info-wrap">
                            <div className="logout-button-wrap" onClick={this.logout}>
                                ????????????
                            </div>
                            <div className="user-id-wrap">
                                {window.sessionStorage.getItem("sessionId")} ???
                            </div>
                        </div>
                    </div>
                </header>
                <div className="main-container">
                    <div className="main-wrap">
                        <section className="browser-section-wrap">
                            <div className="title-wrap">
                                ?????? ??????
                            </div>
                            <div className="search-wrap">
                                <div className="search-input-wrap">
                                    <input type="text" placeholder="???????????? ??????" maxLength="50"  onChange={this.handleInput}></input>
                                </div>
                                
                            </div>
                            <div className="add-button-wrap" onClick={ ()=> {window.open("http://localhost:3000/addCompany", "????????? ??????", "directories=no,resizable=no,status=no,toolbar=no,menubar=no, height=450px, width=400px"); }}>
                                ?????? ??????
                            </div>
                            <div className="search-list-wrap">
                                <ul className="tableHead">
                                    {/* <li className="tableName">????????????</li>
                                    <li className="tableRev">?????????</li>
                                    <li className="tableType">?????? ??????</li>
                                    <li className="tableMod">?????? ??????</li>
                                    <li className="tableOwner">?????????</li>
                                    <li className="tableDelete">??????</li> */}
                                    <li className="no">no</li>
                                    <li className="name">?????????</li>
                                    <li className="desc">?????? ??????</li>
                                    <li className="phone">?????? ??????</li>
                                    <li className="email">?????????</li>
                                    <li className="delete">??????</li>
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