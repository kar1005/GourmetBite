import React from 'react';
import Header from "./../shared/Header";
import Footer from "./../shared/Footer";


function Layout({children}) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default Layout
