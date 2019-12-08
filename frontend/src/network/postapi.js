import axios from 'axios';
import qs from 'qs'

export const requestLogin = params => {
  console.log(params);

  return axios.post(`http://localhost:8081/tokens/login1?`, params)
  .then(res => res.data)
  .catch(err => {
    console.log(err);
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log( error.response.data );
      console.log( error.response.status );
      console.log( error.response.headers );
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log( "Error", error.message );
  }
  console.log( error.config );
  });
};

