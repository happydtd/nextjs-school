import React from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function CourseSchedule(props) {
  const { Option } = Select;
  const {next} = props;

  const [form] = Form.useForm();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
         <Col className="gutter-row" span={12}>
  
          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Row gutter={12}  key={field.key} >
                    <Space align="baseline">
                      <Form.Item
                        {...field}
                        label="Chapter Name"
                        name={[field.name, 'chapterName']}
                        rules={[{ required: true, message: 'Missing Chapter Name' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Chapter conent"
                        name={[field.name, 'chapterContent']}
                        rules={[{ required: true, message: 'Missing Chapter Name' }]}
                      >
                        <Input />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  </Row>
                ))}

                <Row gutter={12} >
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Chapter
                    </Button>
                  </Form.Item>
                </Row>
              </>
            )}
          </Form.List>

         </Col>
         <Col className="gutter-row" span={12}>
          <Form.List name="classTimes">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Row gutter={12}  key={field.key} >
                      <Space key={field.key} align="baseline">
                        <Form.Item
                          {...field}
                          label="Class times day"
                          name={[field.name, 'classTimeDay']}
                          rules={[{ required: true, message: 'Missing Class Time' }]}
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
                          {...field}
                          label="Class times"
                          name={[field.name, 'classTimeTime']}
                          rules={[{ required: true, message: 'Missing Class Time' }]}
                        >
                          <TimePicker />
                        </Form.Item>

                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </Space>
                    </Row>
                  ))}
                  <Row gutter={12}>
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Chapter
                      </Button>
                    </Form.Item>
                  </Row>
                </>
              )}
            </Form.List>
          </Col>
      </Row>
    </Form>
  )
}
