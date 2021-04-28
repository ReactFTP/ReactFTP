import axios from 'axios';

//회원가입 ID중복확인
export function idCheck(id) {
    console.log('axios호출!');
    return axios({
        method: 'post',
        url : '/idCheck',
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
// get <REACT FTP> home folder
// export function getHomeContents_BK() {
//     return axios({
//         method: 'post',
//         url : '/home/gethomecontents',
//         params : {
//             folder_id : 0,
//         }
//     }).then(function(response){
//         // console.log(response.data);
//         return response.data;
//     }).catch(function(error){
//     });
// }

// Home.js -> 최상위 디렉토리 <REACT FTP> List 가져오기
export function getHomeContents_BK() {
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
export function createFolder(parent_folder_id, new_name) {
    return axios({
        method: 'get',
        url : '/home/createfolder',
        params : {
            parent_folder_id : parent_folder_id,
            new_name : new_name,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}



export default axios;
