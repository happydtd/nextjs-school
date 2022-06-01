import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import { useRouter } from 'next/router'
import {useAppSelector, useAppDispatch} from '../../Store/configureStore'
const { Header, Content, Footer } = Layout;


export default function HomeLayout({children}) {
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const router = useRouter();
  const handleClick = e => {
    const {key} = e;

    switch (key){
      case 'home':
        router.push('/')
        break;
      case 'signin':
        router.push('/signin')
        break;
    }
  };

  useEffect(()=>{
    if (userInfo)
      router.push(`/dashboard/${userInfo.role}/overview`)
  },[userInfo, router])


  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu onClick={handleClick} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key={'home'}>Home</Menu.Item>
        {!userInfo && <Menu.Item key={'signin'}>Sign in</Menu.Item>}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
          {children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  )
}
