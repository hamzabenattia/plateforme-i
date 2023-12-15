import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { getOrderDetails } from '../Redux/Actions/OrderActions';


function FactureMain() {

    const location = useLocation();

    const orderId = location.pathname.split("/")[2];
    let navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
  
  
    if (!loading && !error) {
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
  
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
    }
  
  
  
  
    useEffect(() => {
  
      if (!order) {
        dispatch(getOrderDetails(orderId));
      }
  
    }, [dispatch, orderId, , order]);
  
  
  
  
  



  return (

    <div>

    {error ? (
               <>   {error}</>
        ) : loading ? (
          <Loading />
        ) :
    <>
                <div class="container" >
                    <div class="brand-section">
                        <div class="row">
                            <div class="col-6">
                                <h1 class="text-white">PrintHub</h1>
                            </div>
                            <div class="col-6">
                               
                            </div>
                        </div>
                    </div>
            
                    <div class="body-section">
                        <div class="row">
                            <div class="col-6">
                                <h2 class="heading">Invoice No: {order._id}</h2>
                                <p class="sub-heading">Order Date: {moment(order.createdAt).format("DD/MM/YYYY")}</p>
                                <p class="sub-heading">Email Address: {"req.user.email"} </p>
                            </div>
                            <div class="col-6">
                                <p class="sub-heading">Full Name: {order.shippingAddress.fullname}  </p>
                                <p class="sub-heading">Address: {order.shippingAddress.address}  </p>
                                <p class="sub-heading">Phone Number: {""}   </p>
                                <p class="sub-heading">Country: {order.shippingAddress.country} ,City: {order.shippingAddress.city} ,Code Postal: {order.shippingAddress.postalCode}  </p>
                            </div>
                        </div>
                    </div>
            
                    <div class="body-section">
                        <h3 class="heading">Ordered Items</h3>
                        <br/>
                        <table class="table-bordered">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th class="w-20">Price</th>
                                    <th class="w-20">Quantity</th>
                                    <th class="w-20">Grandtotal</th>
                                </tr>
                            </thead>
                            <tbody>
        
                            {order.orderItems.map((i) => (
                             
                              <tr>
                                  <td>{i.name}</td>
                                  <td>{i.price} TND</td>
                                  <td>{i.qty}</td>
                                  <td>{(i.qty * i.price).toFixed(2)} TND</td>
                              </tr>
                              
                               ))}
                               
                                <tr>
                                    <td colspan="3" class="text-right">TOTAL (HT)</td>
                                    <td>{(Number(order.itemsPrice) + Number(order.shippingPrice)).toFixed(2)} TND</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-right">Total TAXES:</td>
                                    <td>{order.taxPrice} TND</td>
                                </tr>
                                <tr>
                                    <td colspan="3" class="text-right">TOTAL TTC</td>
                                    <td>{order.totalPrice} TND</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        <h3 class="heading">Payment Status:Not Paid</h3>
                        <h3 class="heading">Payment Mode: {order.paymentMethod}</h3>
                    </div>
            
                    <div class="body-section">
                        <p>&copy; Copyright 2022 - Printhub. All rights reserved. 
                            <a href="https://www.printhub.tn/" class="float-right">www.printhub.tn</a>
                        </p>
                    </div>      
                </div>      
       
    
    </>}
    
    
        </div>
  )
}

export default FactureMain