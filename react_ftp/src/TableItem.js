import React from 'react';

class TableItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const itemClick = () => {
            if(this.props.data.ftype == '폴더'){
                this.props.setTreeItem(this.props.data);
                this.props.getContents(this.props.data);
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