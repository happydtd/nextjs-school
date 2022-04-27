import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetCoursesById } from '../../serverAPI';
import Course from '../../models/course.interface';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Col, Collapse, Divider, Row, Spin, Tag, Typography } from 'antd';
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
    const { Panel } = Collapse;
  
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
  
    //if (!course) return <h3>course not found...</h3>
  
    return course!=null && (
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
            <div><Typography>{course.startTime}</Typography></div>
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
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>{course.createdAt}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Start Time</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>{course.startTime}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Status</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                { course.schedule.chapters.map((chapter, index)=>{
                  return (
                    <Col key={index} xs={12} sm={12} md={8} lg={6} >
                      {chapter.name}
                    </Col>
                  )})
                }
                </Row>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Course Code</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>{course.uid}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Class Time</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Category</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  {
                    course.type.map((type,index)=>{
                      return (<Tag color="magenta" key={index}>{type.name}</Tag>)
                    })
                  }
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Description</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>{course.detail}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                  <div><Typography>Chapter</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <Collapse>
                  {
                    course.schedule.chapters.map((chapter,index)=>{
                      return (
                        <Panel header={chapter.name} key={chapter.id}>
                          <p>{chapter.content}</p>
                        </Panel>
                      )
                    })
                  }
                </Collapse>
              </Col>
            </Row>
          </Col>
        </Row>
      </CommonLayout>
    )
  }
