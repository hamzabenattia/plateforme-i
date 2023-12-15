import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-secondary">
            <i className="fas fa-user text-light"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Client</h6>
            <p className="mb-1">
              {order.shippingAddress.fullname} <br />
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-secondary">
            <i className="text-light fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Informations de commande</h6>
            <p className="mb-1">
              Shipping: {order.shippingAddress.country} <br /> Méthode de paiement:{" "}
              {order.paymentMethod}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-secondary">
            <i className="text-light fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Livrer à</h6>
            <p className="mb-1">
            Adresse: {order.shippingAddress.address}
              <br />
              Ville: {order.shippingAddress.city}
              <br /> Code postal: {order.shippingAddress.postalCode}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
