import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteslide, listslide } from "../../Redux/Actions/SlideShowAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";






const CategoriesTable = () => {

  const dispatch = useDispatch();

  const slideList = useSelector((state) => state.slideList);
  const { loading , error, slides } = slideList;

  console.log(slides)

  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [slidePerPage, setslidePerPage] = useState(2);

  const pagesVisited = pageNumber * slidePerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

//




  useEffect(() => {
    dispatch(listslide());
  }, [dispatch]);


  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteslide(id));
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
            <th>Image</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
        {slides.slide?.slice(pagesVisited, pagesVisited + slidePerPage)
                    .map((slide) => (
          <tr>
           
            <td><img height="100%" width="100%" src={slide.image}/></td>
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
                  
                  <Link   onClick={() => deletehandler(slide._id)} className="dropdown-item text-danger" to="#">
                  Supprimer
                  </Link>
                </div>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>)}
<ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(slides.slide?.length / slidePerPage)}
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
