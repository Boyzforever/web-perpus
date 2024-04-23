import React, { useEffect } from 'react';
import { message } from 'antd';
import HomeAdmin from '../admin/HalamanAdmin';
import HomePetugas from '../admin/HalamanPetugas';
import { Index } from '../components';

const HomePage = () => {
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType) {
      // Tidak ada tipe pengguna (pengguna belum login), redirect ke halaman login
      message.warning('Anda belum login').then(() => {
        window.location.href = '/login';
      });
    }
  }, []);

  const user = localStorage.getItem('userType');
  const parsedUser = JSON.parse(user)
  const userType = parsedUser.userType
  console.log(userType)
  if (userType === 'administrator') {
    return <HomeAdmin />;
  } else if (userType === 'petugas') {
    return <HomePetugas />;
  } else if (userType === 'peminjam') {
    return <Index />;
  } else {
    // Tipe pengguna tidak dikenali, arahkan ke halaman default atau tampilkan pesan kesalahan
    return (
      <div>
        <p>Tipe pengguna tidak dikenali.</p>
        <p>Silakan hubungi administrator.</p>
      </div>
    );
  }
};

export default HomePage;
