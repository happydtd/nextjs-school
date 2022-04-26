import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetCoursesById } from '../../serverAPI';
import Course from '../../models/course.interface';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Col, Divider, Row, Spin, Typography } from 'antd';
import { HeartFilled ,UserOutlined } from '@ant-design/icons';
import { Store } from '../../Utils/Store';

export default function CourseDetail() {
    const router = useRouter();
    const { Text, Title } = Typography;
    const courseId = router.query.courseId;
    const [ loading, setLoading] = useState(false);
    const { state, dispatch } = useContext(Store);
    console.log('state', state);
    const { userInfo} = state;
    const { token } = userInfo.userInfo;
    const [ course, setCourse] = useState<Course>();
  
  
    async function callAPI(){
      try{
          setLoading(true);
          const result  = await GetCoursesById(token, +courseId );
          console.log(result.data.data);
          setCourse(result.data.data);
      }
      catch(error){
        console.log("error", error)
      }
      finally{
        setLoading(false);
      }
    };
    
  
    useEffect(()=>{
      if (!userInfo) {
        router.push('/signin');
      }
      callAPI();
    },[])
  
    if (!course) return <h3>course not found...</h3>
  
    return (
      <CommonLayout>
        <Spin spinning={loading}/>
        <Row gutter={16}>
          <Col span={12}>
            <Row gutter={16}>
            <Col className="gutter-row" span={24}>
                <div><Typography>{course.name}</Typography></div>
            </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
            <Col className="gutter-row" span={12}>
            <div><Typography>{course.createdAt}</Typography></div>
            </Col>
            <Col className="gutter-row" span={12}>
            <div><Typography><HeartFilled style={{color:'red'}}/> {course.star}</Typography></div>
            </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
            <Col className="gutter-row" span={12}>
            <div><Typography>Duration:</Typography></div>
            </Col>
            <Col className="gutter-row" span={12}>
            <div><Typography>{course.duration} years</Typography></div>
            </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
            <Col className="gutter-row" span={12}>
            <div><Typography>Teacher:</Typography></div>
            </Col>
            <Col className="gutter-row" span={12}>
            <div><Typography>{course.teacherName}</Typography></div>
            </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
            <Col className="gutter-row" span={12}>
            <div><Typography><UserOutlined /> Student Limit:</Typography></div>
            </Col>
            <Col className="gutter-row" span={12}>
            <div><Typography>{course.maxStudents}</Typography></div>
            </Col>
            </Row> 
          </Col>
          <Col span={12}>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Course Detail</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Create Time</Typography></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CommonLayout>
    )
  }
