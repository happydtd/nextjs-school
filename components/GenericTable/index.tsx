import React, { useEffect, useContext, useState, useImperativeHandle, useRef, useCallback} from 'react'
import { Row, Col, Table, Tag, Space, Button, Input, message, Popconfirm,Modal} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import StudentForm from '../../components/Student';

// import { Store } from '../../Utils/Store'
import 'antd/dist/antd.css';
import TeacherForm from '../Teacher';
import {useAppSelector, useAppDispatch} from '../../Store/configureStore'
import { StudentsData, Student, Type, AxiosResponseGetStudentsData } from '../../models/AxiosResponseGetStudents.interface';
import { TeachersData, Teacher, AxiosResponseGetTeachersData } from '../../models/AxiosResponseGetTeachers.interface';
import { AxiosResponseDeleteStudent } from '../../models/AxiosResponseDeleteStudent.interface';

interface Props{
    onRef: any
    columns: any
    dataType: TableDataType
    GetItems: (token:string,  search: string, userId: number, page: number, pageSize: number) => Promise<AxiosResponseGetStudentsData|AxiosResponseGetTeachersData>
    DeleteItemById: (token, id) => Promise<AxiosResponseDeleteStudent>
    AddItem:any
    EditItem:any
  }

export enum TableDataType{
  Student = 'student',
  Teacher = 'teacher',
}

const GenericTable: React.FC<Props> = (props: Props) => {
  const {onRef, columns, dataType, GetItems, DeleteItemById, AddItem, EditItem} = props;
  // const { state, dispatch } = useContext(Store);
  const [ item, setItem] = useState<Student|Teacher>(null);
  const [ loading, setLoading] = useState(false);
  const [ page, setPage] = useState(1);
  const [ pageSize, setPageSize] = useState(15);
  const [ items, setItems] = useState<Student[]|Teacher[]>(null);
  const [ total, setTotal] = useState(0);
  const [ search, setSearch] = useState(null);
  const [ modalTitle, setmodalTitle] = useState("");
  const [ actionType, setActionType] = useState("");
  const [ visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const inputRef = useRef(null);



  useEffect(()=>{
    if(userInfo){
      setToken(userInfo.token);
      setUserId(userInfo.userId);
    }
  },[userInfo]);

  const callAPI = useCallback(async () =>{
    try{
        setLoading(true);
        const result  = await GetItems(token, search, userId, page, pageSize);
        setTotal(result.data.total)
        if (dataType === TableDataType.Student ){
          setItems((result.data as StudentsData).students);
        }
        else{
          setItems((result.data as TeachersData).teachers);
        }
            
    }
    catch(error){
      console.log("error", error)
    }
    finally{
      setLoading(false);
    }
  },[GetItems, dataType, page, pageSize, search, token, userId]);

  useEffect(()=>{
    if (page && pageSize && token && userId)
      callAPI();
  },[page, pageSize, token, userId, callAPI])



  useImperativeHandle(onRef, ()=>({
    handleDeleteItem : async (id)=>{
      await DeleteItemById(token, id);
      const result  = await GetItems(token, search, userId, page, pageSize);
      setTotal(result.data.total)
      if (dataType === TableDataType.Student )
          setItems((result.data as StudentsData).students);
      else
          setItems((result.data as TeachersData).teachers);
    },

    handleEdit : (id, name, country, email, type, skills, phone )=>{
      setmodalTitle(`Edit ${dataType}`);
      setActionType("Edit");
      if (dataType === TableDataType.Student ){
        setItem({id, name, country, email, type })
      }
      else
        setItem({id, name, country,  phone, email, skills})
      setVisible(true);
    },
  }));

  const handleOK = async (values) => {
    setConfirmLoading(true);
    const { name, email, country, studentType, phone, skills } = values;
    let result1;

    if (dataType === TableDataType.Student){
      
      if(actionType === 'Add' )
      {
            result1  = await AddItem(token, name, country, email, +studentType);
      }
      else
      {
            result1  = await EditItem(token, item.id, name, country, email, +studentType);
      }
    }
    else{
      if(actionType === 'Add' )
      {
        console.log('add teacher');
            result1  = await AddItem(token, name, country, phone, email, skills);
      }
      else
      {
            result1  = await EditItem(token, item.id, name, country, phone, email, skills);
      }
    }


    const result  = await GetItems(token, search, userId, page, pageSize);


    setVisible(false);
    setTotal(result.data.total)

    if (dataType === TableDataType.Student){
    setItems((result.data as StudentsData).students);
    }
    else{
      setItems((result.data as TeachersData).teachers);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async ()=>{

      setSearch(inputRef.current.input.value);
      const result  = await GetItems(token, inputRef.current.input.value, userId, page, pageSize);
      setTotal((result.data as StudentsData).total)
      setItems((result.data as StudentsData).students);
  }

  const handleAdd = ()=>{
    setItem(null);
    setmodalTitle(`Add ${dataType}`);
    setActionType("Add");
    setVisible(true);
  }

  return (
    <div>
      <Row>
        <Col span={2}>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Add
            </Button></Col>
        <Col span={18}></Col>
        <Col span={4}>
          <Row>
              <Col span={21}>
                <Input placeholder="Search by name" ref={inputRef}/>
              </Col>
              <Col span={3}><Button icon={<SearchOutlined />} onClick={handleSearch}/></Col>
          </Row>
          </Col>
      </Row>
          <Row>
             <Col span={24}>
                 <Table<Student|Teacher>
                 rowKey={record=>record.id}
                 loading={loading}
                 columns={columns}
                 dataSource={items}
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
         </Row>
          <Modal
            title={modalTitle}
            visible={visible}
            footer={null}
            confirmLoading={confirmLoading}
            onCancel={()=>setVisible(false)}
          >
              {dataType === TableDataType.Student? 
                  <StudentForm parentOnOK={handleOK} parentOnCancel={handleCancel} actionType={actionType} student= {item as Student}></StudentForm>
              :
                  <TeacherForm parentOnOK={handleOK} parentOnCancel={handleCancel} actionType={actionType} teacher= {item as Teacher}></TeacherForm>}
          </Modal>
    </div>
  )
}

export default GenericTable
