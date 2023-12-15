import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'






const TD = styled.td`

background-color: red;

`;





const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }} >Produit</th>
          <th style={{ width: "30%" }} >Detaille</th>

          <th style={{ width: "20%" }}>Attachment</th>
          <th style={{ width: "20%" }} className="text-center">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td style={{ width: "40%" }}>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
                
              </Link>
            </td>
            <td  style={{ width: "30%" }}>
            {item.caract.map((i, ix) => (
              <p>{i}</p>
            ))}
            </td>
            <td style={{ width: "20%" }}> 
               <a href={`${item.attachment}`} target="framename" className="text-success">
                <i className="fas fa-eye m-5"></i>
              </a></td>
            <td style={{ width: "20%" }}><p className="text-center mt-5 ">{item.qty}</p> </td>
            
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
