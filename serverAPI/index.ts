import {callAxiosWithoutToken, callAxiosWithToken} from "../serverAPI/axios";
import SignupType from "../models/signup.interface";
import {AES} from 'crypto-js'

export const reqSignup = async (email:string, password:string, role:string)  => await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqSignIn = async (email:string, password:string, role:string)  => {
    password = AES.encrypt(password,"cms").toString();
    return await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', "POST", {email, password, role})
}

export const GetStudents = async (token:string, page:number, limit:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "GET", {page, limit})

export const DeleteStudentById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "DELETE", id)
