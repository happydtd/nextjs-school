import callAxios from "../serverAPI/axios";
import SignupType from "../models/signup.interface";
import {AES} from 'crypto-js'

export const reqSignup = (email:string, password:string, role:string)  => callAxios('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqSignIn = (email:string, password:string, role:string)  => {
    password = AES.encrypt(password,'cms').toString();
    console.log(password);
    return callAxios('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login', "POST", {email, password, role})
}

export const reqCountry = ()=> callAxios('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/countries', "GET")