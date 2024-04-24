import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Image,
  Spin,
} from "antd";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const { Meta } = Card;

const BookTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bukuList, setBukuList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://perpustakaan.pockethost.io/api/collections/Buku/records"
        );
        const bukuData = response.data.items;
        setBukuList(bukuData);
      } catch (error) {
        console.error(error);
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
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {bukuList.map((buku) => (
          <div key={buku.id} className="col">
            <Card
              hoverable
              cover={<Image alt="Book Cover" src={`https://perpustakaan.pockethost.io/api/files/${buku.collectionId}/${buku.id}/${buku.Foto}`} />}
            >
              <Meta
                title={buku.judul}
                description={`Penulis: ${buku.penulis}`}
              />
              <div className="d-flex justify-content-between mt-2">
                <Button disabled={buku.status === 'kosong'} onClick={() => handleBookClick(buku)}>Detail</Button>
                <span>Status: {buku.status}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>
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
              src={`https://perpustakaan.pockethost.io/api/files/${selectedBook.collectionId}/${selectedBook.id}/${selectedBook.Foto}`}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookTable;
