import React, { useEffect, useState } from "react";
import { Table, Spin, Button, message, Tooltip } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons"; // Import DeleteOutlined
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
      const response = await axios.get("https://perpustakaan.pockethost.io/api/collections/Peminjaman/records");
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

  const handleDelete = async (record) => {
    try {
      await axios.delete(`https://perpustakaan.pockethost.io/api/collections/Peminjaman/records/${record.key}`);
      message.success(`Peminjaman "${record.judul_buku}" berhasil dihapus.`);
      fetchData();
    } catch (error) {
      console.error(error);
      message.error(`Gagal menghapus peminjaman "${record.judul_buku}".`);
    }
  };

  const updateStatus = async (record, status) => {
    try {
      const r = await axios.get(`https://perpustakaan.pockethost.io/api/collections/stokbarang/records/i9kxjac85opjkxk`)
      const s = r.data.stok
      const responsstok = await axios.patch(`https://perpustakaan.pockethost.io/api/collections/stokbarang/records/i9kxjac85opjkxk`, {stok: (status === "buku dipinjam" ? s-1 : s )})
      console.log('respons' , responsstok)
      await axios.patch(`https://perpustakaan.pockethost.io/api/collections/Peminjaman/records/${record.key}`, { status_peminjam: status });
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
        <div className="d-flex">
          <div className="d-md-none mb-2"> {/* Hide the div on medium screens and smaller */}
            <Tooltip title='pinjam buku'>
              <Button type="primary" onClick={() => handleAccept(record)} icon={<CheckCircleOutlined />}>
              </Button>
            </Tooltip>
            <Tooltip title='tolak buku'>
              <Button type="primary" className="btn-danger" onClick={() => handleReject(record)} style={{ marginLeft: '8px' }} icon={<CloseCircleOutlined />}>
              </Button>
            </Tooltip>
          </div>
          <div className="d-md-none mb-2"> {/* Hide the div on medium screens and smaller */}
            <Button type="primary" onClick={() => handleDelete(record)} className="btn-danger" icon={<DeleteOutlined />} style={{ marginLeft: '8px' }}>
              Hapus Peminjaman
            </Button>
          </div>
          <div className="d-none d-md-table-cell"> {/* Hide the div on small screens and show it on medium screens and larger */}
            <Tooltip title='pinjam buku'>
              <Button type="primary" onClick={() => handleAccept(record)} icon={<CheckCircleOutlined />}>
              </Button>
            </Tooltip>
            <Tooltip title='tolak buku'>
              <Button type="primary" className="btn-danger" onClick={() => handleReject(record)} style={{ marginLeft: '8px' }} icon={<CloseCircleOutlined />}>
              </Button>
            </Tooltip>
            <Button type="primary" onClick={() => handleDelete(record)} className="btn-danger" icon={<DeleteOutlined />} style={{ marginLeft: '8px' }}>
              Hapus Peminjaman
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <Spin spinning={loading}>
            <div className="table-responsive"> {/* Make the table responsive */}
              <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
