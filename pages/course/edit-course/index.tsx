import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import {Store} from '../../../Utils/Store'
import {useRouter} from 'next/router'

export default function EditCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
  const router = useRouter();

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  if (!userInfo) return (<></>)
  
  return (
    <CommonLayout><div>EditCourse</div></CommonLayout>
    
  )
}
