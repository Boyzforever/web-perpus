import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
  Image,
  Spin,
  DatePicker,
  Select,
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Option } from "antd/es/mentions";

const { TextArea } = Input;

export const Laporan = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bukuList, setBukuList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Menyimpan data buku yang dipilih
  const [nomorUrut, setNomorUrut] = useState(0); // Menyimpan nomor urut buku

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://perpustakaan.pockethost.io/api/collections/Buku/records"
        );
        const bukuData = response.data.items;
        const formattedData = bukuData.map((buku, index) => ({
          key: buku.id,
          nomor_urut: index + 1, // Menghitung nomor urut buku
          judul: buku.judul,
          penulis: buku.penulis,
          penerbit: buku.penerbit,
          tahun_terbit: buku.tahun_terbit,
          status: buku.status === "ada" ? "Tersedia" : "Kosong",
          Foto: `https://perpustakaan.pockethost.io/api/files/${buku.collectionId}/${buku.id}/${buku.Foto}`, // Membangun URL foto
        }));
        setDataSource(formattedData);
      } catch (error) {
        console.error(error);
        // Handle error jika terjadi kesalahan dalam mengambil data buku
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "nomor_urut",
      key: "nomor_urut",
    },
    {
      title: "Judul Buku",
      dataIndex: "judul",
      key: "judul",
    },
    {
      title: "Penulis",
      dataIndex: "penulis",
      key: "penulis",
    },
    {
      title: "Penerbit",
      dataIndex: "penerbit",
      key: "penerbit",
    },
    {
      title: "Tahun Terbit",
      dataIndex: "tahun_terbit",
      key: "tahun_terbit",
    },
    {
      title: "Status Ketersediaan",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div>
          {status === "Tersedia" ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          {status}
        </div>
      ),
    },
    {
      title: "Foto",
      key: "Foto",
      render: (record) => {
        console.log("Foto URL:", record.Foto); // Tambahkan console.log disini
        return (
          <Image
            src={record.Foto}
            alt="Book Cover"
            style={{ width: "200px", height: "auto" }}
          />
        );
      },
    },
  ];

  const getBuku = async () => {
    try {
      const response = await axios.get(
        "https://perpustakaan.pockethost.io/api/collections/Buku/records"
      );
      setBukuList(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBuku();
  }, []);

  return (
    <div className="container mt-4">
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

