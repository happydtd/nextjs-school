import React, {useContext, useEffect, useState } from 'react'
import CommonLayout from '../../../../components/CommonLayout';
import {Store} from '../../../../Utils/Store'
import {useRouter} from 'next/router'

export default function OverviewForm() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const router = useRouter();

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  return (
    <CommonLayout>Student Overview Form</CommonLayout>
  )
}
