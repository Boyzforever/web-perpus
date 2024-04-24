import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export const Laporan = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://perpustakaan.pockethost.io/api/collections/Buku/records"
        );
        const bukuData = response.data.items;
        const formattedData = bukuData.map((buku, index) => ({
          key: buku.id,
          nomor_urut: index + 1,
          judul: buku.judul,
          penulis: buku.penulis,
          penerbit: buku.penerbit,
          tahun_terbit: buku.tahun_terbit,
          status: buku.status === "ada" ? "Tersedia" : "Kosong",
          Foto: `https://perpustakaan.pockethost.io/api/files/${buku.collectionId}/${buku.id}/${buku.Foto}`,
        }));
        setDataSource(formattedData);
      } catch (error) {
        console.error(error);
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
      render: (record) => (
        <Image src={record.Foto} alt="Book Cover" preview={false} />
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};
