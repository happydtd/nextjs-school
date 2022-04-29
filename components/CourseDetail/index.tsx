import React, { useState } from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message, Form, Button, InputNumber } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Text} = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

// const props = {
//     name: 'file',
//     multiple: true,
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     onChange(info) {
//       const { status } = info.file;
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`);
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     onDrop(e) {
//       console.log('Dropped files', e.dataTransfer.files);
//     },
//   };

export default function CourseDetail(props) {
    const {next} = props;
    const [form] = Form.useForm();
    
      const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        next();
      };

      const onGenderChange = (value: string) => {
        switch (value) {
          case 'male':
            form.setFieldsValue({ note: 'Hi, man!' });
            return;
          case 'female':
            form.setFieldsValue({ note: 'Hi, lady!' });
            return;
          case 'other':
            form.setFieldsValue({ note: 'Hi there!' });
        }
      };

      const suffixSelector = (
        <Form.Item name="suffix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="USD">$</Option>
            <Option value="CNY">¥</Option>
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
    <Form
      form={form}
      layout="vertical"
      name="course-detail"
      onFinish={onFinish}
    >
      <Row gutter={24}>
         <Col className="gutter-row" span={8}>
            <Form.Item
                label="Course Name"
                name="courseName"
                rules={[{ required: true, message: 'Please input Course Name!' }]}
            >
                <Input />
            </Form.Item>
         </Col>
         <Col className="gutter-row" span={5}>
            <Form.Item name="teacher" label="Teacher" rules={[{ required: true }]}>
                <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
                >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
                </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={5}>
            <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please input Type!' }]}
            >
                <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item
                label="Course Code"
                name="courseCode"
                rules={[{ required: true, message: 'Please input Course Code!' }]}
            >
                <Input />
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
                            label="Student Limit"
                            name="studentLimit"
                            rules={[{ required: true, message: 'Please input Student Limit!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name="donation"
                            label="Donation"
                            rules={[{ required: true, message: 'Please input donation amount!' }]}
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
                    <Upload.Dragger name="files" action="/upload.do">
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
