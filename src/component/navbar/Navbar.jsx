import React from "react";
import "./navbar.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <div>
      <nav className="mx-3 mt-1 navbar navbar-expand-lg    ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Rarible
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* <span className="navbar-toggler-icon"></span> */}
            <i class="navbar-toggler-icon fas fa-bars"></i>
          </button>
          <div className="col-md-4   col-lg-6 col-sm-12 ms-lg-3 ">
            <Input
              placeholder="Collection ,Item or user "
              className="productSearch"
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-2 ms-auto   me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="#">
                  Marketplace
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  List Nft
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Balance Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  front-money Nft
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Wallet
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Connect
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
