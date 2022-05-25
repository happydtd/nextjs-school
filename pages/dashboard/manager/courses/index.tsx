import React, { useEffect, useContext, useState, useRef } from 'react';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import CommonLayout from '../../../../components/CommonLayout';
import Link from 'next/link'
// import { Store } from '../../../../Utils/Store'
import { GetCourses} from '../../../../serverAPI';
import CourseCard from '../../../../components/CourseCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useAppSelector, useAppDispatch} from '../../../../Store/configureStore'

export default function Course() {

  const test=['col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6' , 'col-6']
  // const { state, dispatch } = useContext(Store);
  const router = useRouter();
  // const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const [ pageSize, setPageSize ] = useState(12);
  const [ page, setPage ] = useState(1);
  const [ courses, setCourses ] = useState(null);
  const [ token, setToken] = useState(null);
  const [ userId, setUserId] = useState(null);

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    else{
      setToken(userInfo.token);
      setUserId(userInfo.userId);
      setPageSize(page*12)
    }
  },[])

  useEffect(()=>{
    if (token)
      callAPI();
  },[pageSize, token])

  const callAPI = async ()=>{ 
    try{
        const result  = await GetCourses(token, 1, pageSize, null, null, null, userId); 
        setCourses(result.data.data.courses);
    }
    catch(error){
      console.log("error", error)
    }
  };

  return (
    <>
    {
      courses && <CommonLayout>
        <InfiniteScroll
          dataLength={courses.length} //This is important field to render the next data
          next={()=> {
            setPage(page=>page+1)
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
          { courses?.map((course, index)=>{
            return (
              <Col key={index} xs={12} sm={12} md={8} lg={6} ><CourseCard course={course}/></Col>
            )})
          }
          </Row>
        </InfiniteScroll>
      </CommonLayout>
    }
    </>


  )
}

