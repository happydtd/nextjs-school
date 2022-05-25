import {createSlice} from '@reduxjs/toolkit'
import UserInfo from '../models/userInfo.interface'
import Cookies from 'js-cookie';

export interface AuthState{
    UserInfo: UserInfo| null
}

const initialState : AuthState ={
    UserInfo : Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) =>{
            state.UserInfo = action.payload;
            let time = new Date(new Date().getTime() + 2 * 60 * 60 *1000);
            Cookies.set('userInfo', JSON.stringify(action.payload), {
                expires: time,
              });
        },

        logout: (state, action) =>{
            state.UserInfo = null;
            Cookies.remove('userInfo');
        }
    }
})

export const {login, logout} = authSlice.actions;