import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../Redux/Actions/userActions";


const User = (props) => {
  const { user } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteUser(id));
    }
  };


  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={user.avatar} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
             Nom: {user.fname} {" "} {user.lname}
            </Link>
            
            <div className=" mb-2">Email : {user.email}</div>
            <div className=" mb-2">Rôle : {user.role}</div>
            <div className=" mb-2">Statut: {user.isActive ? <>Actif</>: <>Désactivé</>}</div>

            <div className="row d-flex justify-content-center">
              <Link
                to={`/user/${user._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6 me-2"
                style={{width:"50px"}}
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(user._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6 ms-2"
                style={{width:"50px"}}
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
