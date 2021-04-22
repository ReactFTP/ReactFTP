import React from 'react';
import TableItem from './TableItem';
// import * as axios from './axios';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 부모 node 의 contents_Item 배열에서 삭제 대상 content 를 제외해주는 기능
        // const afterDeleteItem = (data) => {
        //     let parent = this.props.selectedTreeData;
        //     parent.contents_Item = parent.contents_Item.filter(content => content.uid != data.uid);
        //     this.props.setTreeItem(parent);
        // }

        // const deleteItem = async(data) => {
        //     const result = window.confirm("아이템을 정말로 삭제하시겠습니까?\n선택된 아이템 : " + data.object_string);
        //     if(result){
        //         await Promise.all([
        //             axios.deleteItem(data.uid)
        //         ])
        //         afterDeleteItem(data);
        //     }
        // };

        // const modifyItem = async(data) => {
        //     let name = prompt("선택한 아이템 : " + data.object_string + "\n변경할 아이템명 입력");
        //     if(name==null)
        //         return;
        //     while(name==""){
        //         alert("변경할 아이템명은 필수 입력사항 입니다.");
        //         name = prompt("선택한 아이템 : " + data.object_string + "\n변경할 아이템명 입력");
        //     }
        //     await Promise.all([
        //         axios.modifyItem(data.uid, name)
        //     ]);

        //     let parent = this.props.selectedTreeData;
        //     const info = await Promise.all([
        //         axios.searchContentsItem(parent.uid)
        //     ]);
        //     parent.contents_Item = info[0];

        //     this.props.setTreeItem(parent);
        // };

        // const reviseItem = async(data) => {
        //     const result = window.confirm("아이템 리비전을 개정합니다.\n선택된 아이템 : " + data.object_string);
        //     if(result){
        //         await Promise.all([
        //             axios.reviseItem(data.uid)
        //         ]);

        //         let parent = this.props.selectedTreeData;
        //         const info = await Promise.all([
        //             axios.searchContentsItem(parent.uid)
        //         ]);
        //         parent.contents_Item = info[0];
    
        //         this.props.setTreeItem(parent);
        //     }
        // };

        // const mapToComponent = (data) => {
        //     if(data == undefined)
        //         return;
            
        //     return data.map((content, i) => {
        //         return (
        //             <>
        //                 <ContextMenuTrigger id={content.uid} >
        //                     {/* <TreeItem key={content.uid} nodeId={content} label={content.object_string} children={ children } data={this.props.data} onClick={()=>{setTreeItem(content)}}
        //                     /> */}
        //                     <TableItem data={content} key={i} />

        //                     <ContextMenu id={content.uid}>
        //                         <MenuItem data={content} onClick={ () => {deleteItem(content)} }>
        //                             아이템 삭제
        //                         </MenuItem>
        //                         <MenuItem data={content} onClick={ () => {modifyItem(content)} }>
        //                             아이템 변경
        //                         </MenuItem>
        //                         <MenuItem data={content} onClick={ () => {reviseItem(content)} }>
        //                             아이템 개정
        //                         </MenuItem>
        //                     </ContextMenu>
        //                 </ContextMenuTrigger>
        //             </>
        //         );
        //     });
        // }

        return (
            <div className="browser-wrap item-wrap">
                <div className="selected-path-wrap">
                    선택한 폴더 : {this.props.selectedTreeData.object_string}
                </div>
                <ul className="tableHead">
                    <li className="tableName">이름</li>
                    <li className="tableRev">리비전</li>
                    <li className="tableType">타입</li>
                    <li className="tableMod">마지막 수정일</li>
                    <li className="tableOwner">소유자</li>
                </ul>
                {/* {mapToComponent(this.props.data)} */}
            </div>
        );
    }
}

export default Table;