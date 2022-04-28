import React, { Children, useContext, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link'
import { Store } from '../../Utils/Store'
//import './CommonLayout.css'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  const pathmapping = [{name:'CMS MANAGER SYSTEM', path:'/overview'},{name:'Overview', path:'/overview'},{name:'Student List', path:'/student'}, {name:'Teacher List', path:'/teacher'}, {name:'All Courses', path:'/course'}, {name:'Add Course', path:'/course/add-course'}, {name:'Edit Course', path:'/course/edit-course'} ]
  const { state, dispatch } = useContext(Store);
  const { path } = state;
  //const [path, setPath] = useState([]);
  console.log('render path',path);
  const handleMenuClick = (props)=>{
    const {keyPath} = props;
    const newPath = ['CMS MANAGER SYSTEM',...keyPath.slice().reverse()];
    dispatch({
      type: 'PATH',
      payload: newPath,
    })
    //setPath(newPath);
  }

  const handleBreadcrumbItemClick =(e, p)=>{
    let indexNo = path?.indexOf(p);
    const newPath = [...path.slice(0,indexNo+1)];
    console.log('Breadcrumb path',newPath);
    dispatch({
      type: 'PATH',
      payload: newPath,
    })
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
          path?.map((p)=>{
            //console.log('path',path)
            const result = pathmapping.find((pm)=>pm.name === p)
            //console.log('result',result);
            return (<Breadcrumb.Item key={p} onClick={(e)=>handleBreadcrumbItemClick(e, p)}>
              <Link href={result?.path??"/overview"}>
              {p}
              </Link>
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
