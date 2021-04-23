import axios from 'axios';

// 로그인 user 정보 확인
export function getUserInfo(id, pw) {
    //console.log(id);
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/login.jsp',
        params : {
            id : id,
            pw : pw,
        }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}

// 폴더 contents 아이템 배열 조회 (아이템 변경이나 개정 후, 사용)
export function logout(appXsession) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/logout.jsp',
        params : {
            appXsession : appXsession,
        }
    });
}

// get TC home contents
// export function getHomeContents(uid) {
//     return axios({
//         method: 'post',
//         url : '/com.genergy.bk.soa/teamcenter.jsp',
//         params : {
//             uid : uid,
//         }
//     }).then(function(response){
//         console.log(response.data);
//         return response.data;
//     }).catch(function(error){
//     });
// }

// get <REACT FTP> folder
export function getHomeContents_BK() {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/teamcenter.jsp',
        params : {
            // uid : uid,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// get TC home contents
export function getContents(uid) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/getContents.jsp',
        params : {
            uid : uid,
        }
    }).then(function(response){
        console.log(response.data);
        return response.data;
    }).catch(function(error){
    });
}

// TC 컴포넌트 생성(폴더 또는 아이템)
export function createComponent(uid, id, name, desc) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/createItem.jsp',
        params : {
            uid : uid,
            id : id,
            name : name,
            desc : desc,
        }
    }).then(function(response){
        console.log("TC 컴포넌트 생성 완료")
        return response.data;
    }).catch(function(error){
    });
}

// TC 컴포넌트 삭제(폴더 또는 아이템)
export function deleteItem(uid) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/deleteItem.jsp',
        params : {
            uid : uid,
        }
    }).then(function(response){
        console.log("TC 컴포넌트 삭제 완료")
        return response.data;
    }).catch(function(error){
    });
}

// TC 컴포넌트 변경(폴더 또는 아이템)
export function modifyItem(uid, name) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/modifyItem.jsp',
        params : {
            uid : uid,
            name : name,
        }
    }).then(function(response){
        console.log("TC 폴더 변경 완료")
    }).catch(function(error){
    });
}

// TC 아이템 개정
export function reviseItem(uid) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/reviseItem.jsp',
        params : {
            uid : uid,
        }
    }).then(function(response){
        console.log("TC 개정 완료")
    }).catch(function(error){
    });
}

// 폴더 contents 아이템 배열 조회 (아이템 변경이나 개정 후, 사용)
export function searchContentsItem(uid) {
    return axios({
        method: 'post',
        url : '/com.genergy.bk.soa/searchContentsItem.jsp',
        params : {
            uid : uid,
        }
    }).then(function(response){
        return response.data;
    }).catch(function(error){
    });
}
