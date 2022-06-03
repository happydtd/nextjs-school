import React, {  useRef, useContext, useEffect, useState } from 'react';
import { Space, Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import { GetTeachers, DeleteTeacherById, AddTeacher, EditTeacher} from '../../../../serverAPI';
import { formatDistanceToNow } from 'date-fns'
import CommonLayout from '../../../../components/CommonLayout';
import Link from 'next/link'
import GenericTable, { TableDataType } from '../../../../components/GenericTable';
// import {Store} from '../../../../Utils/Store'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from '../../../../Store/configureStore'
import { AxiosResponseTeacherData } from '../../../../models/AxiosResponseGetTeachers.interface';

export default function Teacher() {
  // const { state, dispatch } = useContext(Store);
  // const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const router = useRouter();
  const [token, setToken] = useState(null);

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
        return <Link href={'teachers/' + record.id}>
          <a>{name}</a>
        </Link>
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
          <a onClick={()=>handleEdit(record.id, record.name, record.country, record.email, record.skills, record.phone )}>Edit</a>
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

  const handleEdit =(id, name, country, email, skills, phone )=>{
    childRef.current.handleEdit(id, name, country, email, null, skills, phone);
  }

  const childRef:any = useRef();

  const GetItems = async(token: string, search: string, userId: number, page, pageSize) : Promise<AxiosResponseTeacherData> =>await GetTeachers(token, search, page, pageSize);

  const DeleteItemById = async(token : string, id : number) =>await DeleteTeacherById(token, id);

  const AddItem = async(token, name, country, phone, email, skills) => await AddTeacher(token, name, country, phone, email, skills);

  const EditItem = async(token, id, name, country, phone, email, skills) => await EditTeacher(token, id, name, country, phone, email, skills);
  
  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    else{
      setToken(userInfo.token);
    }
  },[])

  return (
    <>
    {
      userInfo && token && <CommonLayout>
          <GenericTable onRef={childRef} columns={columns} dataType={TableDataType.Teacher} GetItems={GetItems} DeleteItemById={DeleteItemById} AddItem={AddItem} EditItem={EditItem}/>
      </CommonLayout>
    }
    </>

  )
}

