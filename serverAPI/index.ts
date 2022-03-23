import {callAxiosWithoutToken, callAxiosWithToken} from "../serverAPI/axios";
import SignupType from "../models/signup.interface";
import {AES} from 'crypto-js'

export const reqSignup = (email:string, password:string, role:string)  => callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqSignIn = (email:string, password:string, role:string)  => {
    password = AES.encrypt(password,"cms").toString();
    return callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', "POST", {email, password, role})
}

export const GetStudents = (token:string, page:number, limit:number)  => {
    return callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "GET", {page, limit})
}
