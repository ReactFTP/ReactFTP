import React from 'react';
import TableItem from './TableItem';
// import CompanyItem from './CompanyItem';
import * as axios from './axios';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadFile : null,
        };
    }

    render() {
        const fileUploadHandle = async(e) => {
            e.preventDefault();

            let file = e.target.files[0];

            console.log("file : " + file);
            console.log(file);
            this.setState({
                uploadFile : file,
            });
            uploadFile(file);
        }

        // 파일 접근 권한와 로그인 계정의 접근 권한 범위 확인
        const authCheckFile = (file) => {
            // alert("authCheckFile 호출!");
            const userAuth = this.props.userInfo.authId;
            // alert("유저 권한 : " + userAuth + "\파일 권한 : " + file.fauth);
            if(userAuth=='a'){
                return true;
            } else if(userAuth=='b'){
                if(file.fauth=='a')
                    return false;
                return true;
            }else if(userAuth=='c'){
                if(file.fauth=='c')
                    return true;
                return false;
            }else{
                alert("user의 권한이 없습니다.");
                return false;
            }
        }

        const deleteFile = async(data) => {
            this.props.deleteFolder(data);
        };

        const modifyFile = async(data) => {
            if(data.ftype == "폴더")
                this.props.modifyFolder(data);
            else
                this.props.modifyFile(data);
        };

        const downloadFile = async(data) => {
            console.log(data);
            if(data.ftype == "폴더") {
                alert("폴더 압축 다운로드 호출!");
            }
            else {
                alert("파일 다운로드 호출!");
                console.log(data.fid);
                axios.downloadFile(data.fid);
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

        const uploadFile = async(file) => {
            const formData = new FormData();

            const company_id = this.props.selectedTreeData.fco;
            const parent_folder_name = this.props.selectedTreeData.fname;   // {fid, fname, fauth, fdate, fsize, ftype}
            const folder_id = this.props.selectedTreeData.fid;
            const owner_auth = window.sessionStorage.getItem('authId');
            formData.append('file', file);
            formData.append('company_id', JSON.stringify(company_id));
            formData.append('parent_folder_name', JSON.stringify(parent_folder_name));
            formData.append('folder_id', JSON.stringify(folder_id));
            formData.append('owner_auth', JSON.stringify(owner_auth));

            const info = await Promise.all([
                // axios.fileUpload(selected.fid)
                axios.fileUpload(formData)
            ]);

            console.log(info[0]);
            if(info[0].status == 200)
                alert("파일이 업로드 되었습니다.");
            else
                alert("파일 업로드 실패");

            this.props.getContents(this.props.selectedTreeData);
        };

        const mapToComponent = (fileList) => {
            if(fileList == undefined)
                return;
            
            return fileList.map((content, i) => {
                if(content.ftype == "폴더"){
                    if(this.props.userInfo.coId == '-' || content.fco == this.props.userInfo.coId) {   // 로그인 계정 소속 회사와 폴더 소속 회사가 같은 경우에만 테이블 아이템 생성
                        if(content.parentfid == '0'){   // 부모폴더 아이디가 0 == 회사 디렉토리
                            return (
                                <>
                                    <ContextMenuTrigger id={content.fid} >
                                        <TableItem data={content} key={i} setTreeItem={this.props.setTreeItem} getContents={this.props.getContents} selectedTreeData={this.props.selectedTreeData} />
            
                                        {/* <ContextMenu id={content.fid}>
                                            <MenuItem data={content} onClick={ () => { downloadFile(content) } }>
                                                압축 다운로드
                                            </MenuItem>
                                        </ContextMenu> */}
                                    </ContextMenuTrigger>
                                </>
                            );
                            
                        }else{
                            return (
                                <>
                                    <ContextMenuTrigger id={content.fid} >
                                        <TableItem data={content} key={i} setTreeItem={this.props.setTreeItem} getContents={this.props.getContents} selectedTreeData={this.props.selectedTreeData} />
            
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
                    }
                }
                else {
                    return (
                        <>
                            <ContextMenuTrigger id={content.fid + '파일'} >
                                <TableItem data={content} key={i} setTableItem={this.props.setTableItem} />
    
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
        } // map 함수 테이블 아이템 생성

        return (
            <div className="browser-wrap item-wrap">
                <div className={ this.props.modalOpenFileModify ? 'modify-file-input-modal' : 'modify-input-close-modal' }>
                    선택한 파일 : {this.props.selectedFileData.fname}<br></br>
                    파일 권한 : class {(this.props.selectedFileData.fauth=='a')?'A':(this.props.selectedFileData.fauth=='b')?'B':(this.props.selectedFileData.fauth=='c')?'C':''}<br></br><br></br>
                    변경할 파일명 : <input value={this.props.modifyFileName} onChange={this.props.setModifyFileName} 
                                    style={{width: '250px'}}/><br></br><br></br>
                    
                    권한 변경 : 
                    <select value={this.props.modifyFileAuth} onChange={this.props.setModifyFileAuth}>
                        <option value="a">class A</option>
                        <option value="b">class B</option>
                        <option value="c">class C</option>
                    </select>

                    <ul className="custom-btn">
                        <li onClick={this.props.closeModifyModal}>취소</li>
                        <li onClick={()=>{ this.props.modifySubmit(this.props.selectedFileData) }}>완료</li>
                    </ul>
                </div>
                <div className="selected-path-wrap">
                    선택한 폴더 : {this.props.selectedTreeData.fname}
                </div>
                <div className={this.props.selectedTreeData.fname=='REACT FTP'?'sessionNone':"add-button-wrap"} >
                    <label for="input-file">
                        + 파일 업로드
                    {/* <form> */}
                        <input type="file" name="file" id="input-file" style={{display:'none'}} onChange={ fileUploadHandle } />
                    {/* </form> */}
                    </label>

                </div>
                <ul className="tableHead data">
                    <li className="fileName">파일명</li>
                    <li className="lastModDate">수정된 날짜</li>
                    <li className="type">타입</li>
                    <li className="size">크기</li>
                </ul>
                {mapToComponent(this.props.data)}
                {/* 테이블 빈 공간 우클릭 시 발생하는 컨텍스트 메뉴 */}
                {/* <ContextMenuTrigger id='empty' >
                empty
                    <ContextMenu id='empty'>
                        <MenuItem data={this.props.data.selectedTreeData} onClick={ () => { this.props.createFolder(this.props.data.selectedTreeData) } }>
                            폴더 생성
                        </MenuItem>
                        <MenuItem data={this.props.data.selectedTreeData} onClick={ () => { uploadFile(this.props.data.selectedTreeData) } }>
                            파일 업로드
                        </MenuItem>
                    </ContextMenu>
                </ContextMenuTrigger> */}
            </div>
        );
    }
}

export default Table;