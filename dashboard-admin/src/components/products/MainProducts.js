import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";



const MainProducts = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [productPerPage, setProductPerPage] = useState(10);

  const pagesVisited = pageNumber * productPerPage;

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

// Search

const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");


const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = products.filter((value) => {
    return value.name.toLowerCase().includes(searchWord.toLowerCase())
     
  });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};







  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Liste de produits</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
          Créer un nouveau
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                onChange={handleFilter}
                type="search"
                placeholder="Recherche..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select onChange={(e) => setProductPerPage(e.target.value)} className="form-select">
                <option value={10}>Afficher 10</option>
                <option value={20}>Afficher 20</option>
                <option value={30}>Afficher 30</option>
                <option value={products?.length}>Show all</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">


{wordEntered ==="" ? (<> {products.slice(pagesVisited, pagesVisited + productPerPage)
                    .map((product) => (
                <Product product={product} key={product._id} />
              ))}</>): (<> {filteredData.slice(pagesVisited, pagesVisited + productPerPage)
                .map((product) => (
            <Product product={product} key={product._id} />
          ))}</>)}
              
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
          <div className="float-end mt-4" aria-label="Page navigation">
<ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(products?.length / productPerPage)}
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
      </div>
    </section>
  );
};

export default MainProducts;
