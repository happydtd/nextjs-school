import React, {useContext, useEffect, useState } from 'react'
import CommonLayout from '../../../../components/CommonLayout';
import {Store} from '../../../../Utils/Store'
import {useRouter} from 'next/router'
import CourseCalendarScheduleForm from '../../../../components/CourseCalendarSchedule/CourseCalendarSchedule';

export default function ScheduleForm () {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
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
