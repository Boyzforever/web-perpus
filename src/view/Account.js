import React, { useState } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';

const { Text, Title } = Typography;
const { Option } = Select;

export default function Account() {
  const [selectedRole, setSelectedRole] = useState(null); 

  const createUser = async (userData) => {
    try {
      const response = await axios.post('https://perpustakaan.pockethost.io/api/collections/users/records',userData,{
        headers :{
          "Content-Type" : "application/json"
      }
      })
      console.log(response)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const onFinish = async (values) => {
    try {
      const userData = { ...values, tipe: selectedRole }; 
      await createUser(userData);
      window.location.reload()
    } catch (error) {
      // Handle error
    }
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <section className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="text-center mb-4">
            <Title level={3}>Akun Petugas</Title>
          </div>
          <Form
            name="registration-form"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!"
                }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              dependencies={['password']}
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
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item
              name="userType"
              rules={[
                {
                  required: true,
                  message: "Please select your role!"
                }
              ]}
            >
              <Select
                placeholder="Select your role"
                onChange={handleRoleChange}
              >
                <Option value="petugas">Petugas</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit">
                Enter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
