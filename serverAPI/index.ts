import {callAxiosWithoutToken, callAxiosWithToken} from "../serverAPI/axios";
import SignupType from "../models/signup.interface";
import {AES} from 'crypto-js'

export const reqSignup = async (email:string, password:string, role:string)  => await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqSignIn = async (email:string, password:string, role:string)  => {
    password = AES.encrypt(password,"cms").toString();
    return await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', "POST", {email, password, role})
}

export const GetStudents = async (token:string, query: string = null, page:number, limit:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "GET", {query, page, limit})

export const DeleteStudentById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "DELETE", id)

export const AddStudent = async (token:string, name:string, country:string, email:string, type: number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "POST", {name, country, email, type})

export const EditStudent = async (token:string, id:number, name:string, country:string, email:string, type: number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "PUT", {id, name, country, email, type})

