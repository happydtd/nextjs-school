import React, {useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../../../components/CommonLayout';
import { Row, Col , Typography, Tabs, Spin, Tag } from 'antd';
import { CourseForm } from '../../../../components/CourseForm';
import { GetStudentById } from '../../../../serverAPI';
import {Store} from '../../../../Utils/Store'

interface Student{
  name: string,
  age: number,
  email: string,
  phone: string,
  address: string[],
  education: string,
  country: string,
  gender:string,
  memberStartAt: Date,
  memberEndAt: Date,
  type:StudentType,
  createdAt: Date,
  updatedAt:Date,
  interest: string[],
  description: string
}

interface StudentType{
  name: string,
}

export default function StudentDetail() {
  const router = useRouter();
  const { Text, Title } = Typography;
  const { TabPane } = Tabs;
  const [ loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const [ student, setStudent] = useState<Student>();
  const [token, setToken] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    else{
      setToken(userInfo?.userInfo.token);
      setStudentId(router.query.studentId);
    }
  },[])

  useEffect(()=>{
    if (token){
      callAPI();
    }
  },[token])

  const callAPI = async ()=>{
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

  return (
  <>
  {
      student && <CommonLayout>
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
              {/* <TabPane tab="Courses" key="2">
                <CourseForm courses = {student?.courses}/>
              </TabPane> */}
            </Tabs>
          </Col>
        </Row>
      </CommonLayout>
  }
  </>

  )
}
