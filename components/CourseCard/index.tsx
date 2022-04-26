import React from 'react'
import { Card ,Row, Col, Divider, Typography, Button} from 'antd';
import { HeartFilled ,UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Course from '../../models/course.interface';
import Link from 'next/link';

interface CourseCardProp {
    course: Course
}

export default function CourseCard({course}:CourseCardProp) {
  const style = { background: '#0092ff', padding: '8px 0' };
  return (
    <>
        <Card title="Default size card" hoverable
          cover={
              <Image
              alt="Next.js logo"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              width={300}
              height={150}
              />}>
            <Row gutter={16}>
              <Col className="gutter-row" span={24}>
                <div><Typography>{course.name}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <div><Typography>{course.createdAt}</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
              <div><Typography><HeartFilled style={{color:'red'}}/> {course.star}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <div><Typography>Duration:</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
              <div><Typography>{course.duration} years</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <div><Typography>Teacher:</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
              <div><Typography>{course.teacherName}</Typography></div>
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
              <div><Typography><UserOutlined /> Student Limit:</Typography></div>
              </Col>
              <Col className="gutter-row" span={12}>
              <div><Typography>{course.maxStudents}</Typography></div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <Button type="primary">
                  <Link href={'/course/'+ course.id}>
                    <a>Read More</a>
                  </Link>
                </Button>
              </Col>
              <Col className="gutter-row" span={6}/>
              <Col className="gutter-row" span={6}/>
            </Row>
        </Card>
    </>
  )
}
