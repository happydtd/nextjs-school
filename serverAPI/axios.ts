import axios, {AxiosResponse} from "axios"
import SignupType from "../models/signup.interface"

export default function callAxios(url, type='GET', data={}) {
    if (type === 'GET'){
      return axios.get<SignupType>(url, {
        params: data
      })
    } else{
      return axios.post<SignupType>(url, data)
    }
  }