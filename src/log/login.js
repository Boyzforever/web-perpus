import React from "react";
import { Button, Form, Input, message, Typography, Grid, theme } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/style.css"; // Import CSS global

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = async (values) => {
    const data = {
      identity: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8090/api/collections/users/auth-with-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      localStorage.setItem("userType", JSON.stringify(response.data.record));
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again later.");
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      justifyContent: "center", // Membuat konten berada di tengah secara horizontal
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    rectangle: {
      border: `1px solid ${token.colorBorder}`,
      borderRadius: token.borderRadiusBase,
      padding: token.paddingBase,
      marginBottom: token.marginBase,
      alignItems: "center", // Membuat konten berada di tengah secara vertikal
      backdropFilter: "blur(5px)", // Efek blur
      backgroundColor: "rgba(255, 255, 255, 0.5)" // Warna latar belakang semi-transparan
    },
  };

  return (
    <section className="login-background" style={styles.section}>
      <div style={styles.rectangle}>
        {/* Rectangle */}
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
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
      </div>
    </section>
  );
}
