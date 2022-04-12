import React, { Children, useContext, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Store } from '../../Utils/Store'
//import './CommonLayout.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  const pathmapping = [{name:'CMS MANAGER SYSTEM', path:'/overview'},{name:'Overview', path:'/overview'},{name:'Student List', path:'/student'}, {name:'Teacher List', path:'/teacher'} ]
  const { state, dispatch } = useContext(Store);
  const { path } = state;
  //const [path, setPath] = useState([]);
  console.log('path',path);
  const handleMenuClick = (props)=>{
    const {keyPath} = props;
    const newPath = ['CMS MANAGER SYSTEM',...keyPath.slice().reverse()];
    dispatch({
      type: 'PATH',
      payload: newPath,
    })
    //setPath(newPath);
  }

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
          onClick={handleMenuClick}
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
          <SubMenu key="Coures" icon={<NotificationOutlined />} title="Coures">
          </SubMenu>
          <SubMenu key="Message" icon={<NotificationOutlined />} title="Message">
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        {
          path?.map((p, i)=>{
            const result = pathmapping.find((pm)=>pm.name === p)
            console.log('result',result);
            return (<Breadcrumb.Item key={i} >
              <a href={result.path}>
              {p}
              </a>
              </Breadcrumb.Item>)
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
