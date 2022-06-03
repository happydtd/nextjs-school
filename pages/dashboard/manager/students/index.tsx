import React, { useRef, useContext, useEffect, useState } from 'react';
import { Space, Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import { GetStudents, DeleteStudentById, AddStudent, EditStudent} from '../../../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../../../components/CommonLayout';
import Link from 'next/link'
import GenericTable, { TableDataType } from '../../../../components/GenericTable';
// import {Store} from '../../../../Utils/Store'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from '../../../../Store/configureStore'
import { AxiosResponseGetStudentsData } from '../../../../models/AxiosResponseGetStudents.interface';
import { AxiosResponseDeleteStudent } from '../../../../models/AxiosResponseDeleteStudent.interface';

export default function Student() {
  // const { state, dispatch } = useContext(Store);
  // const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const router = useRouter();
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
        return <Link href={'students/' + record.id}>{name}</Link>
      },
      sorter:(r1, r2)=>r1.name.localeCompare(r2.name),

    },
    {
      title: 'Country',
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
          <a onClick={()=>handleEdit(record.id, record.name, record.country, record.email, record.type )}>Edit</a>
          <Popconfirm
                title="Are you sure to delete?"
                okText="Confirm"
                cancelText="Cancel"
                onConfirm={()=>handleDelete(record.id)}
          >
            <a>Delete</a>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    childRef.current.handleDeleteItem(id);
  };

  const handleEdit =(id, name, country, email, type )=>{
    childRef.current.handleEdit(id, name, country, email, type , null, null);
  }

  const childRef:any = useRef();

  const GetItems = async(token:string,  search: string, userId: number, page: number, pageSize: number) : Promise<AxiosResponseGetStudentsData> =>await GetStudents(token,  search, userId, page, pageSize);

  const DeleteItemById = async(token:string, id: number) : Promise<AxiosResponseDeleteStudent> => await DeleteStudentById(token, id);

  const AddItem = async(token, name, country, email, studentType) => await AddStudent(token, name, country, email, studentType);

  const EditItem = async(token, id, name, country, email, studentType) => await EditStudent(token, id, name, country, email, studentType);
  
  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
  },[router,userInfo])

  return (
    <>
    {
      userInfo && 
      (<CommonLayout>
          <GenericTable onRef={childRef} columns={columns} dataType={TableDataType.Student}  GetItems={GetItems} DeleteItemById={DeleteItemById} AddItem={AddItem} EditItem={EditItem}/>
      </CommonLayout>)
    }
    </>

  )
}

