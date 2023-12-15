import React from 'react'
import Header from '../components/Header'
import PrintingOrderMain from '../components/PrintingOrder/PrintingOrderMain'
import Sidebar from '../components/sidebar'


function PrintingOrdersSceen() {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <PrintingOrderMain />
            
             </main>
  </>
  )
}

export default PrintingOrdersSceen