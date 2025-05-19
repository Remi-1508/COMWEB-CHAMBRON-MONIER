import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <>
    <Header />
    <main style={{ padding: '20px' }}>{children}</main>
  </>
);

export default Layout;
