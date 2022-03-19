import React from 'react';
import { Row, Col, Table, Tag, Space, Button, Input } from 'antd';
import 'antd/dist/antd.css';
import {data} from '../../serverAPI/data'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const columns = [
    // {
    //   title: 'No.',
    //   dataIndex: 'no',
    //   key: 'no',
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Selected Curriculum',
      key: 'selectedCurriculum',
      dataIndex: 'selectedCurriculum',
    },
    {
      title: 'Student Type',
      key: 'studentType',
      dataIndex: 'studentType',
    },
    {
      title: 'Join Time',
      key: 'joinTime',
      dataIndex: 'joinTime',
    },
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
                <Table columns={columns} dataSource={data}/>
            </Col>
            <Col span={6}></Col>
        </Row>
    </div>
  )
}
