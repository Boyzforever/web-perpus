import React, { useState } from 'react';
import logo from '../components/logo.png'
import { Layout, Menu } from 'antd';
import {
  DatabaseOutlined,
} from '@ant-design/icons';
import '../styles/style.css'
const { Header, Sider, Content } = Layout;

 const HomePetugas = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState('1');
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleClick = (e) =>{
    setSelectedKeys (e.key);
  }

  let contentComponent;
  switch (selectedKeys) {
    case '1':
      contentComponent = <div></div>
      break;
    case '2':
      contentComponent = <div>Content for Option 2</div>;
      break;
    case '3':
      contentComponent = <div>Content for Option 3</div>;
      break;
      case '4':
        contentComponent = <div>Content for Option 4</div>;
        break;
    default:
      contentComponent = <div>No Content</div>;
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider trigger={null} collapsible collapsed={collapsed} >
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
            Pengembalian 

        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} onClick={toggle}>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
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

export default HomePetugas;