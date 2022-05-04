import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import { Steps, Button, message } from 'antd';
import CourseDetail from '../../../components/CourseDetail';
import CourseSchedule from '../../../components/CourseSchedule';
import TestForm from '../../../components/TestForm';
import { CourseResult } from '../../../components/CourseResult';
import {Store} from '../../../Utils/Store'
import {useRouter} from 'next/router'

const { Step } = Steps;


export default function AddCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);

    const resetStep = ()=>{
      setCurrent(0);
    }

    const next = () => {
        setCurrent(prev=> prev + 1);
      };

    const steps = [
      {
        title: 'Course Detail',
        content: <CourseDetail next={next}/>,
      },
      {
        title: 'Course Schedule',
        content: <CourseSchedule next={next}/>,
      },
      {
        title: 'Success',
        content: <CourseResult next={next} resetStep={resetStep}/>,
      },
    ];

    useEffect(()=>{
      if (!userInfo) {
        router.push('/signin');
      }
    },[])
  
    if (!userInfo) return (<></>)
    
  return (
    <CommonLayout>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </CommonLayout>
    
  )
}
