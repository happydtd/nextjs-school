import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import {Store} from '../../../Utils/Store'
import {useRouter} from 'next/router'
import { Tabs, Row, Col ,Input ,Select } from 'antd';
import 'antd/dist/antd.css';
import CourseDetail from '../../../components/CourseDetail';
import CourseSchedule from '../../../components/CourseSchedule';

export default function EditCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
  const router = useRouter();
  const { TabPane } = Tabs;
  const { Option } = Select;

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  function callback(key) {
    console.log(key);
  }

  const prefixSelector = (
      <Select style={{ width: 70 }}>
        <Option value="code">Code</Option>
        <Option value="name">Name</Option>
        <Option value="catagory">Catagory</Option>
      </Select>
  );

  if (!userInfo) return (<></>)
  
  return (
    <CommonLayout>
          <Row>
            <Col span={12}>
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Course Detail" key="1">
                  <CourseDetail />
                </TabPane>
                <TabPane tab="Course Schedule" key="2">
                <CourseSchedule/>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
    </CommonLayout>
    
  )
}
