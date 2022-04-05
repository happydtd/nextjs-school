import React, { useContext, useEffect, useState, useRef } from 'react';
import { Row, Col, Table, Tag, Space, Button, Input, message, Popconfirm,Modal} from 'antd';
import 'antd/dist/antd.css';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {Store} from '../../Utils/Store'
import { GetStudents, DeleteStudentById, AddStudent, EditStudent } from '../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import StudentForm from '../../components/Student';
import Link from 'next/link'


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
      render: (name, record) =>{
        return <Link href={'/student/' + record.id}>
          <a>{name}</a>
        </Link>
      }
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
                onConfirm={()=>HandleDeleteStudent(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const { state, dispatch } = useContext(Store);
  const [ students, setStudents] = useState([]);
  const [ page, setPage] = useState(1);
  const [ pageSize, setPageSize] = useState(15);
  const [ total, setTotal] = useState(0);
  const [ loading, setLoading] = useState(false);
  const [ student, setStudent] = useState(null);
  const [ modalTitle, setmodalTitle] = useState("");
  const [ actionType, setActionType] = useState("");
  const [ search, setSearch] = useState(null);
  const { token } = state;

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const searchRef = useRef(null)

  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetStudents(token, search, page, pageSize);
        console.log(result);
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

  const handleSearch = async ()=>{

      setSearch(searchRef.current.input.value);
      const result  = await GetStudents(token, searchRef.current.input.value, page, pageSize);
      setTotal(result.data.data.total)
      setStudents(result.data.data.students);

  }

  const HandleDeleteStudent = async (id) => {
    const deleteResult  = await DeleteStudentById(token, id);
    const result  = await GetStudents(token, search, page, pageSize);
    setTotal(result.data.data.total)
    setStudents(result.data.data.students);
  };

  const handleStudentForm = ()=>{
    setStudent(null);
    setmodalTitle("Add Student");
    setActionType("Add");
    setVisible(true);
  }

  const handleOK = async (values) => {
    const {name, email, area, studentType} = values;
    setConfirmLoading(true);
    let result1;
    if(actionType === 'Add' )
      result1  = await AddStudent(token, name, email, area, +studentType);
    else
      result1  = await EditStudent(token, name, email, area, +studentType);
    const result  = await GetStudents(token, search, page, pageSize);
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
    setmodalTitle("Edit Student");
    setActionType("Edit");
    setStudent({name, country, email, studentType})
    setVisible(true);
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
                  <Input placeholder="Search by name" ref={searchRef}/>
                </Col>
                <Col span={3}><Button icon={<SearchOutlined />} onClick={handleSearch}/></Col>
                
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
          title={modalTitle}
          visible={visible}
          footer={null}
          // onOk={handleOk}
          // okText='Update'
          // cancelText='Cancel'
          confirmLoading={confirmLoading}
          // onCancel={handleCancel}
        >
          <StudentForm parentOnOK={handleOK} parentOnCancel={handleCancel} actionType={actionType} student= {student}></StudentForm>
        </Modal>
    </CommonLayout>
  )
}
