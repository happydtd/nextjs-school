import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Table, Tag, Space, Button, Input, message, Popconfirm,Modal} from 'antd';
import 'antd/dist/antd.css';
import {data} from '../../serverAPI/data'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {Store} from '../../Utils/Store'
import { GetStudents, DeleteStudentById, AddStudent } from '../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import StudentForm from '../../components/Student';
import BreadcrumbSeparator from 'antd/lib/breadcrumb/BreadcrumbSeparator';

export default function Student() {
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
      render: type =>{
        if (type)
         { return <>{type.name}</>}
         else
         {return ''}
        },
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
          <a onClick={()=>handleEdit(record.name, record.country, record.email, record.type )}>Edit</a>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={()=>confirm(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const confirm = async (id) => {
    const deleteResult  = await DeleteStudentById(token, id);
    const result  = await GetStudents(token, page, pageSize);
    setTotal(result.data.data.total)
    setStudents(result.data.data.students);
  };

  const { state, dispatch } = useContext(Store);
  const [ students, setStudents] = useState([]);
  const [ page, setPage] = useState(1);
  const [ pageSize, setPageSize] = useState(15);
  const [ total, setTotal] = useState(0);
  const [ loading, setLoading] = useState(false);
  const [ student, setStudent] = useState({});
  const { token } = state;

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetStudents(token, page, pageSize);
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

  const handleStudentForm = ()=>{
    setVisible(true);
  }

  const handleAdd = async (values) => {
    const {name, email, area, studentType} = values;
    setConfirmLoading(true);
    const result1  = await AddStudent(token, name, email, area, +studentType);
    const result  = await GetStudents(token, page, pageSize);
    setTotal(result.data.data.total)
    setStudents(result.data.data.students);
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleEdit =(name, country, email, studentType )=>{
    setStudent({name, country, email, studentType})
    setVisible(true);
  //   <Modal
  //   title="Edit Student"
  //   visible={visible}
  //   footer={null}
  //   confirmLoading={confirmLoading}
  // >
  //   <StudentForm parentOnOK={handleAdd} parentOnCancel={handleCancel} actionType='Edit' student= {{name, country, email, studentType}}></StudentForm>
  // </Modal>
  }

  return (
    <CommonLayout>
        <Row>
            {/* <Col span={6}>test</Col> */}
            <Col span={2}>
                <Button type="primary" icon={<PlusOutlined/>} onClick={handleStudentForm}>
                Add
                </Button></Col>
            <Col span={18}></Col>
            <Col span={4}>
              <Row>
                <Col span={21}>
                  <Input placeholder="Search by name"/>
                </Col>
                <Col span={3}><Button icon={<SearchOutlined />}/></Col>
                
              </Row>
            </Col>
            {/* <Col span={6}>test</Col>  */}
        </Row>

        <Row>
            {/* <Col span={6}></Col> */}
            <Col span={24}>
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
            {/* <Col span={6}></Col> */}
        </Row>
        <Modal
        title="Add Student"
        visible={visible}
        footer={null}
        // onOk={handleOk}
        // okText='Update'
        // cancelText='Cancel'
        confirmLoading={confirmLoading}
        // onCancel={handleCancel}
      >
        <StudentForm parentOnOK={handleAdd} parentOnCancel={handleCancel} actionType='Add' student= {student}></StudentForm>
      </Modal>
    </CommonLayout>
  )
}
