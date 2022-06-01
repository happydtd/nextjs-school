import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../Store/configureStore';
import { logout } from '../../Store/AuthSlice';
import { useRouter } from 'next/router'

const UserIconDropdown = () => {
  const router = useRouter();

  const handleLogout =()=>{
    reduxDispatch(logout(null));
    router.push(`/`);
  }
  
  const reduxDispatch = useAppDispatch();

    const userMenu = (
        <Menu>
          <Menu.Item key="1">Profile</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
        </Menu>
      );

  return (
     <Dropdown.Button
        style={{ float: 'right', marginTop: '20px'}}
        className="dropdown-btn"
        overlay={userMenu}
        icon={
          <UserOutlined
            style={{
              fontSize: '28px',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
            }}
          />
        }
      ></Dropdown.Button>
  )
}

export default UserIconDropdown;
