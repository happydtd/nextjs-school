import React, {useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Row, Col , Typography, Tabs, Spin, Rate, Paragraph } from 'antd';
import { CourseForm } from '../../components/Course';
import { GetTeacherById } from '../../serverAPI';
import {Store} from '../../Utils/Store'

export default function TeacherDetail() {
  const router = useRouter();
  const { Text, Title } = Typography;
  const { TabPane } = Tabs;
  const teacherId = router.query.teacherId;
  const [ loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
  const [ teacher, setTeacher] = useState({});


  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetTeacherById(token, +teacherId );
        console.log(result.data.data);
        setTeacher(result.data.data);
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

  return (
    <CommonLayout>
      <Spin spinning={loading}/>
      <Row gutter={16}>
        <Col span={12}>
          <Row>
            <Col span={24}>picture</Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row justify="center"><Text strong>Name</Text></Row>
              <Row justify="center">{teacher.name}</Row>
            </Col>
            <Col span={12}>
              <Row justify="center"><Text strong>Country</Text></Row>
              <Row justify="center">{teacher.country}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row justify="center"><Text strong>Email</Text></Row>
              <Row justify="center">{teacher.email}</Row>
            </Col>
            <Col span={12}>
              <Row justify="center"><Text strong>Phone</Text></Row>
              <Row justify="center">{teacher.phone}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row justify="center"><Text strong>Address</Text></Row>
              <Row justify="center">{teacher.address?.join(',')}</Row>
            </Col>
          </Row>  
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="About" key="1">
              <Row>
                <Col span={24}><Title level={4} type="success">Information</Title></Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Birthday:</Text></Col>
                <Col span={18}>{teacher.profile?.birthday}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Gender:</Text></Col>
                <Col span={18}>{teacher.profile?.gender}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Create Time:</Text></Col>
                <Col span={18}>{teacher.profile?.createdAt}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Update Time:</Text></Col>
                <Col span={18}>{teacher.profile?.updatedAt}</Col>
              </Row>
              <Row>
                <Col span={24}><Title level={4} type="success">Skills</Title></Col>
              </Row>
              <Row>
                <span>
                    
                    <Rate  value={3} />
                </span>
              </Row>

              <Row>
                <Col span={24}><Title level={4} type="success">Description</Title></Col>
              </Row>
              <Row>
                <Col span={24}>{teacher.profile?.description}</Col>
              </Row>
            </TabPane>
            <TabPane tab="Courses" key="2">
              <CourseForm courses = {teacher?.courses}/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </CommonLayout>
  )
}