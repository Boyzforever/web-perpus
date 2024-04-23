import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Image,
  Space,
  Spin,
  message,
} from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const { Meta } = Card;

const BookTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bukuList, setBukuList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Menyimpan data buku yang dipilih

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8090/api/collections/Buku/records"
        );
        const bukuData = response.data.items;
        setBukuList(bukuData);
      } catch (error) {
        console.error(error);
        // Handle error jika terjadi kesalahan dalam mengambil data buku
      }
    };

    fetchData();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {bukuList.map((buku) => (
          <div key={buku.id} className="col-md-4 mb-4">
            <Card
              hoverable
              cover={<Image height={200} alt="Book Cover" src={`http://127.0.0.1:8090/api/files/${buku.collectionId}/${buku.id}/${buku.Foto}`} />}
              actions={[
                <Button disabled={buku.status === 'kosong'} onClick={() => handleBookClick(buku)}>Detail</Button>,<span>status : {buku.status}</span>
              ]}
            >
              <Meta
                title={buku.judul}
                description={`Penulis: ${buku.penulis}`}
              />
            </Card>
          </div>
        ))}
      </div>
      {/* Modal untuk detail buku */}
      <Modal
        title="Detail Buku"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedBook && (
          <div>
            <p>Judul: {selectedBook.judul}</p>
            <p>Penulis: {selectedBook.penulis}</p>
            <p>Penerbit: {selectedBook.penerbit}</p>
            <p>Tahun Terbit: {selectedBook.tahun_terbit}</p>
            <p>Status: {selectedBook.status}</p>
            <Image
              alt="Book Cover"
              src={`http://127.0.0.1:8090/api/files/${selectedBook.collectionId}/${selectedBook.id}/${selectedBook.Foto}`}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookTable;
