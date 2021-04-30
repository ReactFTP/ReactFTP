import React from 'react';
import Select from "react-select";
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles, ServerStyleSheets, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';


import * as axios from './axios';
import Table from './Table';

class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedData : this.props.data,
            selectedFileData : this.props.data,
            storage : [this.props.data],
            modalOpen: false,
            modalOpenFileModify: false,
            modifyFolderData : this.props.data,
        };
    }

    openModifyModal = (selected) => {
        if(selected.ftype != '폴더') // 파일인 경우
            this.setState({ modalOpenFileModify: true });
        else // 폴더인 경우
            this.setState({ modalOpen: true });
    }
    closeModifyModal = () => {
        this.setState({ 
            modalOpen: false,
            modalOpenFileModify: false,
            modifyFolderName : "",
            modifyFolderAuth : "",
        });
    }
    setModifyFolderName = (e) => {
        this.setState({
            modifyFolderName : e.target.value
        });
    }
    setModifyFolderAuth = (e) => {
        this.setState({
            modifyFolderAuth : e.target.value
        }, () => {
            console.log("modifyFolderAuth : " + this.state.modifyFolderAuth);
        }); 
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

        const auths = [
            { value : "a", label: "class A" },
            { value : "b", label: "class B" },
            { value : "c", label: "class C" },
        ];

        const setTreeItem = (data) => { // {fid, fname, fauth, fco, folderList, fileList}
            this.setState({
                selectedData : data
            })
        }
        const setTableItem = (data) => { // {fid, fname, fauth, fdate, fsize, ftype}
            this.setState({
                selectedFileData : data
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

        // 폴더 접근 권한와 로그인 계정의 접근 권한 범위 확인
        const authCheckFolder = (selected) => {
            // alert("authCheck 호출!");
            const userAuth = this.props.userInfo.authId;
            // alert("유저 권한 : " + userAuth + "\n폴더 권한 : " + selected.fauth);
            if(userAuth=='a'){
                return true;
            } else if(userAuth=='b'){
                if(selected.fauth=='a')
                    return false;
                return true;
            }else if(userAuth=='c'){
                if(selected.fauth=='c')
                    return true;
                return false;
            }else{
                alert("user의 권한이 없습니다.");
                return false;
            }
        }

        // 폴더 소속 회사와 로그인 계정의 소속 회사 일치여부 확인
        const companyCheck = (selected) => {
            // alert("companyCheck 호출!");
            const user_coId = this.props.userInfo.coId;
            if(user_coId == '-')
                return true;
            // alert("유저 소속 회사 : " + user_coId + "\n폴더 소속 회사 : " + selected.fco);
            if(selected.fco != user_coId)
                return false;
            return true;
        }

        const getContents = async(selected) => {    // {fid, fname, folderList, fileList}
            console.log(selected);
            if(!companyCheck(selected))
                return;
            if(authCheckFolder(selected)){
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
            } else{
                alert("해당 폴더 접근 권한이 없습니다.");
            }
        }

        const createFolder = async(selected) => {
            if(!companyCheck(selected))
                return;
            let name = prompt("새 폴더명 입력");
            if(name==null)
                return;
            while(name==""){
                alert("폴더명은 필수 입력사항 입니다.");
                name = prompt("새 폴더명 입력");
            }
            const info = await Promise.all([    // map 
                axios.createFolder(selected.fid, name, this.props.userInfo.coId)
            ]);
            getContents(selected);

            // selected.folderList = selected.folderList.concat(info[0]);

            // 트리에는 추가 반영 되지만 테이블에는 추가 반영 안됨.
            setTreeItem(selected);
        };

        const deleteFolder = async(selected) => {
            if(!companyCheck(selected))
                return;
            // if(authCheckFolder(selected)){
                const result = window.confirm("폴더 내용도 모두 삭제됩니다.\n정말로 삭제하시겠습니까?");
                if(result){
                    const deleteResult = await Promise.all([
                        axios.deleteFolder(selected.fid)
                    ]);
                    console.log(deleteResult[0]) // {uid, object_string, contents_Item[], contents_Folder[]}
                    
                    selected.folderList = [];
                    selected.fileList = deleteResult[0].fileList;
                    setTreeItem(deleteResult[0]);
                }
            // } else{
            //     alert("삭제 권한이 없습니다.");
            // }
        };

        const modifyFolder = (selected) => {
            this.setState({
                modifyFolderData : selected,
            })
            this.openModifyModal(selected);
        };

        const modifySubmit = async(selected) => {
            let authId = this.state.modifyFolderAuth;
            let newFolderName = this.state.modifyFolderName;
            if(newFolderName=="" || newFolderName == undefined){
                alert("새 폴더명을 입력하지 않았습니다.");
                return;
            }
            console.log(authId);
            console.log(selected.fauth);
            if(authId == "" || authId == undefined)
                authId = selected.fauth;
            if(selected.ftype != '폴더'){    // 파일 변경
                await Promise.all([
                    axios.modifyFile(selected.folderid ,selected.fid, authId, this.state.modifyFolderName)
                ]);
            }
            else{
                await Promise.all([     // 폴더 변경
                    axios.modifyFolder(selected.fid, authId, this.state.modifyFolderName)
                ]);
            }
            this.closeModifyModal();
            selected.fname = this.state.modifyFolderName;
            selected.fauth = this.state.modifyFolderAuth;
            if(selected.ftype != '폴더')
                setTableItem(selected);
            else
                setTreeItem(selected);
        }
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
*/

        const treeLoad = (folderList) => {
            console.log(folderList);
            if(folderList){
                return folderList.map((content, i) => {
                    // alert("유저 소속 회사 : " + this.props.userInfo.coId + "\n폴더 소속 회사 : " + content.fco);
                    if(this.props.userInfo.coId == content.fco){    // 로그인 계정의 소속회사와 폴더 소속 회사가 같은 경우에만 트리아이템 생성
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
                    }
                });
            }

        }

        return (
            <div className="browser-wrap">
                <div className={ this.state.modalOpen ? 'modify-input-modal' : 'modify-input-close-modal' }>
                    {/* 로그인 정보를 확인하고 있습니다.<br></br><br></br>
                    잠시만 기다려주세요. */}
                    선택한 폴더 : {this.state.modifyFolderData.fname}<br></br>
                    폴더 권한 : class {(this.state.modifyFolderData.fauth=='a')?'A':(this.state.modifyFolderData.fauth=='b')?'B':(this.state.modifyFolderData.fauth=='c')?'C':''}<br></br><br></br>
                    변경할 폴더명 : <input value={this.state.modifyFolderName} onChange={this.setModifyFolderName} 
                                    style={{width: '250px'}}/><br></br><br></br>
                    
                    권한 변경 : 
                    <select value={this.state.modifyFolderData.fauth} onChange={this.setModifyFolderAuth}>
                        <option value="a">class A</option>
                        <option value="b">class B</option>
                        <option value="c">class C</option>
                    </select>

                    <ul className="custom-btn">
                        <li onClick={this.closeModifyModal}>취소</li>
                        <li onClick={()=>{ modifySubmit(this.state.selectedData) }}>완료</li>
                    </ul>
                </div>
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
                <Table data={this.state.selectedData.fileList} selectedTreeData={this.state.selectedData} userInfo={this.props.userInfo} selectedFileData={this.state.selectedFileData}
                    setTreeItem={setTreeItem} createFolder={createFolder} modifyFolder={modifyFolder} deleteFolder={deleteFolder} 
                    setTableItem={setTableItem} getContents={getContents} setModifyFolderName={this.setModifyFolderName} setModifyFolderAuth={this.setModifyFolderAuth} modifySubmit={modifySubmit}
                    modalOpenFileModify={this.state.modalOpenFileModify} closeModifyModal={this.closeModifyModal} />
            </div>
        );
    }
}

export default Tree;