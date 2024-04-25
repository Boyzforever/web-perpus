import React, { useState,useEffect } from "react";
import { Modal, Button, Form, Input, message, Select,Menu } from "antd";
import axios from "axios";
import { Option } from "antd/es/mentions";

const EditBookForm = ({
  visible,
  onCancel,
  getBuku,
  initialData,
  setIsModalVisible,
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialData);
  const [gambar, setGambar] = useState();
  const [stok, setStok] = useState([]);
  const [loading,setLoading] = useState();
  const handleSave = async () => {
    const formValues = form.getFieldsValue();
    const formData = new FormData();
    const selectedStock = formValues.stok;

    formData.append("judul", formValues.judul || initialData.judul);
    formData.append("penulis", formValues.penulis || initialData.penulis);
    formData.append("penerbit", formValues.penerbit || initialData.penerbit);
    formData.append("status", formValues.status || initialData.status);
    formData.append("stok", selectedStock);
    formData.append(
      "tahun_terbit",
      formValues.tahun_terbit || initialData.tahun_terbit
    );
  
    if (gambar) {
      formData.append("Foto", gambar);
    }
    
    try {
      await axios.patch(
        `https://perpustakaan.pockethost.io/api/collections/Buku/records/${initialData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Buku telah berhasil diubah");
      setIsModalVisible(false);
      getBuku();
    } catch (error) {
      console.error(error);
      message.error("Gagal mengubah buku");
    }
  };
  useEffect(() => {
    const getStok = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://perpustakaan.pockethost.io/api/collections/stokbarang/records"
        );
        setStok(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    getStok();
  }, []);

  
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setGambar(selectedFile);
    }
  };

  const handleChange = (changedValues, allValues) => {
    setFormData({ ...formData, ...allValues });
  };

  return (
    <Modal
      visible={visible}
      title="Edit Buku"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Batal
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Simpan
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={formData}
        onValuesChange={handleChange}
      >
        <Form.Item
          name="judul"
          label="Judul Buku"
          rules={[{ required: true, message: "Harap masukkan judul buku!" }]}
        >
          <Input
            initialValues={initialData.judul}
            defaultValue={initialData.judul}
          />
        </Form.Item>
        <Form.Item
          name="penerbit"
          label="Penerbit"
          rules={[{ required: true, message: "Harap masukkan penerbit!" }]}
        >
          <Input
            initialValues={initialData.penerbit}
            defaultValue={initialData.penerbit}
          />
        </Form.Item>
        <Form.Item
          name="penulis"
          label="Penulis"
          rules={[{ required: true, message: "Harap masukkan penulis!" }]}
        >
          <Input
            initialValues={initialData.penulis}
            defaultValue={initialData.penulis}
          />
        </Form.Item>
        <Form.Item
          name="tahun_terbit"
          label="Tahun Terbit"
          rules={[{ required: true, message: "Harap masukkan tahun terbit!" }]}
        >
          <Input
            initialValues={initialData.tahun_terbit}
            defaultValue={initialData.tahun_terbit}
          />
        </Form.Item>
        <Form.Item label="Foto Buku" name="Foto">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <Input
            initialValues={initialData.Foto}
            defaultValue={initialData.Foto}
          />
        </Form.Item>
        <Form.Item
  label="Status Ketersediaan"
  name="status"
  rules={[{ required: true, message: 'Please select availability status!' }]}
  initialValue={initialData.status} 
  defaultValue={initialData.status}

>
  <Select>
    <Option value="ada">Ada</Option>
    <Option value="kosong">Kosong</Option>
  </Select>
</Form.Item>
<Form.Item
              label="Stok Barang"
              name="stok"
              rules={[{ required: true, message: "Please select a Stok!" }]}
            >
              <Select loading={loading}>
                {stok.map(
                  (stok) =>
                    stok.status !== "kosong" && (
                      <Option key={stok.id} value={stok.stok}>
                        {stok.stok}
                      </Option>
                    )
                )}
              </Select>
            </Form.Item>


      </Form>
    </Modal>
  );
};

export default EditBookForm;
