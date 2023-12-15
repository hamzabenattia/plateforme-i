import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, listcategory } from "../../Redux/Actions/CategoryAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";






const CategoriesTable = () => {

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading , error, categorys } = categoryList;

  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [categoryPerPage, setCategoryPerPage] = useState(5);

  const pagesVisited = pageNumber * categoryPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

//




  useEffect(() => {
    dispatch(listcategory());
  }, [dispatch]);


  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteCategory(id));
    }
  };






  return (

    
    <div className="col-md-12 col-lg-8">
      {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
      <table className="table">
        <thead>
          <tr>
           
            <th>ID</th>
            <th>Nom</th>
            <th>Image</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
        {categorys.cat?.slice(pagesVisited, pagesVisited + categoryPerPage)
                    .map((cat) => (
          <tr>
            <td>{cat._id}</td>
            <td>
              <b>{cat.name}</b>
            </td>
            <td><img height="50px" width="50px" src={cat.image}/></td>
            <td className="text-end">
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  
                  <Link   onClick={() => deletehandler(cat._id)} className="dropdown-item text-danger" to="#">
                  Supprimer
                  </Link>
                </div>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>)}
      
<ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        pageCount={Math.ceil(categorys.cat?.length / categoryPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 

    </div>
  );
};

export default CategoriesTable;
