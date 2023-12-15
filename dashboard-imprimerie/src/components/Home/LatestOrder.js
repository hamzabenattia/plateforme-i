import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h4 className="card-title">Dernières commandes disponibles
</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Item N°</th>
                  <th scope="col">Expédiés à</th>
                  <th scope="col">Paid</th>
                  <th scope="col">Date</th>
                  <th>Status</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {orders.slice(0,5).map((order) => (
                 <tr key={order._id}>
                 <td>
                   <b>{order._id}</b>
                 </td>
                 <td>{order.orderItems.length}</td>
                 <td>{order.shippingAddress.country}, {order.shippingAddress.city} </td>
                 <td>
                   {order.isPaid ? (
                     <span className="badge rounded-pill alert-success">
                       Paid At {moment(order.paidAt).format("MMM Do YY")}
                     </span>
                   ) : (
                     <span className="badge rounded-pill alert-danger">
                       Not Paid
                     </span>
                   )}
                 </td>
                 <td>{moment(order.createdAt).format("MMM Do YY")}</td>
                 <td>
                   {order.isDelivered ? (
                     <span className="badge btn-success">Delivered</span>
                   ) : (
                     <span className="badge btn-dark">Not delivered</span>
                   )}
                 </td>
                 <td className="d-flex justify-content-end align-item-center">
                   <Link to={`/order/${order._id}`} className="text-success">
                     <i className="fas fa-eye"></i>
                   </Link>
                 </td>
               </tr>  
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
