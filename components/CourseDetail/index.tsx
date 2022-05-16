import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import { Store } from '../../Utils/Store'
import { GetTeachers, GetCourseTypes, GetCourseCode, AddCourse, UpdateCourse} from '../../serverAPI';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Teacher from '../../models/teacher.interface';
import Course, { CourseType } from '../../models/course.interface';
import moment from 'moment';

const { Text} = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function CourseDetail(props) {
  const {next, editDetail , addAction, token} = props;
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(Store);
  const [ teachers, setTeachers] = useState<Teacher[]>();
  const [ courseTypes, setCourseTypes] = useState<CourseType[]>();
  const [ courseCode, setCourseCode] = useState<string>();

  useEffect(()=>{
    if (token)
      async ()=> await callAPI();
  },[editDetail])

  async function callAPI(){ 
    try{
        const teacherResult  = await GetTeachers(token);
        setTeachers(teacherResult.data.data.teachers);

        const courseTypeResult  = await GetCourseTypes(token);
        setCourseTypes(courseTypeResult.data.data);

        if (addAction){
          const courseCodeResult  = await GetCourseCode(token)
          setCourseCode(courseCodeResult.data.data);
        }

        if(editDetail)
          setCourseCode(editDetail.uid);
    }
    catch(error){
      console.log("error", error)
    }
  };

  if (editDetail){
    
    form.setFieldsValue({
        courseName:editDetail.name,
        courseCode:editDetail.uid,
        description: editDetail.detail,
        teacher: editDetail.teacherId,
        type:editDetail.type?.map((t)=>{ return t.id }),
        price: editDetail.price,
        studentLimit:editDetail.maxStudents,
        duration:editDetail.duration,
        suffix: editDetail.durationUnit,
        startDate: moment(editDetail.startTime),
    });
  }

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    
    const course:Course = {
       name : values.courseName,
       uid: values.courseCode, 
       detail: values.description, 
       teacherId: values.teacher, 
       type: values.type, 
       price: values.price, 
       maxStudents: values.studentLimit, 
       duration:values.duration, 
       durationUnit:1,
       startTime: moment(values.startDate).format('YYYY-MM-DD'),
       cover:"test cover"};

    if (addAction){
      const addCourseresult = await AddCourse(token, course);
      dispatch({
        type: 'NEWCOURSE',
        payload: addCourseresult.data.data,
      })
    }
    else{
      course.id = editDetail.id;
      const editCourseresult = await UpdateCourse(token, course);
      if (editCourseresult.status !== 200)
      {
        throw new Error("Could not update coures!");
      }
      dispatch({
        type: 'NEWCOURSE',
        payload: editCourseresult.data.data,
      })
    }

    next();
  };


  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value={1}>day</Option>
        <Option value={2}>week</Option>
        <Option value={3}>month</Option>
        <Option value={4}>year</Option>
      </Select>
    </Form.Item>
  );

  const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    
  return (
    <>
    {
      teachers && courseTypes && courseCode &&
        <Form
          form={form}
          layout="vertical"
          name="course-detail"
          onFinish={onFinish}
          initialValues={{
            ["suffix"]: 1,
            ["courseCode"]:courseCode
          }}
        >
          <Row gutter={24}>
             <Col className="gutter-row" span={8}>
                <Form.Item
                    label="Course Name"
                    name="courseName"
                    rules={[{ required: true, message: 'Please input Course Name!' }]}
                >
                    <Input/>
                </Form.Item>
             </Col>
             <Col className="gutter-row" span={5}>
                <Form.Item name="teacher" label="Teacher" rules={[{ required: true }]}>
                    <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    >
                      {
                        teachers.map((teacher, index)=>{
                          return (
                            <Option key={index} value={teacher.id}>{teacher.name}</Option>
                          )
                        })
                      }
                    </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={5}>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{ required: true, message: 'Please input Type!' }]}
                >
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      style={{ width: '100%' }}
                    >
                      {courseTypes.map((ct, index)=>{return (<Option key={index} value={ct.id}>{ct.name}</Option>)})}
                    </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={6}>
                <Form.Item
                    label="Course Code"
                    name="courseCode"
                >
                    <Input disabled/>
                </Form.Item>
              </Col>
          </Row>
    
          <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label="Start Date"
                                name="startDate"
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label="Price"
                                name="price"
                                rules={[{ required: true, message: 'Please input Price!' }]}
                            >
                                <InputNumber addonBefore="$" style={{ width: '100%' }}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                label="Student Limit"
                                name="studentLimit"
                                rules={[{ required: true, message: 'Please input Student Limit!' }]}
                            >
                                <InputNumber  />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                name="duration"
                                label="Duration"
                                rules={[{ required: true, message: 'Please input Duration amount!' }]}
                            >
                                <InputNumber addonAfter={suffixSelector} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
    
                <Col className="gutter-row" span={8}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input Description' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Form.Item label="Dragger">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="">
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>
                </Col>
          </Row>
    
          <Row>
            <Col span={24} style={{ textAlign: 'left' }}>
              <Button type="primary" htmlType="submit">
                {addAction? "Create Course" : "Update Course"}
              </Button>
            </Col>
          </Row>
        </Form>
    }
    </>

  )
}
