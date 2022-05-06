import React, { useEffect, useContext, useState, useRef } from 'react';
import { Row, Col } from 'antd';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import Link from 'next/link'
import { Store } from '../../Utils/Store'
import { GetCourses} from '../../serverAPI';
import CourseCard from '../../components/CourseCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Course() {

  const test=['col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6','col-6', 'col-6' , 'col-6']
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { userInfo} = state;
  const  token  = userInfo?.userInfo.token;
  const [ pageSize, setPageSize ] = useState(12);
  const [ page, setPage ] = useState(1);
  const [ courses, setCourses ] = useState(null);

  async function callAPI(){ 
    try{
        const result  = await GetCourses(token, 1, pageSize);
        setCourses(result.data.data.courses);
    }
    catch(error){
      console.log("error", error)
    }
  };

  useEffect(()=>{
    setPageSize(pageSize=>page*12)
  },[page])

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    callAPI();
  },[pageSize])

  if (!userInfo) return (<></>)

  if (!courses) return <h3>teacher not found...</h3>

  return (
    <CommonLayout>
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

        // below props only if you need pull down functionality
        // refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        // }
      >
        {/* { courses?.map((course, index)=>{
          return (
            <CourseCard key={index} course={course}/>
          )})
        } */}
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        { courses?.map((course, index)=>{
          return (
            <Col key={index} xs={12} sm={12} md={8} lg={6} ><CourseCard course={course}/></Col>
          )})
        }
        </Row>
      </InfiniteScroll>
    </CommonLayout>

  )
}

