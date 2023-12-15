import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  updateUser,
} from "./../../Redux/Actions/userActions";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";





const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditUserMain = (props) => {
  const dispatch = useDispatch();
  const { userid } = props;

  const [role, setRole] = useState("");
  const [isActive, setisActive] = useState("");





  const usertEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = usertEdit;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      toast.success("user Updated", ToastObjects);
    } else {
      if (user._id !== userid) {
        dispatch(editUser(userid));
      } else {
        setRole(user.role)
        setisActive(user.isActive)
      }
    }
  }, [user, dispatch, userid, successUpdate]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userid,
        role,
        isActive
      }));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>

  <div className="content-header">
  <Link to="/users" className="btn btn-danger text-white">
  Aller aux utilisateurs
            </Link>
    <h2 className="content-title">Paramètre d'utilisateur
 </h2>
  </div>

  <div className="card mb-4 shadow-sm">
    <div className="card-body">
    {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                    {loadingUpdate && <Loading />}
                    {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
      <div className="row">
       
        <div className="col">
          
          <section className="content-body">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row gx-3">
                    <div className="col-6  mb-3">
                      <label className="form-label">Prénom</label>
                      <input className="form-control" type="text" value={user.fname} disabled/>
                    </div> 
                    <div className="col-6  mb-3">
                      <label className="form-label">Nom</label>
                      <input className="form-control" type="text" value={user.lname} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Email</label>
                      <input className="form-control" type="email" value={user.email} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Numéro de téléphone</label>
                      <input className="form-control" type="tel" value={user.phonenum} disabled/>
                    </div> 
                    {user.role ==="Imprimerie" &&
                    <>
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Imprimerie:</label>
                      <input className="form-control" type="text" value={user.socite} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">TVA:</label>
                      <input className="form-control" type="text" value={user.tva} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Adresse:</label>
                      <input className="form-control" type="text" value={user.adresse?.adr} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Ville:</label>
                      <input className="form-control" type="text" value={user.adresse?.ville} disabled/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Code Postal:</label>
                      <input className="form-control" type="text" value={user.adresse?.zipecode} disabled/>
                    </div> 
                    </>}
                    
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Rôle</label>
                      <select class="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                   <option>Admin</option>
                                   <option>User</option>
                                   <option>Imprimerie</option>

                              </select>
                    </div> 
                   
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Statut</label>
                      <select class="form-select" value={isActive} onChange={(e) => setisActive(e.target.value)}>
                                   <option value="true">Active</option>
                                   <option value="false">Disabled</option>

                              </select>
                    </div> 
                  </div> 
                </div>
                <aside className="col-lg-4">
                  <figure className="text-lg-center">
                    <img className="img-lg mb-3 img-avatar" src={user.avatar} alt="User Photo"/>

                  </figure>
                </aside>
              </div> 
              <br/>
              <button className="btn btn-primary" type="submit">Sauvegarder les modifications</button>
            </form>




          </section> 
        </div>
      </div> 
      </>
                  )}
    </div>
  </div> 

</section>
    </>
  );
};

export default EditUserMain;
