import React, {useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Row, Col , Typography, Tabs, Spin } from 'antd';
import { CourseForm } from '../../components/Course';
import { GetStudentById } from '../../serverAPI';
import {Store} from '../../Utils/Store'

export default function StudentDetail() {
  const router = useRouter();
  const { Text, Link } = Typography;
  const { TabPane } = Tabs;
  const studentId = router.query.studentId;
  const [ loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { token } = state;
  const [ student, setStudent] = useState({});

  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetStudentById(token, +studentId );
        console.log(result.data.data);
        setStudent(result.data.data);
    }
    catch(error){
      console.log("error", error)
    }
    finally{
      setLoading(false);
    }
  };
  

  useEffect(()=>{
    callAPI();
  },[])

  return (
    <CommonLayout>
      <Spin spinning={loading}/>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>picture</Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Name</Row>
              <Row>{student.name}</Row>
            </Col>
            <Col span={12}>
              <Row>Age</Row>
              <Row>{student.age}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Email</Row>
              <Row>{student.email}</Row>
            </Col>
            <Col span={12}>
              <Row>Phone</Row>
              <Row>{student.phone}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Address</Row>
              <Row>{student.address?.join(',')}</Row>
            </Col>
          </Row>  
        </Col>
        <Col span={12}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="About" key="1">
              <Row>
                <Col span={24}>Information</Col>
              </Row>
              <Row>
                <Col span={6}>Eduction:</Col>
                <Col span={18}>{student.education}</Col>
              </Row>
              <Row>
                <Col span={6}>Area:</Col>
                <Col span={18}>{student.country}</Col>
              </Row>
              <Row>
                <Col span={6}>Gender:</Col>
                <Col span={18}>{student.gender}</Col>
              </Row>
              <Row>
                <Col span={6}>Member Period:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Type:</Col>
                <Col span={18}>{student.type?.name}</Col>
              </Row>
              <Row>
                <Col span={6}>CreateTime:</Col>
                <Col span={18}>{student.createdAt}</Col>
              </Row>
              <Row>
                <Col span={6}>Update Time:</Col>
                <Col span={18}>{student.updatedAt}</Col>
              </Row>
              <Row>
                <Col span={24}>Interesting</Col>
              </Row>
              <Row>
                <Col span={24}>{student.interest?.join(',')}</Col>
              </Row>
              <Row>
                <Col span={24}>Description</Col>
              </Row>
              <Row>
                <Col span={24}>{student.description}</Col>
              </Row>
            </TabPane>
            <TabPane tab="Courses" key="2">
              <CourseForm courses = {student?.courses}/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </CommonLayout>
  )
}
