import React from 'react'
import Header from '../components/Header'
import PrintingComponent from '../components/Printing/PrintingComponent'
import Sidebar from '../components/sidebar'

function PrintingScreen() {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <PrintingComponent />
      </main>
    </>
  )
}

export default PrintingScreen