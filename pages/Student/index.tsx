import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Table, Tag, Space, Button, Input, message, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import {data} from '../../serverAPI/data'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {Store} from '../../Utils/Store'
import { GetStudents } from '../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../components/CommonLayout/CommonLayout';

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
      render: courses =>{
        const cns =courses.map((c)=>{return c.name})
        const result = cns.join(",")
        return <>{result}</>
      }
    },
    {
      title: 'Student Type',
      key: 'StudentType',
      dataIndex: 'type',
      render: type =><>{type.name}</>,
    },
    {
      title: 'Join Time',
      key: 'joinTime',
      dataIndex: 'createdAt',
      render: jointime =>{
         return <>{formatDistanceToNow(Date.parse(jointime))}</>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={confirm}
          >
            <a>Delete</a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(1), 3000);
    });


export default function Student() {
  const { state, dispatch } = useContext(Store);
  const [ students, setStudents] = useState([]);
  const [ page, setPage] = useState(1);
  const [ pageSize, setPageSize] = useState(15);
  const [ total, setTotal] = useState(0);
  const [ loading, setLoading] = useState(false);
  const { token } = state;
  async function callAPI(){
    try{
      setLoading(true);
        console.log('student receive token', token)
        console.log('page', page)
        console.log('pageSize', pageSize)
        const result  = await GetStudents(token, page, pageSize);
        console.log(result.data.data)
        setTotal(result.data.data.total)
        setStudents(result.data.data.students);
    }
    catch(error){
      console.log("error", error)
    }
    finally{
      setLoading(false);
    }
  };
  

  useEffect(()=>{
    callAPI();
  },[page, pageSize])

  return (
    <CommonLayout>
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
                <Table
                loading={loading}
                columns={columns}
                dataSource={students}
                pagination={{
                  pageSize: pageSize,
                  current:page,
                  total: total,
                  onChange:(page, pageSize)=>{
                    setPage(page);
                    setPageSize(pageSize);
                  }
                }}/>
            </Col>
            <Col span={6}></Col>
        </Row>
    </CommonLayout>
  )
}
