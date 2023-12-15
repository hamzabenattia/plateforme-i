import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { order, } = props;

  return (
          <tr key={order._id}>
            <td>
              <b>{order.shippingAddress.fullname}</b>
            </td>
            <td>{order.user.email}</td>
            <td>{order.totalPrice} TND</td>
            <td>
              {order.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Payé au {moment(order.paidAt).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
Impayé                </span>
              )}
            </td>
            <td>{moment(order.createdAt).format("MMM Do YY")}</td>
            <td>
              {order.isDelivered ? (
                <span className="badge btn-success">Livré</span>
              ) : (
                <span className="badge btn-dark">Non livrés                </span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>  
  );
};

export default Orders;
