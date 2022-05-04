import React, { useContext } from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Store } from '../../Utils/Store'
import { AddOrUpdateSchedule } from '../../serverAPI';
import { Schedule } from "../../models/course.interface"
import moment from 'moment';

export default function CourseSchedule(props) {
  const { state, dispatch } = useContext(Store);
  const { course, userInfo } = state;
  const  token  = userInfo?.userInfo.token;
  const { Option } = Select;
  const {next} = props;

  const [form] = Form.useForm();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const onFinish = async (values: any) => {
    const chapters = form.getFieldValue("chapters")?.map((c, i)=>{return {name:c.name, order:i, content: c.content}});
    const classTime = form.getFieldValue("classTime")?.map((t)=>{return `${t.classDay} ${moment(t.classTime).format('HH:mm:ss')}`});
    const schedule : Schedule = {scheduleId: course.scheduleId,
       courseId: course.id,
        status: 0,
         current:0,
        chapters: chapters,
      classTime : classTime };
    const addcoursschedule = await  AddOrUpdateSchedule(token, schedule)
    console.log('addcoursschedule', addcoursschedule);
    next();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="course-detail"
      onFinish={onFinish}
    >
      <Row gutter={12}>
        <Col className="gutter-row" span={12}>Chapters</Col>
        <Col className="gutter-row" span={12}>Class times</Col>
      </Row>
       <Row gutter={12}>
         <Col className="gutter-row" span={12}>
          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: 'Missing Chapter Name' }]}
                    >
                      <Input placeholder="Chapter Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'content']}
                      rules={[{ required: true, message: 'Missing Chapter Content' }]}
                    >
                      <Input placeholder="Chapter content" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Chapter
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
         </Col>
         <Col className="gutter-row" span={12}>
          <Form.List name="classTime">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'classDay']}
                        rules={[{ required: true, message: 'Missing Day' }]}
                      >
                          <Select style={{ width: 130 }}>
                            {days.map(day => (
                              <Option key={day} value={day}>
                                {day}
                              </Option>
                            ))}
                          </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'classTime']}
                        rules={[{ required: true, message: 'Missing Time' }]}
                      >
                        <TimePicker placeholder="Select time" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Class Time
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>

  )
}
