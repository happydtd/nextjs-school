import React, {useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import { Row, Col , Typography, Tabs, Spin, Tag } from 'antd';
import { CourseForm } from '../../components/Course';
import { GetStudentById } from '../../serverAPI';
import {Store} from '../../Utils/Store'

export default function StudentDetail() {
  const router = useRouter();
  const { Text, Title } = Typography;
  const { TabPane } = Tabs;
  const studentId = router.query.studentId;
  const [ loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
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
              <Row justify="center"><Text strong>Name1</Text></Row>
              <Row justify="center">{student.name}</Row>
            </Col>
            <Col span={12}>
              <Row justify="center"><Text strong>Age</Text></Row>
              <Row justify="center">{student.age}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row justify="center"><Text strong>Email</Text></Row>
              <Row justify="center">{student.email}</Row>
            </Col>
            <Col span={12}>
              <Row justify="center"><Text strong>Phone</Text></Row>
              <Row justify="center">{student.phone}</Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Row justify="center"><Text strong>Address</Text></Row>
              <Row justify="center">{student.address?.join(',')}</Row>
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
                <Col span={6}><Text strong>Eduction:</Text></Col>
                <Col span={18}>{student.education}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Area:</Text></Col>
                <Col span={18}>{student.country}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Gender:</Text></Col>
                <Col span={18}>{student.gender}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Member Period:</Text></Col>
                <Col span={18}>{student.memberStartAt} - {student.memberEndAt}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Type:</Text></Col>
                <Col span={18}>{student.type?.name}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>CreateTime:</Text></Col>
                <Col span={18}>{student.createdAt}</Col>
              </Row>
              <Row>
                <Col span={6}><Text strong>Update Time:</Text></Col>
                <Col span={18}>{student.updatedAt}</Col>
              </Row>
              <Row>
                <Col span={24}><Title level={4} type="success">Interesting</Title></Col>
              </Row>
              <Row>
                {/* <Col span={24}>{student.interest?.join(',')}</Col> */}
                <Col span={24}>
                  {student.interest?.map((i)=>{
                    return (<Tag color="magenta" key={i}>{i}</Tag>)
                  })}
                </Col>
              </Row>
              <Row>
                <Col span={24}><Title level={4} type="success">Description</Title></Col>
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
