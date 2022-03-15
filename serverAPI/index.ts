import callAxios from "../serverAPI/axios";
import SignupType from "../models/signup.interface";

export const reqSignup = (email:string, password:string, role:string) : Promise<SignupType> => callAxios('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup', "POST", {email, password, role})

export const reqCountry = ()=> callAxios('http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/countries', "GET")