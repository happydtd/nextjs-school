import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Link from 'next/link'
import { Layout, Menu} from 'antd';
import RegistrationForm from '../components/Registration'
const { Header, Content, Footer } = Layout;

export default function Home() {
  return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key={1}>Home</Menu.Item>
            <Menu.Item key={2}>Sign in</Menu.Item>
            <Menu.Item key={3}>Sign up</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
              <RegistrationForm />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  )
}

