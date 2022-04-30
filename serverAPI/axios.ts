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

export async function callAxiosWithToken(url, token, type, query, data={}) {
  
  axios.interceptors.request.use(config=>{
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  })
  console.log('data', data);
  if (type === 'GET'){
    if (query === 'Body')
      return await axios.get(url, { params: data })
    else
      return await axios.get(`${url}/${data}`)
  } else if (type === 'POST'){
    return await axios.post(url, data)
  } else if (type === 'DELETE'){
    return await axios.delete(`${url}/${data}`)
  }  else if (type ==='PUT'){
    console.log(data)
    return await axios.put(url, data)
  }
}