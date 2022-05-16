import React from 'react'
import { Table, Tag, Space } from 'antd';

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
    render: text => <a>{text}</a>,
  },
  // {
  //   title: 'Type',
  //   dataIndex: 'type',
  //   key: 'type',
  // },
  {
    title: 'Join Time',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
];

const data = [

];

export const CourseForm = (props) => {

  return (
    
    <Table columns={columns} dataSource={props.courses} />
  )
}
