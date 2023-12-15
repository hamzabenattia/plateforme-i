import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import SlideShowScreen from "./screens/SlideShowScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PrintingScreen from "./screens/PrintingScreen";
import PrintingShowSceen from "./screens/PrintingShowSceen";
import PrintingOrdersSceen from "./screens/PrintingOrdersSceen";
import { listPrintingOrders } from "./Redux/Actions/PrintingActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.user.role==="Admin") {
      dispatch(listProducts());
      dispatch(listOrders());


    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={CategoriesScreen} />
          <PrivateRouter path="/slideshow" component={SlideShowScreen} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/product/:id/edit" component={ProductEditScreen}/>
          <PrivateRouter path="/user/:id/edit" component={UserEditScreen}/>
          <PrivateRouter   path="/printing/orders"  component={PrintingOrdersSceen}/>
          <PrivateRouter path="/printing/:id" component={PrintingShowSceen}/>
          <PrivateRouter path="/printing/" component={PrintingScreen}/>



          <Route path="/login" component={Login} />

          <PrivateRouter path="*" component={NotFound} />
  
        </Switch>
      </Router>
    </>
  );
}

export default App;
