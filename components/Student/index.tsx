import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { Student } from '../../models/AxiosResponseGetStudents.interface';

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Props{
  parentOnOK: (values: any)=>void
  parentOnCancel: ()=>void
  actionType: string
  student: Student
}

export default function StudentForm(props: Props) {
  const [form] = Form.useForm();

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
          country: props.student.country,
          email: props.student.email,
          studentType: props.student.type.id.toString()
        });
  }


  return (

    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="studentType" label="Student Type" rules={[{ required: true }]}>
      <Select
        placeholder="Select a option"
        allowClear
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
