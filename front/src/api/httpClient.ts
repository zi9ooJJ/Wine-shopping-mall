import axios from "axios";
import { SERVER_BASE_URL } from "../config/constants";
import { getLocalStorageToken } from "../utils";

// axios로 보내는 모든 요청에 대해서
axios.defaults.headers["Content-Type"] = "application/json";
const token = "";
axios.defaults.headers["authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = `${SERVER_BASE_URL}/api`;
axios.defaults.timeout = 10000;
// 요청을 보낼 때마다 url을 설정할 필요 없이,
// 특정 url로 요청을 보내는 http client 생성 -> 여러 곳에서 공유해서 사용해서 반복 줄이기
export const authClient = axios.create({
  // baseURL: SERVER_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// TODO: 예시: token이 전혀 필요 없는 요청을 보낼 때 사용
export const httpClient = axios.create({
  // baseURL: SERVER_BASE_URL,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// 요청을 보낼 때 마다 등록된 콜백함수가 실행된다.
// localStorage에서 token이 삭제되면, 그 다음 요청은 당연히 Authorization Header 없이 요청이 보내질 것이다.
authClient.interceptors.request.use((req) => {
  const token = getLocalStorageToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  // if (req.headers["Content-Type"] === "application/json") {
  //   req.data = removeUndefinedData(req.data);
  // }

  return req;
});

interface AnyObject {
  [key: string]: any;
}
// TODO: undefined인 필드를 제거해버리는 함수
function removeUndefinedData(data: AnyObject) {
  const newData: AnyObject = {};

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      newData[key] = value;
    }
  }
}

// Request를 만들기 위한 정보 (axios가 이런저런 데이터들을 js 객체 형태로 가지고 있을 것임)
// {
//   baseURL: SERVER_BASE_URL ,
//   path:'/',
//   Authorization: 'bearer <token>', <- 모든 요청에 Authorization Header를 붙여주는 작업 자동화, Interceptor가 대신 넣어줌
// }

// Interceptor 작업 끝난 후 문자열로 Request 완성하여 서버에 전송
// request = 'GET / HTTP/1.1\nContentType-Type: text/htmlAuthorization: 'bearer sdasdasdasdx',......'
