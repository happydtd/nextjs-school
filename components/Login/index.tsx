import React, { useEffect, useState, useContext } from 'react';
import 'antd/dist/antd.css';
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import {Radio, Form, Input, Select, Button, message} from 'antd';
import {reqSignIn} from '../../serverAPI/'
import NextLink from 'next/link';
import { Typography, Space } from 'antd';
import { useRouter } from 'next/router';
import {Store} from '../../Utils/Store'
import Cookies from 'js-cookie';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const { Text, Link } = Typography;

export default function LoginForm(){
  const { state, dispatch } = useContext(Store);
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(1);
  const router = useRouter();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const onFinish = (values) => {
    console.log('Received values of login form: ', values);
    const {email, password, role} = values
    async function callAPI(){
      try{
        const result  = await reqSignIn(email,password,role)
        console.log('call signin api result' ,result)
        if (result.status === 201){
          var token = result.data.data.token;
          var userInfo = result.data.data;
          dispatch({
            type: 'USER_LOGIN',
            payload: { userInfo },
          })

          router.push('/student');
        }
        else{
          message.error("error")
        }
      }
      catch(error){
        console.log("error", error)
      }
    };
    callAPI();

  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>

      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        initialValues={{ layout: formLayout }}
        scrollToFirstError
      >
      <h1>COURSE MANAGEMENT ASSISTANT</h1>

      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Role is required',
          },
        ]}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio.Button  value={"student"}>Student</Radio.Button >
          <Radio.Button value={"teacher"}>Teacher</Radio.Button>
          <Radio.Button value={"manager"}>Manager</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'email is not a valid email',
          },
          {
            required: true,
            message: 'email is required',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="please input email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="please input password" />
      </Form.Item>

      {/* <Form.Item  {...tailFormItemLayout}> */}
      <Form.Item className="login-form-button">
        <Button type="primary" htmlType="submit">
          Sign in
        </Button>
      </Form.Item>
      </Form>

      
      <Form.Item 
        name="signup" 
        label="No account?">
        <NextLink href="/signup" passHref>
            <Link>
                Sign up
            </Link>
        </NextLink>
      </Form.Item>

    </>

  );
};