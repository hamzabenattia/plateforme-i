import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import { getPrintingOrderDetails } from "../../Redux/Actions/PrintingActions";

const OrderDetailmain = (props) => {
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  const printingorderDetails = useSelector((state) => state.printingorderDetails);
  const { loading:printingloading, error:printingerror, order:printing } = printingorderDetails;


  useEffect(() => {
    dispatch(getPrintingOrderDetails(orderId))

    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };


console.log(order)

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
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
                  <i className="far fa-calendar-alt mx-2" style={{color : "#fff" , fontSize:"20px"}}></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
               </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isAccepted ? (
                    
                    <div className="box bg-light" style={{minheight:"80%"}}>
                    <h6>Imprimerie</h6>
                    <hr/>
                      {printingloading && <Loading/> }
                      <>
                        <h6 className="mb-0">Nom d'agence:</h6> <p>{printing[0].acceptedby.socite}</p>
                    <h6 className="mb-0">Date d'acceptation:</h6> <p> {moment(printing[0].accepteddAt).format("MMM Do YY")}</p>
                    <h6 className="mb-0 ">Statut:</h6> <p>{printing[0].status}</p>
                    
                    </>
                </div>
                
                  ) : (
                    <>
                    
                      <button
                        className="btn btn-dark col-12"
                      >
                        Pas encore accepté
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
