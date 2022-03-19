import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import {Radio, Form, Input, Select, Button, message} from 'antd';
import {reqSignup} from '../../serverAPI/'
import NextLink from 'next/link';
import { Typography, Space } from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];
const { Text, Link } = Typography;

export default function RegistrationForm(){
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(1);

  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const {email, password, role} = values
    async function callAPI(){
      try{
        const result  = await reqSignup(email,password,role)
        console.log('call signup api result' ,result)
        if (result.status === 201){
          message.success("success")
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
        name="register"
        onFinish={onFinish}
        initialValues={{ layout: formLayout }}
        scrollToFirstError
      >
      <h1>SIGN UP YOUR ACCOUNT</h1>

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

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Tap password again" />
      </Form.Item>

      {/* <Form.Item  {...tailFormItemLayout}> */}
      <Form.Item className="login-form-button">
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
      </Form>

      
      <Form.Item 
        name="signin" 
        label="Already have an account?">
        <NextLink href="/signin" passHref>
            <Link>
                Sign in
            </Link>
        </NextLink>
      </Form.Item>

    </>

  );
};