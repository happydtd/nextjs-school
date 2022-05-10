import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../components/CommonLayout/CommonLayout'
import {Store} from '../../../Utils/Store'
import {useRouter} from 'next/router'
import { Tabs, Row, Col ,Input ,Select } from 'antd';
import 'antd/dist/antd.css';
import CourseDetail from '../../../components/CourseDetail';
import CourseSchedule from '../../../components/CourseSchedule';
import { GetTeachers, GetCourseTypes, GetCourseCode, GetCourses, GetSchedule} from '../../../serverAPI';
import SearchSelect from '../../../components/SearchSelect';

export default function EditCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const token  = userInfo?.userInfo.token;
  const router = useRouter();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [courseSearchType, setCourseSearchType] = useState("");
  const [courseSearchValue, setCourseSearchValue] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const [courseSchedule, setCourseSchedule] = useState(null);
  let courses = [];

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[])

  const callAPI = async () =>{
    try{
        if (!courseSearchValue) return;
        const response  = await GetCourses(token, null , null, null, null, courseSearchValue[0].value);
        console.log("response", response);
        if (response?.status !=200)
        {
          throw new Error("Can't get course data");
        }
        else{
          if (response.data.data.courses.length >0){
            setCourseDetail(response.data.data.courses[0]);

            const scheduleResponse = await GetSchedule(token, response.data.data.courses[0].id);
            if (scheduleResponse?.status !=200)
            {
              throw new Error("Can't get course schedult");
            }
            else{
              setCourseSchedule(scheduleResponse.data.data);
            }
          }
        }
    }
    catch(error){
      console.log("error", error)
    }
  };

  useEffect(()=>{

    callAPI();
  },[courseSearchValue])



  const searchCourseBy = (value)=>{
    setCourseSearchType(value);
  }

  const next = () => {
    
  };

  if (!userInfo) return (<></>)

 
  return (
    <CommonLayout>
          <Row>
            <Col span={24}>
              <Select style={{ width: '30%' }} onChange={searchCourseBy}>
                <Option value="code">Code</Option>
                <Option value="name">Name</Option>
                <Option value="category">Category</Option>
              </Select>
              <SearchSelect style={{ width: '70%' }} courseSearchType={courseSearchType} courseSearchValue={courseSearchValue} setCourseSearchValue={setCourseSearchValue}/>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Course Detail" key="1">
                  <CourseDetail detail={courseDetail} next={next}/>
                </TabPane>
                <TabPane tab="Course Schedule" key="2">
                <CourseSchedule Schedule={courseSchedule}/>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
    </CommonLayout>
    
  )
}

