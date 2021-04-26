import React from 'react';

class CompanyItem extends React.Component {
    render() {
        return (
            // <ul className="content">
            //     <li className="itemName tableName">{this.props.data.object_string}</li>
            //     <li className="itemRev tableRev">{this.props.data.revision_id}</li>
            //     <li className="itemType tableType">{this.props.data.object_type}</li>
            //     <li className="itemMod tableMod">{this.props.data.last_mod_date}</li>
            //     <li className="itemOwner tableOwner">{this.props.data.owning_user}</li>
            // </ul>
            // <ul className="content">
            //     <li className="code">{this.props.data.object_string}</li>
            //     <li className="name">{this.props.data.revision_id}</li>
            //     <li className="desc">{this.props.data.object_type}</li>
            //     <li className="phone">{this.props.data.last_mod_date}</li>
            //     <li className="email">{this.props.data.owning_user}</li>
            //     <li className="delete">{this.props.data.owning_user}</li>
            // </ul>
            <ul className="content">
                <li className="no">1</li>
                <li className="code">0001</li>
                <li className="name">제너지</li>
                <li className="desc">PLM 솔루션 서울 강서구 마곡중앙로 165 안강프라이빗타워 1차 816, 817호</li>
                <li className="phone">02-0000-0000</li>
                <li className="email">admin@genergyplm.com</li>
                <li className="delete">
                    <div className="deleteBtn" onClick={ ()=>{ alert("회사 삭제 버튼 클릭") } }>삭제</div>
                </li>
            </ul>
        );
    }
}

export default CompanyItem;