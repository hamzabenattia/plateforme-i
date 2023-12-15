import React from 'react'
import Header from '../components/Header'
import PrintingOrderDetailmain from '../components/PrintingOrder/PrintingOrderDetailmain'
import Sidebar from '../components/sidebar'



function PrintingOrderDetailScreen({ match }) {
  const orderId = match.params.id;


  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <PrintingOrderDetailmain   orderId={orderId} />
    </main>
  </>
  )
}

export default PrintingOrderDetailScreen