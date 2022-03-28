import axios, {AxiosResponse} from "axios"
import SignupType from "../models/signup.interface"

export async function callAxiosWithoutToken(url, type='GET', data={}) {
    if (type === 'GET'){
      return await axios.get(url, {
        params: data
      })
    } else{
      console.log(data)
      return await axios.post(url, data)
    }
}

export async function callAxiosWithToken(url, token, type='GET', data={}) {
  axios.interceptors.request.use(config=>{
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  })

  if (type === 'GET'){
    return await axios.get(url, {
      params: data
    })
  } else if (type === 'POST'){
    return await axios.post(url, data)
  } else if (type === 'DELETE'){
    return await axios.delete(`${url}/${data}`)
  } 
}