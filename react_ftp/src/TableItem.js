import React from 'react';

class TableItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="content" onClick={ () => { this.props.setTableItem(this.props.data) } }>
                <li className="fileName">{this.props.data.fname}</li>
                <li className="lastModDate">{this.props.data.fdate}</li>
                <li className="type">{this.props.data.ftype}</li>
                <li className="size">{this.props.data.fsize}</li>
            </ul>
        );
    }
}

export default TableItem;