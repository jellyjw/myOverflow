import axios from "axios";
// axios.defaults.withCredentials = true;
export function getAllData(page) {
  return axios
    .get(`http://13.209.121.17:8080/questions?category=&page=${page.toString()}&size=10`)
    .then(res => res.data);
}
export function getCategoryData(page, category) {
  return axios
    .get(`http://13.209.121.17:8080/questions?category=${category}&page=${page.toString()}&size=10`)
    .then(res => res.data);
}
export function getAnswerData() {
  return axios.get(`http://13.209.121.17:8080/answers?questionId=1`).then(res => res.data.data);
}
export async function login(loginInfo,callback=()=>{}){ //로그인하면 로그인 정보 담는곳, 아마 아랫줄에 이거 이용해서 토큰 받아올듯
    try{
      const response = await axios.post('http://13.209.121.17:8080/myoverflow/login',loginInfo)
      // console.log(response);
      // localStorage.setItem('accessToken',response.authorization)
      // localStorage.setItem('refresh',response.refresh)
      // callback(response.data.memberId)
    }catch{
      // console.log('error');
    }
    // return await axios.post('http://13.209.121.17:8080/myoverflow/login',loginInfo).then( res=>{
      
    //   return res.data.memberId
    // })
  // }
  // localStorage.setItem('login', JSON.stringify({memberId:12,email: 'sij333@naver.com' , nickname:'뉸누'}))
}
export function getUser(accessToken){//데이터 (혹은 memberId) 있는지 판별해주고 그에 맞는 데이터 내보내주는 함수
  if(localStorage.getItem('login')){
    // axios.get('http://',{headers: {authorization: `Bearer ${JSON.parse(accessToken})`})
   return JSON.parse(localStorage.getItem('login'))
  }
}
export function newUser(userInfo){
  axios.post('http://13.209.121.17:8080/members',{userInfo}).then(console.log)
}
export function logout(){
localStorage.clear()
}
