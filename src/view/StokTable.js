import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

const StokTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStokData();
  }, []);

  const fetchStokData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://perpustakaan.pockethost.io/api/collections/stokbarang/records");
      setDataSource(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (record) => {
    try {
      await axios.delete(`https://perpustakaan.pockethost.io/api/collections/stokbarang/records/${record.id}`);
      message.success("Data berhasil dihapus");
      fetchStokData();
    } catch (error) {
      console.error("Error deleting data:", error);
      message.error("Gagal menghapus data");
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axios.patch(
        `https://perpustakaan.pockethost.io/api/collections/stokbarang/records/${editingItem.id}`,
        values
      );
      message.success("Data berhasil diperbarui");
      fetchStokData();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating data:", error);
      message.error("Gagal memperbarui data");
    }
  };

  const columns = [
    // {
    //   title: "Judul Buku",
    //   dataIndex: "judul_buku",
    //   key: "judul_buku",
    // },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          {/* <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button> */}
          <Button type="primary" onClick={() => handleDelete(record)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} loading={loading} />
      {/* <Modal
        title="Edit Data"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Stok"
            name="stok"
            rules={[{ required: true, message: "Please input the stock!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};

export default StokTable;
