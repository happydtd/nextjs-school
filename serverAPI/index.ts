import {callAxiosWithoutToken, callAxiosWithToken} from "../serverAPI/axios";
import SignupType from "../models/signup.interface";
import {AES} from 'crypto-js'

export const reqSignup = async (email:string, password:string, role:string)  => await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqSignIn = async (email:string, password:string, role:string)  => {
    password = AES.encrypt(password,"cms").toString();
    return await callAxiosWithoutToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', "POST", {email, password, role})
}

export const GetStudents = async (token:string, query: string = null, page:number, limit:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "GET", "Body",{query, page, limit})

export const DeleteStudentById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "DELETE", "Query",id)

export const AddStudent = async (token:string, name:string, country:string, email:string, type: number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "POST", "Body", {name, country, email, type})

export const EditStudent = async (token:string, id:number, name:string, country:string, email:string, type: number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "PUT", "Body", {id, name, country, email, type})

export const GetStudentById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students', token, "GET", "Query", id)

export const GetTeachers = async (token:string, query: string = null, page:number, limit:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers', token, "GET", "Body",{query, page, limit})

export const DeleteTeacherById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers', token, "DELETE", "Query",id)

export const AddTeacher = async (token:string, name:string, country:string, phone:string, email: number, skills:[])  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers', token, "POST", "Body", {name, country, phone, email, skills})

export const EditTeacher = async (token:string, id:number, name:string, country:string, phone:string, email: number, skills:[])  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers', token, "PUT", "Body", {id, name, country, phone, email, skills})

export const GetTeacherById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/teachers', token, "GET", "Query", id)

export const GetCourses = async (token:string, query: string = null, page:number=null, limit:number=null, name: string=null, type:string=null)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/courses', token, "GET", "Body",{query, page, limit, name, type})

export const GetCoursesById = async (token:string, id:number)  => await callAxiosWithToken('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/courses/detail', token, "GET", "Body", {id})