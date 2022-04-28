import React from 'react'
import { Row, Col, Divider, Space, Input ,Typography, Select ,DatePicker, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const { Text} = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

export default function CourseDetail() {
  return (
    <>
        <Row gutter={16}>
            <Col className="gutter-row" span={8}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div ><Text type="danger">*</Text> Course Name</div>
                    <Input placeholder="course Name" />
                </Space>
            </Col>
            <Col className="gutter-row" span={5}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div ><Text type="danger">*</Text> Teacher</div>
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Space>
            </Col>
            <Col className="gutter-row" span={5}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div ><Text type="danger">*</Text> Type</div>
                    <Input placeholder="type" />
                </Space>
            </Col>
            <Col className="gutter-row" span={6}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div ><Text type="danger">*</Text> Course Code</div>
                    <Input placeholder="Course Code" disabled/>
                </Space>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col className="gutter-row" span={8}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                         <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <div >Start Date</div>
                            <DatePicker/>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <div ><Text type="danger">*</Text> Price</div>
                            <Input prefix="$" />
                        </Space>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <div ><Text type="danger">*</Text> Student Limit</div>
                            <Input placeholder="Student Limit" />
                        </Space>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <div ><Text type="danger">*</Text> Duration</div>
                            <Input.Group compact>
                                <Input placeholder="Duration" />
                                <Select style={{ width: '30%' }} defaultValue="month">
                                    <Option value="month">month</Option>
                                    <Option value="week">week</Option>
                                </Select>
                            </Input.Group>
                          
                        </Space>
                    </Col>
                </Row>
            </Col>
            <Col className="gutter-row" span={8}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div ><Text type="danger">*</Text> Description</div>
                    <TextArea rows={8} />
                </Space>
            </Col>
            <Col className="gutter-row" span={8}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div >Cover</div>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    </Dragger>
                </Space>
            </Col>

        </Row>
    </>
  )
}
