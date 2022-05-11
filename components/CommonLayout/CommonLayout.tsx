import React, { Children, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link'
import {Store} from '../../Utils/Store'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const role  = userInfo?.userInfo.role;
  const router = useRouter()
  const location = router.pathname // or router.asPath
  const pathnames = location.split("/");


  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="Headeroverview">
          <Link href="/overview">
            <a>CMS</a>
          </Link>
        </Menu.Item>
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
          <Menu.Item key="Overview" icon={<UserOutlined />}>
            <Link href="/overview">
              <a>Overview</a>
            </Link>
          </Menu.Item>
          <SubMenu key="Student" icon={<LaptopOutlined />} title="Student">
            <Menu.Item key="Student List">
              <Link href="/student">
                <a>Student List</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Teacher" icon={<NotificationOutlined />} title="Teacher">
            <Menu.Item key="Teacher List">
              <Link href="/teacher">
                <a>Teacher List</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Course" icon={<NotificationOutlined />} title="Course">
            <Menu.Item key="All Courses">
              <Link href="/course">
                <a>All Courses</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Add Course">
              <Link href="/course/add-course">
                <a>Add Courses</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="Edit Course">
              <Link href="/course/edit-course">
                <a>Edit Courses</a>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="Message" icon={<NotificationOutlined />} title="Message">
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        {
          pathnames.length >0? (
            <Breadcrumb.Item>
              <Link href="/overview">Home</Link> 
            </Breadcrumb.Item>)
          :(
            <Breadcrumb.Item>Home</Breadcrumb.Item>)
        }
        {
          pathnames.map((path, index)=>{
            const routeTo = `/${pathnames.slice(0, index+1).join("/")}`;
            const isLast = index === pathnames.length -1;
            return isLast?(
              <Breadcrumb.Item>{path}</Breadcrumb.Item>
            )
            :(
              <Breadcrumb.Item>
                <Link key={index} href={routeTo}>{path}</Link> 
              </Breadcrumb.Item>
            )
          })
        }
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
