import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const PrintingOrder = (props) => {
  const { order, } = props;

  return (
          <tr key={order._id}>
            <td>
              <b>{order.order._id}</b>
            </td>
            <td>{order.order.shippingAddress.fullname}</td>
            <td>{order.order.shippingAddress.country}</td>
            <td>
            <td>{moment(order.accepteddAt).format("Do MMM  YYYY")}</td>
            </td>
            <b>{order.status}</b>

            <td>
            <a href={order.facture} target="_blank" className="text-success">
                <i className="fas fa-eye"></i>
              </a>            </td>
            <td className="d-flex justify-content-end align-item-center" >
            <a href={`/order/${order.order._id}`} className="text-success">

              <div className="btn btn-light">View</div>
              </a>
            </td>
          </tr>  
  );
};

export default PrintingOrder;
