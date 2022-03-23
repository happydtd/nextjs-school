import React from 'react';
import RegistrationForm from '../../components/Registration'
import { Row, Col } from 'antd';
import HomeLayout from '../../components/HomeLayout';

export default function Signup() {
  return (
    <HomeLayout>
      <Row>
          <Col span={8}></Col>
          <Col span={8}><RegistrationForm /></Col>
          <Col span={8}></Col>
      </Row>
    </HomeLayout>
  )
}