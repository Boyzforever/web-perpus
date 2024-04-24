import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Image, Form, Input, Select, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import EditBookForm from './editBuku';

export const BukuAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [gambar, setGambar] = useState(null);

  const handleEditClick = (data) => {
    setEditedData(data);
    setEditModalVisible(true);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setGambar(selectedFile);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditSave = (updatedData, id) => {
    setEditModalVisible(false);
    editBuku(updatedData, id);
  };

  const getBuku = async () => {
    try {
      const response = await axios.get('https://perpustakaan.pockethost.io/api/collections/Buku/records');
      setDataSource(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  const editBuku = async (values, id) => {
    try {
      await axios.patch(`https://perpustakaan.pockethost.io/api/collections/Buku/records/${id}`, values, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      getBuku();
    }
  };

  const deleteBuku = async (id) => {
    try {
      await axios.delete(`https://perpustakaan.pockethost.io/api/collections/Buku/records/${id}`);
    } catch (e) {
      console.error(e);
    } finally {
      getBuku();
    }
  };

  const { Option } = Select;

  const columns = [
    {
      title: 'Judul Buku',
      dataIndex: 'judul',
      key: 'judul',
    },
    {
      title: 'Penulis',
      dataIndex: 'penulis',
      key: 'penulis',
    },
    {
      title: 'Penerbit',
      dataIndex: 'penerbit',
      key: 'penerbit',
    },
    {
      title: 'Tahun Terbit',
      dataIndex: 'tahun_terbit',
      key: 'tahun_terbit',
      className: 'd-none d-md-table-cell', // Hide on smaller screens
    },
    {
      title: 'Foto',
      key: 'Foto',
      render: (record) => {
        const fotoUrl =  `https://perpustakaan.pockethost.io/api/files/${record.collectionId}/${record.id}/${record.Foto}`;
        return <Image src={fotoUrl} alt="Book Cover" style={{ width: '200px', height: 'auto' }} />;
      },
    },
    {
      title: 'Status Ketersediaan',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {status === 'ada' ? (
            <CheckCircleOutlined style={{ color: 'green', marginRight: '5px' }} />
          ) : (
            <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
          )}
          <span>
            {status === 'ada' ? 'Tersedia' : 'Kosong'}
          </span>
        </div>
      ),
      className: 'd-none d-md-table-cell', // Hide on smaller screens
    },
    {
      title: 'Aksi',
      render: (record) => (
        <Space>
          <Button type='primary' onClick={() => handleEditClick(record)}>Edit</Button>
          <Button type='primary' onClick={() => deleteBuku(record.id)}>Hapus</Button>
        </Space>
      )
    }
  ];

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("tahun_terbit", values.tahun_terbit);
    formData.append("penerbit", values.penerbit);
    formData.append("penulis", values.penulis);
    formData.append("Foto", gambar);
    formData.append("status", values.status); // Tambahkan status ketersediaan ke formData

    try {
      await axios.post('https://perpustakaan.pockethost.io/api/collections/Buku/records', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      message.success('Buku telah berhasil ditambahkan');
      setIsModalVisible(false);
      getBuku();
    } catch (error) {
      console.error(error);
      message.error('Gagal menambahkan buku');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className="table-responsive" // Make the table responsive
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Form
            name="basic"
            layout='vertical'
            onFinish={onFinish}
          >
            {/* Form items */}
            <Form.Item
          label="Judul Buku"
          name="judul"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Penulis"
          name="penulis"
          rules={[{ required: true, message: 'Please input borrow date!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Penerbit"
          name="penerbit"
          rules={[{ required: true, message: 'Please input return date!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tahun terbit"
          name="tahun_terbit"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Ketersediaan"
          name="status"
          rules={[{ required: true, message: 'Please select availability status!' }]}
        >
          <Select>
            <Option value="ada">Ada</Option>
            <Option value="kosong">Kosong</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Foto Buku"
          name="Foto"
        >
          <input type='file'
            accept='.jpg,.jpeg,.png'
            onChange={handleFileChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

          </Form>
        </div>
      </div>
      <EditBookForm
        visible={editModalVisible}
        onCancel={handleEditCancel}
        onSave={handleEditSave}
        initialData={editedData}
        getBuku={getBuku}
        setIsModalVisible={setEditModalVisible}
      />
    </div>
  );
};
