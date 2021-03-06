import axios from 'axios';

//회원가입 ID중복확인
export function idCheck(id) {
    console.log('axios호출!');
    return axios({
        method: 'post',
        url : 'cd/idCheck',
        params : {
            id : id,
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회원삭제
export function deleteUser(id) {
    console.log('axios호출!');
    return axios({
        method: 'post',
        url : '/deleteUser',
        params : {
            id : id,
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회원가입 이메일중복확인
export function emailCheck(email) {
    console.log('axios호출!');
    return axios({
        method: 'post',
        url : '/emailCheck',
        params : {
            email : email,
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회원가입 휴대폰 번호중복확인
export function phoneCheck(phone) {
    console.log('axios호출!');
    return axios({
        method: 'post',
        url : '/phoneCheck',
        params : {
            phone : phone,
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회사 목록 가져오기
export function getCompanies() {
    return axios({
        method: 'post',
        url : '/getCompanies',
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회사 코드로 이름 가져오기
export function getCompanyName(coId) {
    return axios({
        method: 'post',
        url : '/getCompanyName',
        params : {
            coId : coId
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}


//회사 코드로 삭제하기
export function deleteCompany(coId) {
    return axios({
        method: 'post',
        url : '/deleteCompany',
        params : {
            coId : coId
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}


//회원가입
export function signUp(id, pw, name, email, phone, addr1, addr2, companyId, manager) {
    return axios({
        method: 'post',
        url : '/signUp',
        params : {
            id : id, pw : pw, name: name, email: email, phone: phone , addr1: addr1, addr2: addr2, companyId: companyId, manager: manager
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}


//회사추가
export function addCompany(name, email, phone, desc) {
    return axios({
        method: 'post',
        url : '/addCompany',
        params : {
            name:name, email:email, phone:phone, desc:desc
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        alert('추가되었습니다.');
        return response.data;
    }).catch(function(error){
    });
}
//다이렉트회원가입
export function directSignUp(id, pw, name, email, phone, addr1, addr2, companyId, manager, type) {
    return axios({
        method: 'post',
        url : '/directSignUp',
        params : {
            id : id, pw : pw, name: name, email: email, phone: phone , addr1: addr1, addr2: addr2, companyId: companyId, manager: manager, type: type
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        if(type == 'manager' && manager == 'true'){
            alert('Administrator의 승인 후 이용이 가능합니다.');
        }alert("가입완료");
        return response.data;
    }).catch(function(error){
    });
}

//회원 ID찾기
export function findID(name, email, phone) {
    return axios({
        method: 'post',
        url : '/getId',
        params : {
            name: name, email: email, phone: phone
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//회원 PW찾기
export function getNewPW(id, name, email, phone) {
    return axios({
        method: 'post',
        url : '/getNewPW',
        params : {
            id: id, name: name, email: email, phone: phone
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}
//로그인 
export function login(id,pw) {
    return axios({
        method: 'post',
        url : '/login',
        params : {
            id: id, pw: pw
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//get user
export function getUser(id) {
    return axios({
        method: 'post',
        url : '/getUser',
        params : {
            id: id
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

//get user InCompany 
export function getUserInCompany  (coId)  {
    return axios({
        method: 'post',
        url : '/getUserInCompany',
        params : {
            coId: coId
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}
//edit user
export function editUser(id, pw, email, phone, addr1, addr2) {
    return axios({
        method: 'post',
        url : '/editUser',
        params : {
            id: id, pw: pw, email: email, phone: phone, addr1: addr1, addr2:addr2
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}
//edit user set 
export function editUserSet(id, auth, active, join) {
    return axios({
        method: 'post',
        url : '/editUserSet',
        params : {
            id:id, auth:auth, active:active, join:join
        },
        headers : {
            'Access-Control-Allow-Origin': '*'
           }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

// Home.js -> FTP 세션 종료
export function ftpDisConnect() {
    return axios({
        method: 'get',
        url : '/home/ftpdisconnect',
    });
}

// Home.js -> FTP 세션 연결
export function ftpConnect(sessionId) {
    return axios({
        method: 'get',
        url : '/home/ftpconnect',
        params : {
            session_id : sessionId,
        }
    }).then(function(response){
        return getHomeContents();
    }).catch(function(error){
    });
}

// Home.js -> 최상위 디렉토리 <REACT FTP> List 가져오기
export function getHomeContents() {
    return axios({
        method: 'get',
        url : '/home/getfolderlist',
        params : {
            folder_id : 0,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 트리에서 선택한 아이템의 테이블 데이터 가져옴
export function getContents(folder_id) {
    return axios({
        method: 'get',
        url : '/home/getfoldercontents',
        params : {
            folder_id : folder_id,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 폴더 생성
export function createFolder(parentFolderId, newName, coId) {
    return axios({
        method: 'get',
        url : '/home/createfolder',
        params : {
            parent_folder_id : parentFolderId,
            new_name : newName,
            co_id : coId,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 폴더 삭제
export function deleteFolder(folderId) {
    return axios({
        method: 'get',
        url : '/home/deletefolder',
        params : {
            folder_id : folderId,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 폴더 수정
export function modifyFolder(folderId, authId, newName) {
    return axios({
        method: 'get',
        url : '/home/modifyfolder',
        params : {
            folder_id : folderId,
            auth_id : authId,
            new_folder_name : newName,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 파일 수정
export function modifyFile(parentFolderId, fileId, authId, newName) {
    return axios({
        method: 'get',
        url : '/home/modifyfile',
        params : {
            parent_folder_id : parentFolderId,
            file_id : fileId,
            auth_id : authId,
            new_file_name : newName,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 파일 삭제
export function deleteFile(parentFolderId, fileId) {
    return axios({
        method: 'get',
        url : '/home/deletefile',
        params : {
            parent_folder_id : parentFolderId,
            file_id : fileId,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// 홈화면 - 파일 업로드
export function fileUpload(formData) {
    return axios.post('/home/uploadfile',formData, {
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    });
}

// 홈화면 - 파일 다운로드
export function downloadFile(fileId, fileName) {
    axios({
        method: 'get',
        url : '/home/downloadfile',
        params : {
            file_id : fileId,
        },
        responseType: 'arraybuffer',
    }).then(response => {
        console.log(response);
        // const name = response.headers['content-disposition'].split('.')[1];
        const name = response.headers['content-disposition'].split('filename=')[1];
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
            const blob = response.data
            window.navigator.msSaveOrOpenBlob(blob, name) 
        } else{
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', fileName+"."+name);
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        }

    });
}

  // 홈화면 - 폴더 다운로드
  export function downloadFolder(folderId) {
    axios({
        method: 'get',
        url : '/home/downloadfolder',
        params : {
            folder_id : folderId,
        },
        responseType: 'arraybuffer',
    }).then(response => {
        console.log(response);
        const name = response.headers['content-disposition'].split('filename=')[1];
        if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
            const blob = response.data
            window.navigator.msSaveOrOpenBlob(blob, name) 
        } else{
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        }

    });
  }

export default axios;
