import React from 'react'
import { Avatar, Card, Col, Row, Space, Typography, Progress  } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const OverviewCard = (props) => {
    const {title, total, percent } = props
    const { Meta } = Card;
    const { Text, Link } = Typography;
  return (
    <>
        <Card style={{ width: '100%' }}>
            <Meta
            avatar={<Avatar icon={<UserOutlined />}/>}
            description={ 
                <>
                <Row gutter={16}>
                    <Col span={24}>
                    <Space direction="vertical">
                        <Text>{title}</Text>
                        <Text>{total}</Text>
                        <Progress percent={percent} showInfo={false}/>
                        <Text>{ Math.round(percent) }% increase in 30 days</Text>
                    </Space>
                    </Col>
                </Row>
                </>
                }
            />
        </Card>
    </>
  )
}

export default OverviewCard;
