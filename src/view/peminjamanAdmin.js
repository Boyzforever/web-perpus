import React, { useEffect, useState } from "react";
import { Table, Spin, Button, message } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import dayjs from "dayjs";
import "dayjs/locale/id";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("id");
const dateFormat = "DD/MMMM/YYYY hh:mm:ss";

export const PeminjamanAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8090/api/collections/Peminjaman/records");
      const peminjamanData = response.data.items;

      const formattedData = peminjamanData.map((peminjaman, index) => ({
        key: peminjaman.id,
        nomor_urut: index + 1,
        judul_buku: peminjaman.judul_buku, 
        tanggal_peminjaman: dayjs(peminjaman.tanggal_peminjaman).format(dateFormat),
        tanggal_pengembalian: dayjs(peminjaman.tanggal_pengembalian).format(dateFormat),
        status_peminjam: getStatusIcon(peminjaman.status_peminjam),
      }));
      setDataSource(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (record) => {
    await updateStatus(record, "buku dipinjam");
  };

  const handleReject = async (record) => {
    await updateStatus(record, "buku ditolak");
  };

  const updateStatus = async (record, status) => {
    try {
      await axios.patch(`http://127.0.0.1:8090/api/collections/Peminjaman/records/${record.key}`, { status_peminjam: status });
      message.success(`Peminjaman "${record.judul_buku}" berhasil ${status === "buku dipinjam" ? "buku dipinjam" : "buku ditolak"}.`);
      fetchData(); 
    } catch (error) {
      console.error(error);
      message.error(`Gagal memperbarui status peminjaman "${record.judul_buku}".`);
    }
  };

  const getStatusIcon = (status) => {
    return status === "buku dipinjam" ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />;
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "nomor_urut",
      key: "nomor_urut",
    },
    {
      title: "Judul Peminjaman",
      dataIndex: "judul_buku",
      key: "judul_buku",
    },
    {
      title: "Tanggal Peminjaman",
      dataIndex: "tanggal_peminjaman",
      key: "tanggal_peminjaman",
    },
    {
      title: "Tanggal Pengembalian",
      dataIndex: "tanggal_pengembalian",
      key: "tanggal_pengembalian",
    },
    {
      title: "Status Peminjam",
      dataIndex: "status_peminjam",
      key: "status_peminjam",
    },
    {
      title: "Tindakan",
      key: "action",
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleAccept(record)}>
            Terima Peminjaman
          </Button>
          <Button type="danger" onClick={() => handleReject(record)} style={{ marginLeft: '8px' }}>
            Tolak Peminjaman
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <Spin spinning={loading}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </Spin>
    </div>
  );
};