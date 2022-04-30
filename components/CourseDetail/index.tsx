import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber } from 'antd';
import { useRouter } from 'next/router';
import { Store } from '../../Utils/Store'
import { GetTeachers, GetCourseTypes, GetCourseCode, AddCourse} from '../../serverAPI';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Teacher from '../../models/teacher.interface';
import Course, { CourseType } from '../../models/course.interface';

const { Text} = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function CourseDetail(props) {
  const {next} = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const { token } = userInfo.userInfo;
  const [ teachers, setTeachers] = useState<Teacher[]>();
  const [ courseTypes, setCourseTypes] = useState<CourseType[]>();
  const [courseCode, setCourseCode] = useState<string>()

  async function callAPI(){ 
    try{
        const teacherResult  = await GetTeachers(token);
        setTeachers(teacherResult.data.data.teachers);

        const courseTypeResult  = await GetCourseTypes(token);
        setCourseTypes(courseTypeResult.data.data);

        const courseCodeResult  = await GetCourseCode(token)
        setCourseCode(courseCodeResult.data.data);
    }
    catch(error){
      console.log("error", error)
    }
  };


  useEffect(()=>{
    if (!userInfo) {
      router.push('/signin');
    }
    callAPI();
  },[])

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const course:Course = {name : values.courseName,
       uid: values.courseCode, 
       detail: values.description, 
       teacherId: values.teacher, 
       type: [[...courseTypes][0]], 
       price: values.price, 
       maxStudents: values.studentLimit, 
       duration:values.duration, 
       durationUnit:1};
    console.log('course: ', course);
    const addcourseresult = await AddCourse(token, course);
    console.log('addcourseresult: ', addcourseresult);
    next();
  };


  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}
      >
        <Option value="1">day</Option>
        <Option value="2">week</Option>
        <Option value="3">month</Option>
        <Option value="4">year</Option>
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

    if (!teachers) return (<h1>teacher is null</h1>)
    if (!courseTypes) return (<h1>courseTypes is null</h1>)
    if (!courseCode) return (<h1>courseCode is null</h1>)

  return (
    <Form
      form={form}
      layout="vertical"
      name="course-detail"
      onFinish={onFinish}
      initialValues={{
        ["teacher"]: teachers[0].name,
        ["type"]: courseTypes[0].name,
        ["suffix"]:"day",
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
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Create Course
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
