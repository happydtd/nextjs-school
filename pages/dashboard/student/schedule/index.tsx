import React, {useContext, useEffect, useState } from 'react'
import CommonLayout from '../../../../components/CommonLayout';
// import {Store} from '../../../../Utils/Store'
import {useRouter} from 'next/router'
import CourseCalendarScheduleForm from '../../../../components/CourseCalendarSchedule/CourseCalendarSchedule';
import {useAppSelector, useAppDispatch} from '../../../../Store/configureStore'

export default function ScheduleForm () {
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const router = useRouter();

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  return (
    <CommonLayout>
      <CourseCalendarScheduleForm/>
    </CommonLayout>
  )
}
