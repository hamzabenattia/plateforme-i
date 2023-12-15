import React from 'react'
import Header from '../components/Header'
import MyOrderMain from '../components/MyOrder/MyOrderMain'
import Sidebar from '../components/sidebar'

function MyOrderScreen() {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <MyOrderMain/>
    </main>
  </>
  )
}

export default MyOrderScreen