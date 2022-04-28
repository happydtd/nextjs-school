import React from 'react'
import { Row, Col,Space, Input} from 'antd';

export default function CourseSchedule() {
  return (
    <>
        <Row gutter={16}>
            <Col className="gutter-row" span={12}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div >Course Name</div>
                    <Input placeholder="course Name" />
                </Space>
            </Col>
            <Col className="gutter-row" span={12}>

            </Col>
        </Row>
    </>
  )
}
