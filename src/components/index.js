import React, { useState } from "react";
import logo from "../components/logo.png";
import { Button, Layout, Menu } from "antd";
import {
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/style.css";
import Peminjam from "../pages/Peminjaman";
import BookTable from "../view/Buku";
import "bootstrap/dist/css/bootstrap.min.css";

const { Header, Sider, Content } = Layout;

export const Index = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState("1");
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const handlelogout = () => {
    window.location.href = "/login";
  };

  const handleClick = (e) => {
    setSelectedKeys(e.key);
  };

  let contentComponent;
  switch (selectedKeys) {
    case "1":
      contentComponent = <BookTable />;
      break;
    case "2":
      contentComponent = <Peminjam />;
      break;
    default:
      contentComponent = <div>No Content</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: collapsed ? "32px" : "120px",
              transition: "width 0.2s",
            }}
          />
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKeys]} // Memastikan item menu yang dipilih selalu disorot
          onClick={handleClick} // Mengatur fungsi untuk menangani klik menu
        >
          <Menu.Item key="1" icon={<BookOutlined />}>
            Buku
          </Menu.Item>
          <Menu.Item key="2" icon={<ClockCircleOutlined />}>
            Peminjaman
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background d-flex justify-content-between align-items-center" style={{ padding: 0 }}>
          <div>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger"
                onClick={toggle}
                style={{ color: "#000", marginRight: "80px" }}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger"
                onClick={toggle}
                style={{ color: "#000" }}
              />
            )}
          </div>
          <div>
            <Button
              icon={<LogoutOutlined />}
              onClick={handlelogout}
              className="mr-4"
            >
              Logout
            </Button>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {contentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};
