import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  const { order, } = props;
  return (
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
  );
};

export default Orders;
