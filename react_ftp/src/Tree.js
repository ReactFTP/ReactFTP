import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';


import * as axios from './axios';
import Table from './Table';

class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData : this.props.data,
            parentData : this.props.data,
            storage : [this.props.data],
        };
    }

    render () {     
        // const [expanded, setExpanded] = useState([]);
        // const [selected, setSelected] = useState([]);
        const classes = () => {
            makeStyles({   
                root: {
                    height: 216,
                    flexGrow: 1,
                    maxWidth: 400
                }
            });
        }

        const handleToggle = (nodeIds) => {
            this.setState({
                expanded : nodeIds
            })
        };

        const handleSelect = (nodeIds) => {
            this.setState({
                selected : nodeIds,
            })
        };

        const setTreeItem = (data) => { // {fid, fname, folderList, fileList}
            if(data.folderList.length > 0){
                this.setState({
                    parentData : data,
                })
            }
            this.setState({
                selectedData : data
            })
        }

        // storage state 에 찾으려는 fid 데이터가 있는지 검사.
        // 없으면 서버에서 데이터 요청 후 getContents() 메소드를 통해 storage 에 데이터 추가
        // const seekToStorage = (data) => {
        //     const result = this.state.storage.filter(storageData => storageData.fid == data.fid);

        //     if(result){
        //         if(result.length > 0)
        //             return false;
        //         else
        //             return true;
        //     }
        // }

        const getContents = async(selected) => {    // {fid, fname, folderList, fileList}
            // if(seekToStorage(selected)){    // 저장된 데이터가 없다면
            const info = await Promise.all([
                axios.getContents(selected.fid)
            ]); // {uid, object_string, contents_Item[], contents_Folder[]}
            //selected = info[0];   // 이렇게 하니까 안됐음.
            selected.folderList = info[0].folderList;
            selected.fileList = info[0].fileList;
            
            // let storage = this.state.storage;
            // this.setState({
            //     storage:storage.concat(selected)
            // });
            // }
            setTreeItem(selected);
        }

        const createFolder = async(selected) => {
            alert("폴더 생성 호출!");
            let name = prompt("새 폴더명 입력");
            if(name==null)
                return;
            while(name==""){
                alert("폴더명은 필수 입력사항 입니다.");
                name = prompt("새 폴더명 입력");
            }
            const info = await Promise.all([    // map 
                axios.createFolder(selected.fid, name)
            ]);
            getContents(selected);

            // selected.folderList = selected.folderList.concat(info[0]);

            // 트리에는 추가 반영 되지만 테이블에는 추가 반영 안됨.
            setTreeItem(selected);
            // let name = prompt("새 폴더명 입력");
            // if(name==null)
            //     return;
            // while(name==""){
            //     alert("폴더명은 필수 입력사항 입니다.");
            //     name = prompt("새 폴더명 입력");
            // }
            // let desc = prompt("폴더 설명 입력");
            // const info = await Promise.all([    // map 
            //     axios.createComponent(selected.uid, "", name, desc)
            // ]);
            // selected.contents_Folder = selected.contents_Folder.concat(info[0]);
            // setTreeItem(selected);
        };

        const deleteFolder = async(data) => {
            alert("폴더 삭제 호출!");
            // const result = window.confirm("폴더 내용도 모두 삭제됩니다.\n정말로 삭제하시겠습니까?");
            // if(result){
            //     await Promise.all([
            //         axios.deleteItem(data.uid)
            //     ]);
            //     afterDeleteFolder(data);
            // }
        };

        // 부모 node 의 contents_Folder 배열에서 삭제 대상 content 를 제외하는 기능
        // const afterDeleteFolder = (data) => {

        //     let parent = undefined;
        //     if(data.contents_Folder.length > 0){
        //         const storage = this.state.storage;

        //         storage.map(storageData => {
        //             const tempArray = storageData.contents_Folder.filter(content => content.uid == data.uid);
        //             if(tempArray.length > 0)
        //                 parent = storageData;
        //         })
        //     }
        //     else{
        //         parent = this.state.parentData;
        //     }
        //     parent.contents_Folder = parent.contents_Folder.filter(content => content.uid != data.uid);
        //     setTreeItem(data);
        // }

        const modifyFolder = async(data) => {
            alert("폴더 수정 호출!");
            // let name = prompt("선택한 폴더 : " + data.object_string + "\n변경할 폴더명 입력");
            // if(name==null)
            //     return;
            // while(name==""){
            //     alert("폴더명은 필수 입력사항 입니다.");
            //     name = prompt("선택한 폴더 : " + data.object_string + "\n변경할 폴더명 입력");
            // }
            // await Promise.all([
            //     axios.modifyItem(data.uid, name)
            // ]);

            // data.object_string = name;
            // setTreeItem(data);
        };

/*
        const createItem = async(data) => {
            let id = prompt("새 아이템 ID 입력");
            if(id==null)
                return;
            while(id==""){
                alert("ID는 필수 입력사항 입니다.");
                id = prompt("새 아이템 ID 입력");
            }
            let name = prompt("새 아이템명 입력");
            if(name==null)
                return;
            while(name==""){
                alert("아이템명은 필수 입력사항 입니다.");
                name = prompt("새 아이템명 입력");
            }
            let desc = prompt("아이템 설명 입력");
            const info = await Promise.all([
                axios.createComponent(data.uid, id, name, desc)
            ]);
            data.contents_Item = data.contents_Item.concat(info[0]);
            setTreeItem(data);
        };

        const treeLoad = (contents_Folder) => {
            if(contents_Folder){
                return contents_Folder.map((content, i) => {
                    let children = undefined;
                    if(content.contents_Folder && content.contents_Folder.length > 0){
                        children = treeLoad(content.contents_Folder);
                    }
                    return (
                        <>
                            <ContextMenuTrigger id={content.uid} >
                                <TreeItem key={content.uid} nodeId={content} label={content.object_string} children={ children } selected={this.props.data} onClick={ ()=>{ getContents(content)} }
                                />
                                <ContextMenu id={content.uid}>
                                    <MenuItem data={content} onClick={ () => {createFolder(content)} }>
                                        폴더 생성
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => {deleteFolder(content)} }>
                                        폴더 삭제
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => {modifyFolder(content)} }>
                                        폴더 변경
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => {createItem(content)} }>
                                        아이템 생성
                                    </MenuItem>
                                </ContextMenu>
                            </ContextMenuTrigger>
                        </>
                    );
                });
            }

        }
*/

        const treeLoad = (folderList) => {
            console.log(folderList);
            if(folderList){
                return folderList.map((content, i) => {
                    let children = undefined;
                    if(content.folderList && content.folderList.length > 0){
                        children = treeLoad(content.folderList);
                    }
                    return (
                        <>
                            <ContextMenuTrigger id={content.fid} >
                                <TreeItem key={content.fid} nodeId={content} label={content.fname} children={ children } selected={this.props.data} onClick={ () => { getContents(content) } }
                                />
                                <ContextMenu id={content.fid}>
                                    <MenuItem data={content} onClick={ () => { createFolder(content) } }>
                                        폴더 생성
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { modifyFolder(content) } }>
                                        폴더 수정
                                    </MenuItem>
                                    <MenuItem data={content} onClick={ () => { deleteFolder(content) } }>
                                        폴더 삭제
                                    </MenuItem>
                                </ContextMenu>
                            </ContextMenuTrigger>
                        </>
                    );
                });
            }

        }

        return (
            <div className="browser-wrap">
                
                <div className="browser-wrap folder-wrap">
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        expanded={this.state.expanded}
                        selected={this.state.selected}
                        onNodeToggle={handleToggle}
                        onNodeSelect={handleSelect}
                        // onContextMenu={handleSelect}
                    >
                        <ContextMenuTrigger id="homeMenu">
                            <TreeItem key={this.props.data.fid} nodeId={this.props.data} label={this.props.data.fname} data={this.props.data} onClick={()=>{setTreeItem(this.props.data)}}>
                                { treeLoad(this.props.data.folderList) }
                            </TreeItem>
                        </ContextMenuTrigger>
                    </TreeView>
                </div>
                <Table data={this.state.selectedData.fileList} selectedTreeData={this.state.selectedData} setTreeItem={setTreeItem} createFolder={createFolder}/>
            </div>
        );
    }
}

export default Tree;