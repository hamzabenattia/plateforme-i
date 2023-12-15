import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import MyOrders from "./MyOrders";

const MyOrderMain = () => {


  
  const orderList = useSelector((state) => state.printingorderList);
  const { loading, error, orders } = orderList;










  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [orderPerPage, setOrderPerPage] = useState(10);

  const pagesVisited = pageNumber * orderPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

//


const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");


const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = orders.filter((value) => {
    return value._id.toLowerCase().includes(searchWord.toLowerCase()) ||
     value.order.shippingAddress.country.toLowerCase().includes(searchWord.toLowerCase())||
     value.order.shippingAddress.city.toLowerCase().includes(searchWord.toLowerCase())

  });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};





  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
              onChange={handleFilter}
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={(e) => setOrderPerPage(e.target.value)} className="form-select">
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={orders?.length}>Show all</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Item N°</th>
                  <th scope="col">Shipped to</th>
                  <th scope="col">Accepted in</th>
                  <th>Status</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {wordEntered ==="" ? (<> {orders.slice(pagesVisited, pagesVisited + orderPerPage).map((order) => (
              <MyOrders order={order} />
              ))}</>): (<> {filteredData.slice(pagesVisited, pagesVisited + orderPerPage).map((order) => (
                <MyOrders order={order} />
                ))}</>)}
            
              </tbody>
    </table>
            
            )}
          </div>
        </div>
        <nav className="float-end mt-4" aria-label="Page navigation">
          <div className="float-end mt-4" aria-label="Page navigation">
<ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(orders?.length / orderPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 
    </div>
          </nav>
      </div>
    </section>
  );
};

export default MyOrderMain;
