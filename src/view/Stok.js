import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const { Option } = Select;

export const Stok = () => {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBuku = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://perpustakaan.pockethost.io/api/collections/Buku/records"
        );
        setBooks(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getBuku();
  }, []);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("judul_buku", values.judul_buku);
    formData.append("stok", values.stok);
    try {
      await axios.post(
        "https://perpustakaan.pockethost.io/api/collections/stokbarang/records",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Buku telah berhasil ditambahkan ke stok");

      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Gagal menambahkan buku ke stok");
    }
  };

  return (
    <div className="container mt-4 ">
      <div className="row">
        <div className="col">
          <Form form={form} name="basic" layout="vertical" onFinish={onFinish}>
            {/* <Form.Item
              label="Judul Buku"
              name="judul_buku"
              rules={[{ required: true, message: "Please select a book!" }]}
            >
              <Select loading={loading}>
                {books.map(
                  (buku) =>
                    buku.status !== "kosong" && (
                      <Option key={buku.id} value={buku.judul}>
                        {buku.judul}
                      </Option>
                    )
                )}
              </Select>
            </Form.Item> */}
            <Form.Item
              label="Stok Buku"
              name="stok"
              rules={[{ required: true, message: "Please input the stock!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
