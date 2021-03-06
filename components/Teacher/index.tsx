import React from 'react'
import { Form, Input, Button, Select , Space, Slider} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Teacher } from '../../models/AxiosResponseGetTeachers.interface';

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
  teacher: Teacher
}

export default function TeacherForm({teacher, parentOnOK, parentOnCancel, actionType } : Props) {
  const [form] = Form.useForm();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log('form value', values);
    parentOnOK(values);
  };

  const onCancel = () => {
    form.resetFields();
    parentOnCancel();
  };

  if (teacher){
    //console.log(teacher.studentType);
    form.setFieldsValue({
        name:teacher.name,
        country: teacher.country,
        email: teacher.email,
        phone:teacher.phone,
        skills: teacher.skills,
    });
  }

  const tests = [{key:1, name:'skill1', label:'skill1'}]

  return (

    <Form {...layout} form={form} name="control-hooks" initialValues={{
        prefix: '86',
      }} onFinish={onFinish}>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='mobile phone' />
    </Form.Item>
    {/* <Form.Item name="slider" label="Slider">
        <Slider defaultValue={1} max={5} />
    </Form.Item> */}

    <Form.List name="skills">
        {
         (fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) =>{
              console.log('key', key);
              console.log('name', name);
              console.log('restField', restField);
              return (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing skill name' }]}
                >
                  <Input placeholder="Skill name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'level']}                  
                >
                  <Slider defaultValue={1} max={5}/>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            )})}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>


    <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {actionType==='Add'? 'Add' : 'Update'}
        </Button>
        <Button htmlType="button" onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
  </Form>
  )
}