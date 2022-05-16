import React, { useEffect, useContext, useState, useRef } from 'react';
import CommonLayout from '../../../../../components/CommonLayout'
import {Store} from '../../../../../Utils/Store'
import {useRouter} from 'next/router'
import { Tabs, Row, Col ,Input ,Select } from 'antd';
import 'antd/dist/antd.css';
import CourseDetail from '../../../../../components/CourseDetail';
import CourseSchedule from '../../../../../components/CourseSchedule';
import { GetCourses, GetSchedule} from '../../../../../serverAPI';
import SearchSelect from '../../../../../components/SearchSelect';

export default function EditCourse() {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const router = useRouter();
  const { TabPane } = Tabs;
  const { Option } = Select;
  const [courseSearchType, setCourseSearchType] = useState("");
  const [courseSearchValue, setCourseSearchValue] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const [courseSchedule, setCourseSchedule] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    else
    {
      setToken(userInfo?.userInfo.token);
    }
  },[])

  useEffect(()=>{
    if (token && courseSearchValue)
      callAPI();
  },[courseSearchValue, token])

  const callAPI = async () =>{
    try{
      console.log("courseSearchValue", courseSearchValue);
        if (!courseSearchValue) return;
        const response  = await GetCourses(token, null , null, null, null, courseSearchValue[0].value);
        console.log("courseSearchresponse", response);
        if (response?.status !=200)
        {
          throw new Error("Can't get course data");
        }
        else{
          if (response.data.data.courses.length >0){
             setCourseDetail(response.data.data.courses[0]);

            // const scheduleResponse = await GetSchedule(token, response.data.data.courses[0].id);
            // if (scheduleResponse?.status !=200)
            // {
            //   throw new Error("Can't get course schedult");
            // }
            // else{
            //   console.log("scheduleResponse", scheduleResponse);
            //   setCourseSchedule(scheduleResponse.data.data);
            // }
          }
        }
    }
    catch(error){
      console.log("error", error)
    }
  };

  const searchCourseBy = (value)=>{
    setCourseSearchType(value);
  }

  const next = () => {
    
  };

 
  return (
    <>
    { token &&
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
                  <CourseDetail editDetail={courseDetail} next={next} addAction={false} token={token}/>
                </TabPane>
                <TabPane tab="Course Schedule" key="2">
                <CourseSchedule editSchedule={courseSchedule} courseId={courseDetail?.id} addAction={false} next={next} token={token}/>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
      </CommonLayout>
    }
    </>
  )
}

