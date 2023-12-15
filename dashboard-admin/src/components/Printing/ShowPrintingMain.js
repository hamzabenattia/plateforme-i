import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { listPrintingOrders } from '../../Redux/Actions/PrintingActions';
import { editUser } from '../../Redux/Actions/userActions';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import PrintingOrderMain from '../PrintingOrder/PrintingOrderMain';


const Div = styled.div `
flex-basis:230px;
`;

const Div2 = styled.div `
margin-top: -120px;

`;

function ShowPrintingMain(props) {

  const dispatch = useDispatch();
  const { userid } = props;



  const usertEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = usertEdit;

  const orderList = useSelector((state) => state.printingorderList);
  const { loading: loadingorder, error:errororder, orders } = orderList;

let totalprix = 0;

  useEffect(() => {
      if (user._id !== userid) {
        dispatch(editUser(userid));
        dispatch(listPrintingOrders(userid));
      }
  }, [user,orders, dispatch, userid]);


  if (orders) {
    orders.map((order) =>{
      totalprix = totalprix+order?.totalPrice;
    }
    );
  }



  return (
    <section className="content-main">

                    <div className="content-header">
    <Link to="/printing" className="btn btn-light"><i className="material-icons md-arrow_back"></i> Retourner </Link>
</div>

<div className="card mb-4">
<div className="card-header bg-warning" style={{height:"150px"}}>
  
</div> 
<div className="card-body">
    <div className="row">
      <Div className="col-xl col-lg flex-grow-0" > 
        <Div2 className="img-avatar  w-100 bg-white position-relative text-center" style={{height:"200px" , width:"200px"}}>
          <img src={user.avatar} className="img-avatar" width= "200px" height="190px"    alt="Logo Brand"/>
        </Div2>
      </Div>
      <div className="col-xl col-lg">
        <h3>{user.socite}</h3>
        <p>{user.adresse?.adr} {user.adresse?.ville} {user.adresse?.zipecode}</p>

      </div> 
      <div className="col-xl-4 text-md-end">
          
          <a href={`/user/${user._id}/edit`} className="btn btn-outline-primary"> Voir le profil <i className="material-icons md-launch"></i> </a>
      </div> 
    </div> 
    <hr className="my-4"/>
    <div className="row g-4">
      <div className="col-md-12 col-lg-4 col-xl-2">
        <article className="box">
          <p className="mb-0 text-muted">Commande totale:</p>
          <h5 className="text-success">{orders?.length}</h5>
        </article>
      </div>
      <div className="col-sm-6 col-lg-4 col-xl-3">
        <h6>Contacts</h6>
        <p>
          Manager: {user.fname} {" "} {user.lname} <br/>
          {user.email} <br/>
          {user.phonenum}
        </p>
      </div> 
      <div className="col-sm-6 col-lg-4 col-xl-3">
        <h6>Addresse</h6>
        <p>
          Ville: {user.adresse?.ville} <br/>
          Address: {user.adresse?.adr} <br/>
          Postal code: {user.adresse?.zipecode}
        </p>
      </div> 
      
    </div> 
</div> 
</div> 
<div className="card mb-4">

<PrintingOrderMain orders={orders} loading={loadingorder} error={errororder}/>
</div>

    </section>
  )
}

export default ShowPrintingMain