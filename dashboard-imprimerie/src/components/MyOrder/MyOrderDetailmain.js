import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { getPrintingOrderDetails, updateprintOrder } from "../../Redux/Actions/PrintingActions";
import MyOrderDetailInfo from "./MyOrderDetailInfo";
import MyOrderDetailProducts from "./MyOrderDetailProducts";

const MyOrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();
  const [facture, setFacture] = useState("");
  const [status, setStatus] = useState("");




  const orderDetails = useSelector((state) => state.printingorderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: printingloading, success: successDelivered } = orderDeliver;


  const printingorderUpdate = useSelector((state) => state.printingorderUpdate);
  const { loading: printingupdateloading, success: updated } = printingorderUpdate;



  const handleDataChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setFacture(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
	}




  useEffect(() => {
    dispatch(getPrintingOrderDetails(orderId));
  }, [dispatch, orderId,successDelivered,updated]);


  const AccepterHandler = () => {
    dispatch(deliverOrder(order));

    dispatch(updateprintOrder({id:order._id,status:"Delivered"}))
    
    

  };


  const FactureHandler = () => {
    dispatch(updateprintOrder({id:order._id,facture}))
    
    
  };






  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/myorders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.accepteddAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
               
              {order.facture &&
                <a href={order.facture} target="_blank*" className="btn btn-success ms-2" >
                  <i className="fas fa-print"></i>
                </a>}
                
              </div>
              
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <MyOrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <MyOrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.order.isDelivered ? (
                    
                    <div className="box bg-light" style={{minheight:"80%"}}>
                    <h6 className="text-center">Delivered at {moment(order.order.deliveredAt).format("DD/MM/YYYYY")}</h6>
                   
                </div>
                
                  ) : (
                    
                    <>
                      {printingloading && <Loading/> }
                      <button onClick={AccepterHandler}
                        className="btn btn-dark col-12"
                      >
                        Livré
                      </button>
                    </>
                  )}
                </div>
                {!order.facture &&

                <div className="box shadow-sm bg-light">
                <div className="box bg-light" style={{minheight:"80%"}}>
                          <>
                          
                Ajouter une facture: <label className="mt-2 rounded font-medium bg-gray-400 cursor-pointer text-white"> 
                                          <input
                                            type="file"
                                            onChange={handleDataChange}

                                        />
                                         
                                    </label>  
                                    {printingupdateloading && <Loading/> }
                                    <button onClick={FactureHandler}
                        className="btn btn-dark col-12 mt-2"
                      >
                        Ajouter
                      </button>
                      
                       
                      </>
                                    </div>
                                                 </div>}
              </div>
            
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyOrderDetailmain;
