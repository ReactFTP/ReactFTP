import axios from 'axios';

//회원가입 ID중복확인
export function idCheck(id) {
    return axios({
        method: 'post',
        url : '/testys/idCheck',
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

// get <REACT FTP> home folder
export function getHomeContents_BK(uid) {
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


export default axios;
