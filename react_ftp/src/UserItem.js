import React from 'react';

class UserItem extends React.Component {
    render() {
        return (
            <ul className="content">
                <li className="no">1</li>
                <li className="com">제너지</li>
                <li className="user_id">test_id</li>
                <li className="user_name">테스터</li>
                <li className="email">test@genergyplm.com</li>
                <li className="phone">010-0000-0000</li>
                {/* <li className="auth">A</li>
                <li className="role">user</li>
                <li className="joined_check">2021-04-26</li> */}
                <li className="active">활성</li>
                <li className="manage">
                    <div className="manageBtn" onClick={ ()=>{ alert("사용자 관리 버튼 클릭") } }>관리</div>
                </li>
                <li className="delete">
                    <div className="deleteBtn" onClick={ ()=>{ alert("사용자 삭제 버튼 클릭") } }>삭제</div>
                </li>
            </ul>
        );
    }
}

export default UserItem;