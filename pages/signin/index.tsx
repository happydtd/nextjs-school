import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import Login from '../../components/Login'
const { Header, Content, Footer } = Layout;
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';

export default function Signin() {
  const router = useRouter();
  const handleClick = e => {
    const {key} = e;

    switch (key){
      case 'home':
        console.log('home');
        router.push('/')
        break;
      case 'signin':
        console.log('signin');
        router.push('/Login')
        break;
      case 'signup':
        console.log('signup');
        router.push('/')
        break;
    }
  };

  return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key={'home'}>Home</Menu.Item>
            <Menu.Item key={'signin'}>Sign in</Menu.Item>
            <Menu.Item key={'signup'}>Sign up</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row>
                <Col span={8}></Col>
                <Col span={8}><Login/></Col>
                <Col span={8}></Col>
            </Row>
           </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  )
}