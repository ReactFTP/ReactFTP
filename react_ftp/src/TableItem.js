import React from 'react';

class TableItem extends React.Component {
    render() {
        return (
            <ul className="content">
                <li className="fileName">{this.props.data.fname}</li>
                <li className="lastModDate">{this.props.data.fdate}</li>
                <li className="type">{this.props.data.ftype}</li>
                <li className="size">{this.props.data.fsize}</li>
            </ul>
        );
    }
}

export default TableItem;