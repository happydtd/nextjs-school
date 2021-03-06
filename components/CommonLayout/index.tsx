import React, { Children, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Link from 'next/link'
// import {Store} from '../../Utils/Store'
import 'antd/dist/antd.css';
import { logout } from '../../Store/AuthSlice';
// import { useDispatch} from 'react-redux';
import {useAppSelector, useAppDispatch} from '../../Store/configureStore'
import UserIconDropdown from '../UserIconDropdown/UserIconDropdown';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function CommonLayout({children} ) {
  //const { state, dispatch } = useContext(Store);
  //const { userInfo} = state;
  const userInfo = useAppSelector(state  => state.auth.UserInfo); 
  const [ role, setRole] = useState<string|null>(null);
  const [ hrefByRole, setHrefByRole] = useState<string|null>(null);
  const [ pathnames, setPathnames] = useState<string[]|null>(null);
  const router = useRouter();

  useEffect(()=>{
    if (userInfo){
      setRole(userInfo.role);
      setHrefByRole(`/dashboard/${userInfo.role}`);
    }
  },[userInfo])

  useEffect(()=>{
    setPathnames(router.pathname.split("/").filter(p=>p!==''&& p!=='dashboard' && p!=='manager'));
  },[router])

  return (
    <>
      {
        role && pathnames && <Layout>
        <Header className="header" >
          <div className="logo" />
          <Link href={`${hrefByRole}/overview`}>
            <a>CMS</a>
          </Link>
          <UserIconDropdown/>
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

              {(role === 'teacher' || role === 'student') &&  <Menu.Item key="Schedule" icon={<UserOutlined />}>
                <Link href={`${hrefByRole}/schedule`}>Class Schedule</Link>
              </Menu.Item>}

              {(role === 'manager' || role === 'teacher') && <SubMenu key="Student" icon={<LaptopOutlined />} title="Student">
                <Menu.Item key="Student List">
                  <Link href={`${hrefByRole}/students`}>Student List</Link>
                </Menu.Item>
              </SubMenu>}
              {(role === 'manager') && <SubMenu key="Teacher" icon={<NotificationOutlined />} title="Teacher">
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
