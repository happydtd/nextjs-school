import React, { Children, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link'
import {Store} from '../../Utils/Store'
import 'antd/dist/antd.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  const { state, dispatch } = useContext(Store);
  const { userInfo} = state;
  const [ role, setRole] = useState(null);
  const [ hrefByRole, setHrefByRole] = useState(null);
  const [ pathnames, setPathnames] = useState(null);
  const router = useRouter()


  useEffect(()=>{
    setRole(userInfo?.userInfo.role);
    setHrefByRole(`/dashboard/${userInfo?.userInfo.role}`);
  },[userInfo])

  useEffect(()=>{
    setPathnames(router.pathname.split("/").filter(p=>p!==''&& p!=='dashboard' && p!=='manager'));
  },[])

  console.log("userInfo", userInfo)
  console.log("pathnames", pathnames)

  return (
    <>
      {
        role && pathnames && <Layout>
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
                <Link href={`${hrefByRole}/overview`}>Overview</Link>
              </Menu.Item>

              {(role === 'teacher') &&  <Menu.Item key="Schedule" icon={<UserOutlined />}>
                <Link href={`${hrefByRole}/schedule`}>Class Schedule</Link>
              </Menu.Item>}

              <SubMenu key="Student" icon={<LaptopOutlined />} title="Student">
                <Menu.Item key="Student List">
                  <Link href={`${hrefByRole}/students`}>Student List</Link>
                </Menu.Item>
              </SubMenu>
              {(role !== 'teacher') && <SubMenu key="Teacher" icon={<NotificationOutlined />} title="Teacher">
                <Menu.Item key="Teacher List">
                  <Link href={`${hrefByRole}/teachers`}>Teacher List</Link>
                </Menu.Item>
              </SubMenu>}
              <SubMenu key="Course" icon={<NotificationOutlined />} title="Course">
                <Menu.Item key="All Courses">
                  {/* <Link href="courses">All Courses</Link> */}
                  <Link href={`${hrefByRole}/courses`}>All Courses</Link>
                </Menu.Item>
                <Menu.Item key="Add Course">
                  {/* <Link href="courses/add-course">Add Courses</Link> */}
                  <Link href={`${hrefByRole}/courses/add-course`}>Add Courses</Link>
                </Menu.Item>
                <Menu.Item key="Edit Course">
                  {/* <Link href="courses/edit-course">Edit Courses</Link> */}
                  <Link href={`${hrefByRole}/courses/edit-course`}>Edit Courses</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Messages" icon={<NotificationOutlined />} title="Message">
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            {
              pathnames.map((path, index)=>{
                const routeTo = `/${pathnames.slice(0, index+1).join("/")}`;
                const isLast = index === pathnames.length -1;
                return isLast?(
                  <Breadcrumb.Item key={index} >{path}</Breadcrumb.Item>
                )
                :(
                  <Breadcrumb.Item key={index} >
                    <Link href={routeTo}>{path}</Link> 
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
      }
    </>

  )
}
