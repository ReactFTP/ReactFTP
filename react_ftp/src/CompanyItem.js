import React from 'react';
import * as axios from './axios.js';

class CompanyItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num : this.props.num,
            companies : this.props.data
        }
    }

    deleteCompany = async(coId) => {
        let result  = await axios.deleteCompany(coId);
        if(result =='회사 삭제완료'){
            alert(result);
            window.location.reload();
        }else{
            alert('회사 삭제 실패');
            return;
        }

            
    }
        
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
                <li className="no">   {this.state.num}</li>
                <li className="name">{this.props.data.coName}</li>
                <li className="desc">{this.props.data.coDesc}</li>
                <li className="phone">{this.props.data.coPhone}</li>
                <li className="email">{this.props.data.email}</li>
                <li className="delete">
                    <div className="deleteBtn" onClick={()=>{ this.deleteCompany(this.props.data.coId)}}>삭제</div>
                </li>
            </ul>
        );
    }
}

export default CompanyItem;