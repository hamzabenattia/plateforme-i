import React from 'react'
import Header from '../components/Header'
import MyOrderDetailmain from '../components/MyOrder/MyOrderDetailmain'
import Sidebar from '../components/sidebar'

function MyOrderDetailScreen({match}) {
  const orderId = match.params.id;

  return (
    <>

    <Sidebar />
    <main className="main-wrap">
      <Header />
      <MyOrderDetailmain orderId={orderId} />
    </main>
  </>
  )
}

export default MyOrderDetailScreen