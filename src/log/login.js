import React from "react";
import { Button, Checkbox, Form, Grid, Input, message, Typography, theme } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = async (values) => {
    const data = {
      identity:values.email,password:values.password
    }
    try {
      const response = await axios.post('http://127.0.0.1:8090/api/collections/users/auth-with-password',data,{
        headers :{
          "Content-Type" : "application/json"
      }
      })
      console.log(response)
      localStorage.setItem('userType',JSON.stringify(response.data.record))
      window.location.href='/'
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again later.');
    }
  };
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px"
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Sign in</Title>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
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
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a style={styles.forgotPassword} href="">
              Forgot password?
            </a>
          </Form.Item> */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link href="/reg">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
