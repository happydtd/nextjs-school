import React, {useEffect, useState, useContext} from 'react'
import classes from './CourseCalendarSchedule.module.css'
import { Calendar, Row, Col, Space} from 'antd';
import { GetClassSchedule } from '../../serverAPI';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import { Store } from '../../Utils/Store';
import moment from 'moment';
import {
  ClockCircleOutlined
} from '@ant-design/icons';

const CourseCalendarScheduleForm = () => {
    const [classSchedule, setClassSchedule] = useState(null);
    const { state, dispatch } = useContext(Store);
    const { userInfo} = state;
    const  token  = userInfo?.userInfo.token;
    const router = useRouter();

    async function callAPI(){ 
      try{
          const result  = await GetClassSchedule(token, 1);
          if (result.status === 200){
            if (result.data.data)
              setClassSchedule(result.data.data.filter(i=>i.schedule && i.schedule.classTime ));
          }
          else{
            throw new Error("Couldn't get class schedule!");
          }
      }
      catch(error){
        console.log("error", error)
      }
    };

    useEffect(()=>{
      if (!userInfo) {
        router.push('/signin');
      }
      callAPI();
    },[])
    
    console.log("classSchedule", classSchedule);

    function dayConvert(value){
      switch(value.day()){
        case 0:
          return 'Sunday';
        case 1:
          return 'Monday';
        case 2:
          return 'Tuesday';
        case 3:
          return 'Wednesday';
        case 4:
          return 'Thursday';
        case 5:
          return 'Friday';
        case 6:
          return 'Satursday'
      }
    }

    function getListData(value) {
      console.log('value', value);
        let listData;
        const filterresult = [];
        if (classSchedule){
            var classScheduleMoment = classSchedule?.map((c)=>{return {className: c.name, classTime: c.schedule?.classTime?.map(t=>t)}})
            
            classScheduleMoment.forEach (
              i=> {
                i.classTime.forEach (
                  t=> {
                      if (t.includes(dayConvert(value)))
                      {
                        console.log('t', t);
                        filterresult.push({className: i.className, classTime: t.split(' ')[1]});
                        console.log('filterresult', filterresult);
                      }
                  }
                )
              }
            )
        }

        
        listData = filterresult?.map(i=> {return {classTime: i.classTime, className: i.className}})
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className={classes.events}>
            {listData.map((item, index) => (
              <li key={index}>
                <Row>
                  <Col span={8}><Space><ClockCircleOutlined />{item.classTime}</Space></Col>
                  <Col span={8}></Col>
                  <Col span={8}>{item.className}</Col>
                </Row>
                {/* <Badge status={item.type} text={item.content} /> */}
              </li>
            ))}
          </ul>
        );
      }
      
      function getMonthData(value) {
        if (value.month() === 8) {
          return 1394;
        }
      }
      
      function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
          <div className={classes['notesmonth']}>
            <section>{num}</section>
            <span>Backlog number</span>
          </div>
        ) : null;
      }

  return (
    <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
  )
}


export default CourseCalendarScheduleForm;

