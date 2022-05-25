import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../../../components/CommonLayout'
import { Steps, Button, message } from 'antd';
import CourseDetail from '../../../../../components/CourseDetail';
import CourseSchedule from '../../../../../components/CourseSchedule';
import { CourseResult } from '../../../../../components/CourseResult';
// import {Store} from '../../../../../Utils/Store'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from '../../../../../Store/configureStore'

const { Step } = Steps;


export default function AddCourse() {
  // const { state, dispatch } = useContext(Store);
  // const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [token, setToken] = useState(null);

    const resetStep = ()=>{
      setCurrent(0);
    }

    const next = () => {
        setCurrent(prev=> prev + 1);
      };

    const steps = [
      {
        title: 'Course Detail',
        content: <CourseDetail next={next} editDetail={null} addAction={true} token={token}/>,
      },
      {
        title: 'Course Schedule',
        content: <CourseSchedule next={next} editSchedule={null} courseId={null} addAction={true} token={token}/>,
      },
      {
        title: 'Success',
        content: <CourseResult next={next} resetStep={resetStep} />,
      },
    ];

    useEffect(()=>{
      if (!userInfo) {
        router.push('/signin');
      }
      else
      {
        setToken(userInfo.token);
      }
    },[])
  
    
  return (
    <>
    {
        token && <CommonLayout>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </CommonLayout>
    }
    </>

    
  )
}
