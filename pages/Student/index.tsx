import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Table, Tag, Space, Button, Input, message } from 'antd';
import 'antd/dist/antd.css';
import {data} from '../../serverAPI/data'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {Store} from '../../Utils/Store'
import { GetStudents } from '../../serverAPI';

const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Area',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Selected Curriculum',
      key: 'selectedCurriculum',
      dataIndex: 'courses',
      // render: courses =>{
      //   const getstring = (a,b) => {a.name + b.name;
      //   console.log('a',a.name)
      //   console.log('b',b.name)
      //   }
      //   var result = courses.reduce(getstring);
      //   return <>{result}</>
      // }
    },
    {
      title: 'Student Type',
      key: 'StudentType',
      dataIndex: 'type',
      render: type =><>{type.name}</>,

    },
    // {
    //   title: 'Join Time',
    //   key: 'joinTime',
    //   dataIndex: 'joinTime',
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

export default function Student() {
  const { state, dispatch } = useContext(Store);
  const [ students, setStudents] = useState([])
  const { token } = state;
  async function callAPI(){
    try{
        console.log('student receive token', token)
        const result  = await GetStudents(token, 1, 1);
        console.log(result.data.data.students)
        setStudents(result.data.data.students);
    }
    catch(error){
      console.log("error", error)
    }
  };
  

  useEffect(()=>{
    callAPI();
  },[])

  return (
    <div>
        <Row>
            <Col span={6}></Col>
            <Col span={2}>
                <Button type="primary" icon={<PlusOutlined/>}>
                Add
                </Button></Col>
            <Col span={6}></Col>
            <Col span={4}><Input placeholder="Search by name"/><Button icon={<SearchOutlined />}/></Col>
            <Col span={6}></Col> 
        </Row>

        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Table columns={columns} dataSource={students}/>
            </Col>
            <Col span={6}></Col>
        </Row>
    </div>
  )
}
