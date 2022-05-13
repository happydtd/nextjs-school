import React, {useEffect, useState, useContext} from 'react'
import classes from './CourseCalendarSchedule.module.css'
import { Calendar, Badge } from 'antd';
import { GetClassSchedule } from '../../serverAPI';
import { useRouter } from 'next/router';
import 'antd/dist/antd.css';
import { Store } from '../../Utils/Store';
import moment from 'moment';

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

    function dayConvter(value){
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

    function getListData(value) {
        let listData;

        var classScheduleMoment = classSchedule?.map((c)=>{return {classname: c.name, classTime: c.schedule?.classTime?.map(t=>t)}})

        // console.log('classScheduleMoment', classScheduleMoment);
        // console.log('value', value);
        // console.log('value.day()', value.day());

        //var filterresult = classScheduleMoment?.classTime?.filter(t=> t.day() === value.day())
        const filterresult = [];
        classScheduleMoment.forEach (
          i=> i.classTime.forEach (
            t=> {
                if (t.index(dayConvter(value))>0)
                  filterresult.push({className: i.className, classTime: t.classTime});
            
            }
          )
        )

        console.log('filterresult', filterresult);
        listData = filterresult?.map(i=> {return {type: 'warning', content: i.className + ' ' + moment(i.classTime).format('HH:ss:mm')}})
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: <p>hello</p> },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
      }
      
      function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className={classes.events}>
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
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
}

export default CourseCalendarScheduleForm;

