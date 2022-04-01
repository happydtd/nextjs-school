import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function StudentForm(props) {
  const [form] = Form.useForm();
  const [stype, setStype] = useState('tester');

  const onFinish = (values: any) => {
    props.parentOnOK(values);
  };

  const onCancel = () => {
    form.resetFields();
    props.parentOnCancel();
  };

  if (props.student){
        form.setFieldsValue({
          name:props.student.name,
          area: props.student.country,
          email: props.student.email,
        });

        console.log('stype1',stype)
        console.log('type1',props.student.studentType.name)
        if (stype !== props.student.studentType.name)
        {
          setStype(props.student.studentType.name);
          console.log('stype2',stype)
        }
  }

  useEffect(()=>{

  },[stype])

  console.log('render');
  // const onFill = () => {
  //   form.setFieldsValue({
  //     note: 'Hello world!',
  //     gender: 'male',
  //   });
  // };
  return (

    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
        <Form.Item name="area" label="Area" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="studentType" label="Student Type" rules={[{ required: true }]}>
      <Select
        placeholder="Select a option"
        allowClear
        defaultValue={stype}
      >
        <Option value="1">tester</Option>
        <Option value="2">developer</Option>
      </Select>
    </Form.Item>
    <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {props.actionType==='Add'? 'Add' : 'Update'}
        </Button>
        <Button htmlType="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
  </Form>
  )
}
