import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import Login from "./screens/LoginScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { listOrders } from "./Redux/Actions/OrderActions";
import { useDispatch, useSelector } from "react-redux";
import UserEditScreen from "./screens/UserEditScreen";
import MyOrderScreen from "./screens/MyOrderScreen";
import { listPrintingOrders } from "./Redux/Actions/PrintingActions";
import MyOrderDetailScreen from "./screens/MyOrderDetailScreen";

function App() {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.user.role==="Imprimerie" && userInfo.user.isActive===true) {
      dispatch(listOrders());
      dispatch(listPrintingOrders())

    }
  }, [dispatch, userInfo]);






  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/profile" component={UserEditScreen} />
          <PrivateRouter path="/myorders" component={MyOrderScreen} />
          <PrivateRouter path="/myorder/:id" component={MyOrderDetailScreen} />

          <Route path="/login" component={Login} />

          <PrivateRouter path="*" component={NotFound} />
  
        </Switch>
      </Router>
    </>
  );
}

export default App;
