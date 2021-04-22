import React from 'react';

class TableItem extends React.Component {
    render() {
        return (
            <ul className="content">
                <li className="itemName tableName">{this.props.data.object_string}</li>
                <li className="itemRev tableRev">{this.props.data.revision_id}</li>
                <li className="itemType tableType">{this.props.data.object_type}</li>
                <li className="itemMod tableMod">{this.props.data.last_mod_date}</li>
                <li className="itemOwner tableOwner">{this.props.data.owning_user}</li>
            </ul>
        );
    }
}

export default TableItem;