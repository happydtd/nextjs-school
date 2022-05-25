import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './AuthSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { courseSlice } from './courseSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        course: courseSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;