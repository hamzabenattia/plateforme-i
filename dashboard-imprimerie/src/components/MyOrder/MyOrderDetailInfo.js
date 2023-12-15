import React from "react";

const MyOrderDetailInfo = (props) => {
  const { order } = props;

  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Client</h6>
            <p className="mb-1">
              {order.order.shippingAddress.fullname} <br />
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Ordre info</h6>
            <p className="mb-1">
              Shipping: {order.order.shippingAddress.country} <br />
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Deliver to</h6>
            <p className="mb-1">
              Address: {order.order.shippingAddress.address}
              <br />
              City: {order.order.shippingAddress.city}
              <br /> Zipcode: {order.order.shippingAddress.postalCode}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MyOrderDetailInfo;
