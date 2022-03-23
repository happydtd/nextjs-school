import axios, {AxiosResponse} from "axios"
import SignupType from "../models/signup.interface"

export function callAxiosWithoutToken(url, type='GET', data={}) {
    if (type === 'GET'){
      return axios.get(url, {
        params: data
      })
    } else{
      console.log(data)
      return axios.post(url, data)
    }
}

export function callAxiosWithToken(url, token, type='GET', data={}) {
  axios.interceptors.request.use(config=>{
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  })

  if (type === 'GET'){
    return axios.get(url, {
      params: data
    })
  } else{
    console.log(data)
    return axios.post(url, data)
  }
}