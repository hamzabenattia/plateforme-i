import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from 'styled-components';



const A = styled(Link)`
    color: #6c757d;
    padding:5px ;
    padding-left:50px ;
    display: block;
    text-decoration: none;
    font-size:15px ;
`

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="https://res.cloudinary.com/durmvqkw9/image/upload/v1653511299/log_rxuokl.png"
              style={{ height: "46" }}
              className="logo"
              alt="Printhub dashboard "
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/"
                exact={true}
              >
                <i className="icon fas fa-home"></i>
                <span className="text">Tableau de bord</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Produits</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Ajouter un produit</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Catégories</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/slideshow"
              >
                <i className="icon 	fas fa-images"></i>             
                <span className="text">SlideShow</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/orders"
              >
                <i className="icon fas fa-bags-shopping"></i>
                <span className="text">Ordres</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/users"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Utilisateurs</span>
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                activeClassName="active"
                className="menu-link"
                to="/printing"
              >
                <i className="icon fas fa-store-alt"></i>
                <span className="text">Imprimerie</span>
              </NavLink>
            </li>



        { /*<li className="menu-item has-submenu">
        <NavLink to="s"className="menu-link collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
        <i className="icon fas fa-store-alt"></i>
        <span className="text">Imprimerie</span>
        </NavLink>
        <div className="collapse" id="home-collapse" >
          <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <A to="/printing" >All Printing</A>
            <A to="/printing/orders" >Printing Order</A>
            <A to="#" >Reports</A>
          </div>
        </div>
  </li>*/}


  
          </ul>
    
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
