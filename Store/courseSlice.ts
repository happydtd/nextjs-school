import {createSlice} from '@reduxjs/toolkit'
import Course from '../models/course.interface'

export interface CourseState {
    course: Course |null
}

const initialState : CourseState = {
    course: null
}

export const courseSlice = createSlice({
    name :'course',
    initialState,
    reducers: {
        addOrUpdateCourse: (state, action)=> {
            state.course = action.payload
        }
    }
})

export const  {addOrUpdateCourse} = courseSlice.actions;

