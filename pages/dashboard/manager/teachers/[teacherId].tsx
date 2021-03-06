import React, {useContext, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import CommonLayout from '../../../../components/CommonLayout';
import { Row, Col , Typography, Tabs, Spin, Rate} from 'antd';
import { CourseForm } from '../../../../components/CourseForm';
import { GetTeacherById } from '../../../../serverAPI';
// import {Store} from '../../../../Utils/Store'
import Teacher from '../../../../models/teacher.interface';
import {useAppSelector, useAppDispatch} from '../../../../Store/configureStore'


export default function TeacherDetail() {
  const router = useRouter();
  const { Text, Title } = Typography;
  const { TabPane } = Tabs;
  const [ loading, setLoading] = useState(false);
  // const { state, dispatch } = useContext(Store);
  // const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const [token, setToken] = useState(null);
  const [ teacher, setTeacher] = useState<Teacher>(null);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(()=>{

    if (!userInfo) {
      router.push('/signin');
    }
    else{
      setToken(userInfo.token);
      setTeacherId(router.query.teacherId);
    }

  },[])

  useEffect(()=>{
    if (token && teacherId)
      callAPI();
  },[token, teacherId])

  const callAPI = async ()=>{
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

  return (
    <>
    {
        teacher && <CommonLayout>
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
                    <Col span={18}>{teacher.profile?.gender === 1? 'male':'female'}</Col>
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
    
                    {
                      teacher.skills?.map(
                        (m)=>{
                            return (
                              <Row key={m.index}>
                                  <Col span={6}><Text strong>{m.name}</Text></Col>
                                  <Col span={18}>
                                        <Rate value={m.level} />
                                  </Col>
                              </Row>
                            )
                        }
                      )
                    }
                  <Row>
                    <Col span={24}><Title level={4} type="success">Description</Title></Col>
                  </Row>
                  <Row>
                    <Col span={24}>{teacher.profile?.description}</Col>
                  </Row>
                </TabPane>
                {/* <TabPane tab="Courses" key="2">
                  <CourseForm courses = {teacher?.courses}/>
                </TabPane> */}
              </Tabs>
            </Col>
          </Row>
        </CommonLayout>
    }
    </>

  )
}