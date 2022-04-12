import React, { useEffect, useContext, useState, useImperativeHandle, useRef} from 'react'
import { Row, Col, Table, Tag, Space, Button, Input, message, Popconfirm,Modal} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import StudentForm from '../../components/Student';
import { useRouter } from 'next/router';
import { Store } from '../../Utils/Store'
import 'antd/dist/antd.css';

interface Props{
    onRef: any
    columns: any
    dataType: string
    GetItems: any
    DeleteItemById: any
    AddItem:any
    EditItem:any
  }

const GenericTable: React.FC<Props> = (props: Props) => {
  const {onRef, columns, dataType, GetItems, DeleteItemById, AddItem, EditItem} = props;
  const { state, dispatch } = useContext(Store);
  const [ item, setItem] = useState(null);
  const [ loading, setLoading] = useState(false);
  const [ page, setPage] = useState(1);
  const [ pageSize, setPageSize] = useState(15);
  const [ items, setItems] = useState([]);
  const [ total, setTotal] = useState(0);
  const [ search, setSearch] = useState(null);
  const [ modalTitle, setmodalTitle] = useState("");
  const [ actionType, setActionType] = useState("");
  const [ visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
  const inputRef = useRef(null);
  const router = useRouter();

  async function callAPI(){
    try{
        setLoading(true);
        const result  = await GetItems(token, search, page, pageSize);
        console.log(result);
        setTotal(result.data.data.total)
        if (dataType === "student" )
            setItems(result.data.data.students);
        else
            setItems(result.data.data.teachers);
    }
    catch(error){
      console.log("error", error)
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    callAPI();
  },[page, pageSize])

  useImperativeHandle(onRef, ()=>({
    handleDeleteItem : async (id)=>{
      await DeleteItemById(token, id);
      const result  = await GetItems(token, search, page, pageSize);
      setTotal(result.data.data.total)
      if (dataType === "student" )
          setItems(result.data.data.students);
      else
          setItems(result.data.data.teachers);
    },

    handleEdit : (id, name, country, email, studentType )=>{
      setmodalTitle(`Edit ${dataType}`);
      setActionType("Edit");
      setItem({id, name, country, email, studentType})
      setVisible(true);
    },
  }));

  const handleOK = async (values) => {
    console.log("values", values)
    const { name, email, area, studentType} = values;
    setConfirmLoading(true);
    let result1;
    if(actionType === 'Add' )
    {
          result1  = await AddItem(token, name, area, email, +studentType);
    }
    else
    {
          result1  = await EditItem(token, item.id, name, area, email, +studentType);
    }
    const result  = await GetItems(token, search, page, pageSize);
    setVisible(false);
    setTotal(result.data.data.total)
    setItems(result.data.data.students);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async ()=>{

      setSearch(inputRef.current.input.value);
      const result  = await GetItems(token, inputRef.current.input.value, page, pageSize);
      setTotal(result.data.data.total)
      setItems(result.data.data.students);
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
                 <Table
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
          >
              {dataType === 'student'? 
                  <StudentForm parentOnOK={handleOK} parentOnCancel={handleCancel} actionType={actionType} student= {item}></StudentForm>
              :
                  <StudentForm parentOnOK={handleOK} parentOnCancel={handleCancel} actionType={actionType} student= {item}></StudentForm>}
          </Modal>
    </div>
  )
}

export default GenericTable
