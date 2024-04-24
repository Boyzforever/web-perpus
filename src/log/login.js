import React from "react";
import { Button, Form, Input, Typography ,message} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const { Text, Title, Link } = Typography;

export default function Login() {
  const onFinish = async (values) => {
    const data = {
      identity: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        "https://perpustakaan.pockethost.io/api/collections/users/auth-with-password",
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

  return (
    <section className="login-background" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <div className="col-md-4">
            <div className="card p-4">
              <Title level={3} className="mb-4">Sign in</Title>
              <Form
                name="normal_login"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
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
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <div className="text-center">
                <Text>Don't have an account? </Text>
                <Link href="/reg">Sign up now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
