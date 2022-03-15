import axios, {AxiosResponse} from "axios"
import SignupType from "../models/signup.interface"

export default function callAxios(url, type='GET', data={}) : Promise<SignupType> {
    if (type === 'GET'){
      return axios.get(url, {
        params: data
      })
    } else{
      return axios.post(url, data)
    }
  }