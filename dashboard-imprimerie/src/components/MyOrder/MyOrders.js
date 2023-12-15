import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MyOrders = (props) => {
  const { order, } = props;

  return (

  
          <tr key={order._id}>
            <td>
              <b>{order._id}</b>
            </td>
            <td>{order.order.orderItems.length}</td>
            <td>{order.order.shippingAddress?.country}, {order.order.shippingAddress?.city} </td>
            
            <td>{moment(order.accepteddAt).format("MMM Do YY")}</td>
            <td>
              
            {order.status === "Pending" ? (
                <span className="badge rounded-pill alert-info">
                  {order.status}
                </span>
              ) : (
                <span className="badge rounded-pill alert-success">
                  {order.status}
                </span>
              )}           
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/myorder/${order._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>  
  );
};

export default MyOrders;
