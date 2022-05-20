import React, {useContext, useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import CommonLayout from '../../../../components/CommonLayout';
import {Store} from '../../../../Utils/Store'
import { useRouter} from 'next/router'
import { Avatar, Card, Col, Row, Space, Typography, Progress  } from 'antd';
import { GetStatisticsOverView , GetStatisticsStudent, GetStatisticsTeacher, GetStatisticsCourse} from '../../../../serverAPI';
import { LikeOutlined } from '@ant-design/icons';
import OverviewCard from '../../../../components/OverviewCard'


export default function OverviewForm() {
  const { Text, Link } = Typography;
  const { state, dispatch } = useContext(Store);
  const userInfo = state.userInfo;
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [overview, setOverview] = useState(null);
  const [statisticsStudent, setStatisticsStudent] = useState(null);
  const [statisticsCourse, setStatisticsCourse] = useState(null);
  const [statisticsTeacher, setStatisticsTeacher] = useState(null);
  const { Meta } = Card;
  const router = useRouter();
  let data_country = [
    ["Country", "Popularity"],
    // ["Germany", 200],
    // ["United States", 300],
    // ["Brazil", 400],
    // ["Canada", 500],
    // ["France", 600],
    // ["RU", 700],
  ];

  if (statisticsStudent && statisticsStudent.country && statisticsStudent.country.length >0){
    console.log('statisticsStudent push');
    const test = statisticsStudent.country.map((c)=>{
      data_country.push([c.name, c.amount])
    })
  }

  const options_country = {
    title: "Country Popularity",
  };

  const data_ComboChart = [
    [
      "Month",
      "Bolivia",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];
  
  const options_ComboChart = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  const data_Line = [
    [
      "Day",
      "Guardians of the Galaxy",
      "The Avengers",
      "Transformers: Age of Extinction",
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4],
  ];
  
  const options_Line = {
    chart: {
      title: "Box Office Earnings in First Two Weeks of Opening",
      subtitle: "in millions of dollars (USD)",
    },
  };

  useEffect(()=>{

    if (!userInfo) {
      router.push('/signin');
    }
    else{
      setToken(userInfo?.userInfo.token);
      setUserId(userInfo?.userInfo.userId);
    }
  },[])

  useEffect(()=>{
    if (token && userId){
      callAPI();
    }
  },[token, userId])

  const callAPI = async () =>{
    try{
        const overviewResult  = await GetStatisticsOverView(token);
        //console.log(result.data.data);
        setOverview(overviewResult.data.data);

        const studentResult  = await GetStatisticsStudent(token, userId);
        setStatisticsStudent(studentResult.data.data);
    }
    catch(error){
      console.log("error", error)
    }

  };



  return (
    <>
      {
        userInfo && <CommonLayout>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {overview && 
            <Row  gutter={16} >
              <Col span={8}>
                <OverviewCard title='TOTAL STUDENTS' total={overview.student.total} percent={ Math.round(overview.student.lastMonthAdded / overview.student.total * 100)}/>
              </Col>
              <Col span={8}>
                <OverviewCard title='TOTAL TEACHERS' total={overview.teacher.total} percent={ Math.round(overview.teacher.lastMonthAdded / overview.teacher.total * 100)}/>
              </Col>
              <Col span={8}>
                <OverviewCard title='TOTAL COURSES' total={overview.course.total} percent={ Math.round(overview.course.lastMonthAdded / overview.course.total * 100)}/>
              </Col>
            </Row>
          }

          
          <Row gutter={16}>
            <Col span={12}>
              <Chart
                chartEvents={[
                  {
                    eventName: "select",
                    callback: ({ chartWrapper }) => {
                      const chart = chartWrapper.getChart();
                      const selection = chart.getSelection();
                      if (selection.length === 0) return;
                      const region = data_country[selection[0].row + 1];
                      console.log("Selected : " + region);
                    },
                  },
                ]}
                chartType="GeoChart"
                width="100%"
                height="400px"
                data={data_country}
              />
            </Col>
            <Col span={12}>
              <Chart
                chartType="PieChart"
                data={data_country}
                options={options_country}
                width={"100%"}
                height={"400px"}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Chart
                chartType="Line"
                width="100%"
                height="400px"
                data={data_Line}
                options={options_Line}
              />
            </Col>
            <Col span={12}>
              <Chart
                chartType="ComboChart"
                width="100%"
                height="400px"
                data={data_ComboChart}
                options={options_ComboChart}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>col-8</Col>
          </Row>
          </Space>
        </CommonLayout>
      }
    </>
  )
}