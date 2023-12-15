import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";
import User from "./User";

const UserComponent = () => {
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

//
  

// Search Filter
const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");


const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = users.filter((value) => {
    return value.fname.toLowerCase().includes(searchWord.toLowerCase()) ||
     value.lname.toLowerCase().includes(searchWord.toLowerCase()) || 
     value.email.toLowerCase().includes(searchWord.toLowerCase())
  });

  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};


//




  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Liste des utilisateurs</h2>
        
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
              onChange={handleFilter}
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
            
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) :
            users.length>0 ?(
            <div className="row">
              {wordEntered ==="" ? (<> {users
                  .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((user) => (
                      <User user={user} key={user._id} />
              ))}</>): (<> {filteredData
                  .slice(pagesVisited, pagesVisited + userPerPage)
                    .map((user) => (
                      <User user={user} key={user._id} />
              ))}</>)}
               
            </div>
            ):<></>}
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
      </div>
    </section>
  );




  
};

export default UserComponent;
