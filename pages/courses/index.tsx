import React, { useEffect, useContext, useState } from 'react';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import Link from 'next/link'
import { Store } from '../../Utils/Store'
import { GetCourses} from '../../serverAPI';
import CourseCard from '../../components/CourseCard';


export default function Course() {

  const test=['col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6' , 'col-6']
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
  const [ pageSize, setPageSize ] = useState(12);
  const [ courses, setCourses ] = useState(null);

  async function callAPI(){ 
    try{
        const result  = await GetCourses(token, '', 1, pageSize);
        console.log(result);
        setCourses(result.data.data.courses);
    }
    catch(error){
      console.log("error", error)
    }
  };

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    callAPI();
  },[pageSize])


  return (
    <CommonLayout>
          <>

            <Row>
              { courses?.map((course, index)=>{
                console.log(course);
                return (
                  <Col key={index} span={6}><CourseCard course={course}/></Col>
                )
              })

              }

            </Row>
        </>
    </CommonLayout>
  )
}

