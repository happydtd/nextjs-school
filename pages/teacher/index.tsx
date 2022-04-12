import React, { useRef } from 'react';
import { Space, Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import { GetTeachers, DeleteTeacherById, AddTeacher, EditTeacher} from '../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import Link from 'next/link'
import GenericTable from '../../components/GenericTable';

export default function Teacher() {
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
        return <Link href={'/teacher/' + record.id}>
          <a>{name}</a>
        </Link>
      },
      sorter:(r1, r2)=>r1.name.localeCompare(r2.name),

    },
    {
      title: 'Area',
      dataIndex: 'country',
      key: 'country',
      sorter:(r1, r2)=>{
        return r1.country > r2.country
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Skill',
      key: 'skills',
      dataIndex: 'skills',
      render: skills =>{
        const cns =skills.map((c)=>{return c.name})
        const result = cns.join(",")
        return <>{result}</>
      }
    },
    {
      title: 'Course Amount',
      dataIndex: 'courseAmount',
      key: 'courseAmount',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={()=>handleEdit(record.id, record.name, record.country, record.email, record.type )}>Edit</a>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={()=>handleDeleteStudent(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const handleDeleteStudent = async (id) => {
    childRef.current.handleDeleteItem(id);
  };

  const handleEdit =(id, name, country, email, studentType )=>{
    childRef.current.handleEdit(id, name, country, email, studentType);
  }

  const childRef:any = useRef();

  const GetItems = async(token, search, page, pageSize)=>await GetTeachers(token, search, page, pageSize);

  const DeleteItemById = async(token, id)=>await DeleteTeacherById(token, id);

  const AddItem = async(token, name, area, phone, email, skills) => await AddTeacher(token, name, area, phone, email, skills);

  const EditItem = async(token, id, name, area, phone, email, skills) => await EditTeacher(token, id, name, area, phone, email, skills);
  
  return (
    <CommonLayout>
        <GenericTable onRef={childRef} columns={columns} dataType='teacher' GetItems={GetItems} DeleteItemById={DeleteItemById} AddItem={AddItem} EditItem={EditItem}/>
    </CommonLayout>
  )
}

