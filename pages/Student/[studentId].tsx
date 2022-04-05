import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Row, Col , Typography, Tabs, Spin } from 'antd';
import { CourseForm } from '../../components/Course';

export default function StudentDetail() {
  const router = useRouter();
  const { Text, Link } = Typography;
  const { TabPane } = Tabs;
  const studentId = router.query.studentId;
  const [ loading, setLoading] = useState(false);

  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetStudents(token, search, page, pageSize);
        console.log(result);
        setTotal(result.data.data.total)
        setStudents(result.data.data.students);
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
      <Spin spinning={this.loading}/>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>picture</Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Name1</Row>
              <Row>Name2</Row>
            </Col>
            <Col span={12}>
              <Row>Age1</Row>
              <Row>Age2</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>Email1</Row>
              <Row>Email2</Row>
            </Col>
            <Col span={12}>
              <Row>Phone1</Row>
              <Row>Phone2</Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row>Address1</Row>
              <Row>Address2</Row>
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
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Area:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Gender:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Member Period:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Type:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>CreateTime:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={6}>Update Time:</Col>
                <Col span={18}>col-12</Col>
              </Row>
              <Row>
                <Col span={24}>Interesting</Col>
              </Row>
              <Row>
                <Col span={24}>Visual Bsic:</Col>
              </Row>
              <Row>
                <Col span={24}>Description</Col>
              </Row>
              <Row>
                <Col span={24}>Description content</Col>
              </Row>
            </TabPane>
            <TabPane tab="Courses" key="2">
              <CourseForm/>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </CommonLayout>
  )
}
