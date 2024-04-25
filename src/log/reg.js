import React, { useState } from "react";
import { Button, Checkbox, Form, Grid, Input, Select, Typography, theme } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';

const { useToken } = theme;
// const { useBreakpoint } = Grid;
const { Text, Title } = Typography;
const { Option } = Select;

export default function Reg() {
  const { token } = useToken();
  // const screens = useBreakpoint();
  const [selectedRole, setSelectedRole] = useState(null); // State untuk menyimpan opsi yang dipilih

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
      const userData = { ...values, tipe: selectedRole }; // Menambahkan tipe akun yang dipilih ke dalam data pengguna
      await createUser(userData);
      // Redirect to success page or show success message
      window.location.href = "/login";
    } catch (error) {
      // Handle error
    }
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value); // Menyimpan opsi yang dipilih ke dalam state saat nilai dropdown berubah
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: `${token.paddingXL}px`,
      maxWidth: "380px" // Mengubah lebar maksimum agar lebih responsif
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      justifyContent: "center", // Membuat konten berada di tengah secara horizontal
      backgroundColor: token.colorBgContainer,
      display: "flex",
      minHeight: "100vh", // Mengubah tinggi menjadi minimal agar sesuai dengan konten
      padding: `${token.sizeXXL}px ${token.padding}px`
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: token.fontSizeHeading2
    },
    rectangle: {
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadiusBase,
      padding: token.paddingBase,
      marginBottom: token.marginBase,
      alignItems: "center", // Membuat konten berada di tengah secara vertikal
      backdropFilter: "blur(5px)", // Efek blur
      backgroundColor: "rgba(255, 255, 255, 0.5)" // Warna latar belakang semi-transparan
    }
  };

  return (
    <section className="login-background" style={styles.section}>
      <div style={styles.rectangle}>
        {/* Rectangle */}
        <div style={styles.container}>
          <div style={styles.header}>
            <Title style={styles.title}>Sign up</Title>
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
                onChange={handleRoleChange} // Menangani perubahan nilai dropdown
              >
                <Option value="peminjam">Peminjam</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Form.Item name="agree" valuePropName="checked" noStyle>
                <Checkbox>I agree to the terms and conditions</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit">
                Sign up
              </Button>
              <div style={{ marginTop: "12px", textAlign: "center" }}>
                <Text style={styles.text}>Already have an account? </Text>
                <a href="/login">Sign in</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
