import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listUser } from '../../Redux/Actions/userActions';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import User from '../users/User';
import Printing from './Printing'

function PrintingComponent() {

  const dispatch = useDispatch();


  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;


  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [userPerPage, setuserPerPage] = useState(10);

  const pagesVisited = pageNumber * userPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    const Print = users?.filter((value) => {
      return value.role.toLowerCase().includes("Imprimerie".toLowerCase());
    });




  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Imprimerie</h2>
       
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Recherche..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select onChange={(e) => setuserPerPage(e.target.value)} className="form-select">
                <option value={10}>Show 10</option>
                <option value={20}>Show 20</option>
                <option value={30}>Show 30</option>
                <option value={users?.length}>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select  className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) :
          Print.length>0 ?(
            <div className="row">
                {Print
                  .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((user) => (
                      <Printing user={user} key={user._id} />
              ))}

<div className="float-end mt-4" aria-label="Page navigation">
<ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={Math.ceil(users?.length / userPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 
      </div>



            </div>

            
            ):<>No Imprimerie</>}
        </div>
      </div>
    </section>
  )
}

export default PrintingComponent