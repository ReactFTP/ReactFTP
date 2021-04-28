import React from 'react';
import TableItem from './TableItem';
// import CompanyItem from './CompanyItem';
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

        const deleteFile = async(data) => {
            if(data.ftype == "폴더") {
                alert("폴더 삭제 호출!");
            }
            else {
                alert("파일 삭제 호출!");
            }
            // const result = window.confirm("아이템을 정말로 삭제하시겠습니까?\n선택된 아이템 : " + data.object_string);
            // if(result){
            //     await Promise.all([
            //         axios.deleteItem(data.uid)
            //     ])
            //     afterDeleteItem(data);
            // }
        };

        const modifyFile = async(data) => {
            if(data.ftype == "폴더") {
                alert("폴더 수정 호출!");
            }
            else {
                alert("파일 수정 호출!");
            }
            // let name = prompt("선택한 아이템 : " + data.object_string + "\n변경할 아이템명 입력");
            // if(name==null)
            //     return;
            // while(name==""){
            //     alert("변경할 아이템명은 필수 입력사항 입니다.");
            //     name = prompt("선택한 아이템 : " + data.object_string + "\n변경할 아이템명 입력");
            // }
            // await Promise.all([
            //     axios.modifyItem(data.uid, name)
            // ]);

            // let parent = this.props.selectedTreeData;
            // const info = await Promise.all([
            //     axios.searchContentsItem(parent.uid)
            // ]);
            // parent.contents_Item = info[0];

            // this.props.setTreeItem(parent);
        };

        const downloadFile = async(data) => {
            if(data.ftype == "폴더") {
                alert("폴더 다운로드 호출!");
            }
            else {
                alert("파일 다운로드 호출!");
            }
            // const result = window.confirm("아이템 리비전을 개정합니다.\n선택된 아이템 : " + data.object_string);
            // if(result){
            //     await Promise.all([
            //         axios.reviseItem(data.uid)
            //     ]);

            //     let parent = this.props.selectedTreeData;
            //     const info = await Promise.all([
            //         axios.searchContentsItem(parent.uid)
            //     ]);
            //     parent.contents_Item = info[0];
    
            //     this.props.setTreeItem(parent);
            // }
        };

        const uploadFile = async(data) => {
            alert("파일 업로드 호출!");
        };

        const mapToComponent = (fileList) => {
            if(fileList == undefined)
                return;
            
            return fileList.map((content, i) => {
                console.log(content.fname + content.ftype);
                if(content.ftype == "폴더"){
                    return (
                        <>
                            <ContextMenuTrigger id={content.fid} >
                                <TableItem data={content} key={i} />
    
                                <ContextMenu id={content.fid}>
                                    <MenuItem data={content} onClick={ () => { modifyFile(content) } }>
                                        폴더 수정
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { deleteFile(content) } }>
                                        폴더 삭제
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { downloadFile(content) } }>
                                        압축 다운로드
                                    </MenuItem>
                                </ContextMenu>
                            </ContextMenuTrigger>
                        </>
                    );
                }
                else {
                    return (
                        <>
                            <ContextMenuTrigger id={content.fid + '파일'} >
                                <TableItem data={content} key={i} />
    
                                <ContextMenu id={content.fid + '파일'}>
                                    <MenuItem data={content} onClick={ () => { modifyFile(content) } }>
                                        파일 수정
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { deleteFile(content) } }>
                                        파일 삭제
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { downloadFile(content) } }>
                                        파일 다운로드
                                    </MenuItem>
                                </ContextMenu>
                            </ContextMenuTrigger>
                        </>
                    );
                }
            });
        }

        return (
            <div className="browser-wrap item-wrap">
                <div className="selected-path-wrap">
                    선택한 폴더 : {this.props.selectedTreeData.fname}
                </div>
                <ul className="tableHead">
                    <li className="fileName">파일명</li>
                    <li className="lastModDate">수정된 날짜</li>
                    <li className="type">타입</li>
                    <li className="size">크기</li>
                </ul>
                {mapToComponent(this.props.data)}
                <ContextMenuTrigger id='empty' >
                empty
                    <ContextMenu id='empty'>
                        <MenuItem data={this.props.data.selectedTreeData} onClick={ () => { this.props.createFolder(this.props.data.selectedTreeData) } }>
                            폴더 생성
                        </MenuItem>
                        <MenuItem data={this.props.data.selectedTreeData} onClick={ () => { uploadFile(this.props.data.selectedTreeData) } }>
                            파일 업로드
                        </MenuItem>
                    </ContextMenu>
                </ContextMenuTrigger>
            </div>
        );
    }
}

export default Table;