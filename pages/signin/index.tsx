import React from 'react';
import Login from '../../components/Login'
import { Row, Col } from 'antd';
import HomeLayout from '../../components/HomeLayout';

export default function Signin() {
  return (
    <HomeLayout>
        <Row>
            <Col span={8}></Col>
            <Col span={8}><Login/></Col>
            <Col span={8}></Col>
        </Row>
    </HomeLayout>
  )
}