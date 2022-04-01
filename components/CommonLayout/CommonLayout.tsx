import React, { Children } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
//import './CommonLayout.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="Overview" icon={<UserOutlined />} title="Overview">
          </SubMenu>
          <SubMenu key="Student" icon={<LaptopOutlined />} title="Student">
            <Menu.Item key="1">Student List</Menu.Item>
          </SubMenu>
          <SubMenu key="Teacher" icon={<NotificationOutlined />} title="Teacher">
            <Menu.Item key="2">option9</Menu.Item>
          </SubMenu>
          <SubMenu key="Coures" icon={<NotificationOutlined />} title="Coures">
          </SubMenu>
          <SubMenu key="Message" icon={<NotificationOutlined />} title="Message">
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}
