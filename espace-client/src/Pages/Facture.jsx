import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FactureMain from '../components/FactureMain';
import Loading from '../components/Loading';
import { getOrderDetails } from '../Redux/Actions/OrderActions';

function Facture() {
   

  return (
  <>
  <FactureMain/>
  </>
  )
}

export default Facture