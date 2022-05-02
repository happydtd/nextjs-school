import React from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber, TimePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function CourseSchedule(props) {
  const { Option } = Select;
  const {next} = props;
  const {prev} = props;

  const [form] = Form.useForm();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const onFinish = (values: any) => {
    //console.log('Received values of form: ', values);
    
    console.log('field values', form.getFieldsValue(true))
    //next();
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
                      name={[name, 'chapterName']}
                      rules={[{ required: true, message: 'Missing Chapter Name' }]}
                    >
                      <Input placeholder="Chapter Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'chapterContent']}
                      rules={[{ required: true, message: 'Missing Chapter Content' }]}
                    >
                      <Input placeholder="Chapter Content" />
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
          <Form.List name="classTimes">
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
