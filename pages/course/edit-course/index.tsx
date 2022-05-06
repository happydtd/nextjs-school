import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import {Store} from '../../../Utils/Store'
import {useRouter} from 'next/router'
import { Tabs, Row, Col ,Input ,Select } from 'antd';
import 'antd/dist/antd.css';
import CourseDetail from '../../../components/CourseDetail';
import CourseSchedule from '../../../components/CourseSchedule';
import { GetTeachers, GetCourseTypes, GetCourseCode, GetCourses} from '../../../serverAPI';

export default function EditCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
  const router = useRouter();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [courseSearchType, setCourseSearchType] = useState("");
  const [courseSearchValue, setCourseSearchValue] = useState("");
  let courses = [];

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  async function callAPI(value){
    try{
      switch(courseSearchType){
        case "code":
          const result = await GetCourses(token, null, null, null, null, value, null);
          courses = result.data.data.courses;
          console.log(result);
        case "name":
          break;
        case "Category":
          break;

      }
    }
    catch(error){
      console.log("error", error)
    }
  };

  const searchCourseBy = (value)=>{
    setCourseSearchType(value);
  }

  const searchCourseInput = async (e)=>{
    await callAPI(e.target.value);
  }

  const prefixSelector = (
      <Select style={{ width: 120 }} onChange={searchCourseBy}>
        <Option value="code">Code</Option>
        <Option value="name">Name</Option>
        <Option value="category">Category</Option>
      </Select>
  );

  if (!userInfo) return (<></>)
  
  return (
    <CommonLayout>
          <Row>
            <Col span={12}>
              <Select style={{ width: '30%' }} onChange={searchCourseBy}>
                <Option value="code">Code</Option>
                <Option value="name">Name</Option>
                <Option value="category">Category</Option>
              </Select>
              <Select style={{ width: '70%' }}
                  value={courseSearchValue}
                  showSearch
                  onSearch= {(value)=> setCourseSearchValue(value)}>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
              </Select>
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
