import React from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import CommonLayout from '../../components/CommonLayout/CommonLayout';
import Link from 'next/link'

export default function Teacher() {
 
  return (
    <CommonLayout>
          <>
            <Row>
            <Col span={24}>col</Col>
            </Row>
            <Row>
            <Col span={12}>col-12</Col>
            <Col span={12}>col-12</Col>
            </Row>
            <Row>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            <Col span={8}>col-8</Col>
            </Row>
            <Row>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            <Col span={6}>col-6</Col>
            </Row>
        </>
    </CommonLayout>
  )
}

