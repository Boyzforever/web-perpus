import React, { useState } from 'react';
import logo from '../components/logo.png'
import { Button, Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import ReactToPrint from 'react-to-print'; // Import ReactToPrint
import {Stok} from '../view/Stok';
import '../styles/style.css'
import { BukuAdmin } from '../pages/bukuAdmin';
import { Laporan } from '../pages/Laporan';
import { PeminjamanAdmin } from '../view/peminjamanAdmin';
import Dashboard from '../pages/Dashboard';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const { Header, Sider, Content } = Layout;

const HomePetugas = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState('1');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) => {
    setSelectedKeys(e.key);
  };

  const handlelogout = () => {
    window.location.href = '/login';
  };


  let contentComponent;
  switch (selectedKeys) {
    case '1':
      contentComponent = <Dashboard />;
      break;
    case '2':
      contentComponent = <PeminjamanAdmin />;
      break;
    case '3':
      contentComponent = <BukuAdmin />;
      break;
    case '4':
      contentComponent = <Laporan />;
      break;
      case '5':
        contentComponent = <Stok />
        break;
    default:
      contentComponent = <div>No Content</div>;
  }

  let componentRef;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <img src={logo} alt="Logo" style={{ width: collapsed ? '32px' : '120px', transition: 'width 0.2s' }} />
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKeys]} // Memastikan item menu yang dipilih selalu disorot
          onClick={handleClick} // Mengatur fungsi untuk menangani klik menu
        >
          <Menu.Item key="1" icon={<DatabaseOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key='2' icon={<DatabaseOutlined />}>
            Peminjaman
          </Menu.Item>
          <Menu.Item key='3' icon={<DatabaseOutlined />}>
            Buku
          </Menu.Item>
          <Menu.Item key='4' icon={<DatabaseOutlined />}>
            Generate Laporan
          </Menu.Item>
          <Menu.Item key='5' icon={<CloudUploadOutlined />}>
            Stok Buku
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 , display: 'flex' , alignItems: 'center', justifyContent: 'space-between' }} >
          {collapsed ? (
            <MenuUnfoldOutlined
              className="trigger mr-5"
              onClick={toggle}
              style={{ color: "#000", marginLeft: "16px", marginRight: "16px" }}
              />
          ) : (
            <MenuFoldOutlined
              className="trigger"
              onClick={toggle}
              style={{ color: "#000", marginLeft: "16px", marginRight: "16px" }}
              />
          )}
          <ReactToPrint
            trigger={() => (
              <Button
                icon={<LogoutOutlined />}
                style={{ marginLeft: "auto" }}
              >
                Print
              </Button>
            )}
            content={() => componentRef}
          />
          <Button
          className='mr-5'
            icon={<LogoutOutlined />}
            onClick={handlelogout}
            style={{ marginLeft: "8px" }}
          >
            Logout
          </Button>
          
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div ref={(ref) => (componentRef = ref)}>
            {contentComponent}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePetugas;
