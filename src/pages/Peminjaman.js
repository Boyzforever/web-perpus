import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const BorrowBookForm = () => {
  const [form] = Form.useForm();
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBuku = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8090/api/collections/Buku/records");
      setBukuList(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8090/api/collections/Peminjaman/records', values);
      if (response.status === 200) {
        message.success('Buku berhasil dipinjam!');
        window.location.reload()
      } else {
        throw new Error('Terjadi kesalahan saat meminjam buku.');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Terjadi kesalahan saat meminjam buku.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="basic" layout='vertical' onFinish={onFinish} form={form}>
      <Form.Item
        label="Judul Buku"
        name="judul_buku"
        rules={[{ required: true, message: "Please select a book title!" }]}
      >
        <Select>
          {bukuList.map((buku) => buku.status !=="kosong" &&(
            <Option key={buku.id} value={buku.judul}>
              {buku.judul}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tanggal Peminjaman"
        name="tanggal_peminjaman"
        rules={[{ required: true, message: 'Pilih tanggal peminjaman!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Tanggal Pengembalian"
        name="tanggal_pengembalian"
        rules={[{ required: true, message: 'Pilih tanggal pengembalian!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Pinjam Buku
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BorrowBookForm;
