import React from 'react'
import { Row, Col, Divider, Space } from 'antd';


export default function CourseDetail() {
  return (
    <>
        <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div >Course Name</div>
                    <div >Course Name2</div>
                </Space>
            </Col>
            <Col className="gutter-row" span={6}>
                <div >Teacher</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div >Type</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div >Course Code</div>
            </Col>
        </Row>
    </>
  )
}
