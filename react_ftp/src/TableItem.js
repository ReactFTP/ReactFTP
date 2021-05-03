import React from 'react';

class TableItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const itemClick = () => {
            if(this.props.data.ftype == '폴더'){
                if(this.props.authCheckFolder(this.props.data)){
                    this.props.setTreeItem(this.props.data);
                    this.props.getContents(this.props.data);
                }else
                    alert("폴더 접근 권한이 없습니다.\n\n대상 : " + this.props.data.fname);
            }
            else
                this.props.setTableItem(this.props.data);
        }

        return (
            <ul className="content data" onClick={ () => { itemClick() } }>
                <li className="fileName">{this.props.data.fname}</li>
                <li className="lastModDate">{this.props.data.fdate}</li>
                <li className="type">{this.props.data.ftype}</li>
                <li className="size">{this.props.data.fsize}</li>
            </ul>
        );
    }
}

export default TableItem;