import React from 'react'
import Header from '../components/Header'
import ShowPrintingMain from '../components/Printing/ShowPrintingMain'
import Sidebar from '../components/sidebar'

function PrintingShowSceen({ match }) {

  const userId = match.params.id;

  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <ShowPrintingMain userid={userId}/>
    </main>
  </>
  )
}

export default PrintingShowSceen