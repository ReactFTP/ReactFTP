
import * as axios from './axios.js';
import React from 'react';

class UserItem extends React.Component {
    constructor(props){
        super(props);
    }
        
    handleRow = (e) => {
        window.open("http://localhost:3000/userinfoformanager?"+e.memberId, "회원정보확인", "directories=no,resizable=no,status=no,toolbar=no,menubar=no, height=570px, width=400px");
    }

  
    render() {
        console.log('userITem 진입')
        console.log(this.props)
        return (
            <ul className="content">
                <li className="no"> <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                    {this.props.num}
                    </div>
                    </li>
                <li className="com"> <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                    {this.props.data.coId}
                    </div>    
                </li>               
                <li className="user_id">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                        {this.props.data.memberId}
                    </div>
                </li>
                <li className="user_name">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                        {this.props.data.memberName}</div></li>
                <li className="email">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                        {this.props.data.email}
                    </div>        
                </li>
                <li className="phone">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>
                        {this.props.data.memberPhone}
                    </div>
                </li>
                {/* <li className="auth">A</li>
                <li className="role">user</li>
                <li className="joined_check">2021-04-26</li> */}
                <li className="auth">
                <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>{this.props.data.authId=='a'?'A class':
                                                                                                                this.props.data.authId=='b'?'B class':
                                                                                                                    'C class'}</div>
                </li>
                <li className="role">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) } }>{this.props.data.roleId=='a'?'Administrator':
                                                                                                        this.props.data.roleId=='m'?'Manager':
                                                                                                            'User'}</div>
                </li>
                <li className="manage">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) }}>{this.props.data.activeCheck}</div>
                </li>
                <li className="manage">
                    <div className="manageBtn" onClick={ ()=>{ this.handleRow(this.props.data) }}>{this.props.data.joinedCheck=='Y'?'':
                                                                                                        (window.sessionStorage.getItem('roleId')=='m'&&this.props.data.roleId=='u')?'요청':
                                                                                                            (window.sessionStorage.getItem('roleId')=='a'&&this.props.data.roleId=='m')?'요청':
                                                                                                                ''}</div>
                </li>
            </ul>
        );
    }
}

export default UserItem;