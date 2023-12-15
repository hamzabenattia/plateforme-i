import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  updateUser,
} from "./../../Redux/Actions/userActions";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";




const EditUserMain = (props) => {
  const dispatch = useDispatch();
  const { userid } = props;

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };


  const usertEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = usertEdit;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;



  useEffect(() => {
    dispatch(editUser("profile"))
    
  }, [dispatch, userid, successUpdate]);




  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [tva, setTva] = useState("");

  const [socite, setSocite] = useState("");
  const [adresse, setAdresse] = useState({
    adr: "",
    ville: "",
    zipecode:"",
  });



  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

  const toastId = React.useRef(null);


  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	}

  const handleAdresseChange = (e) => {
    setAdresse({ ...adresse, [e.target.name]: e.target.value });
  };


  const submitHandler =  (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(updateUser({ id: user._id, fname,lname ,email, password,phonenum, avatar,socite,tva,adresse }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
      }
    }
  };






  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>

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
                      <input className="form-control" type="text"  defaultValue={user.fname}  onChange={(e) => setFname(e.target.value)} />
                    </div> 
                    <div className="col-6  mb-3">
                      <label className="form-label">Nom</label>
                      <input className="form-control" type="text" defaultValue={user.lname}  onChange={(e) => setLname(e.target.value)} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Email</label>
                      <input className="form-control" type="email" defaultValue={user.email}  onChange={(e) => setEmail(e.target.value)} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Numéro de téléphone</label>
                      <input className="form-control" type="tel"   defaultValue={user.phonenum}  onChange={(e) => setPhonenum(e.target.value)}/>
                    </div> 

                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Nouveau mot de passe</label>
                      <input type="password" className="form-control" id="mdp" onChange={(e) => setPassword(e.target.value)} placeholder="votre mot de passe"/>
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Confirme mot de passe</label>
                      <input type="password" className="form-control" id="confirmmdp" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="votre mot de passe"/>
                    </div> 













                        <div className="col-lg-6  mb-3">
                      <label className="form-label">Imprimerie:</label>
                      <input className="form-control" type="text" defaultValue={user.socite}  onChange={(e) => setSocite(e.target.value)} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">TVA:</label>
                      <input className="form-control" type="text" defaultValue={user.tva}  onChange={(e) => setTva(e.target.value)} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Adresse:</label>
                      <input className="form-control" type="text" name="adr" defaultValue={user.adresse?.adr}  onChange={handleAdresseChange} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Ville:</label>
                      <input className="form-control" type="text" name="ville" defaultValue={user.adresse?.ville}  onChange={handleAdresseChange} />
                    </div> 
                    <div className="col-lg-6  mb-3">
                      <label className="form-label">Code Postal:</label>
                      <input className="form-control" type="text" name="zipecode" defaultValue={user.adresse?.zipecode}   onChange={handleAdresseChange}/>
                    </div> 
                  
                    

                   
                   
                  </div> 
                </div>
                <aside className="col-lg-4">
                  <figure className="text-lg-center">
                    
                    <img className="img-lg mb-2 img-avatar" src={avatarPreview} alt="User Photo"/>
                    <label className="img-lg ms-5 img-avatar rounded font-medium bg-gray-400 cursor-pointer text-white w-full py-2 px-2.5">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange}
                                        />
                                    </label>

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
