import React from "react";
import "./navbar.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);

  return (
    <div>
      {/* <nav className="mx-3 mt-1 navbar navbar-expand-lg    ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Rarible
          </a>
          <div className="d-flex ">
            <div className="searchIcon ">
              <SearchOutlined />
            </div>
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i
                  className="  fas fa-bars"
                  style={{ color: "black !important" }}
                ></i>
              </button>
            </div>{" "}
          </div>

          <div className="col-md-4   col-lg-6 col-sm-12 ms-lg-3 ">
            <Search
              placeholder="Collection ,Item,User"
              className="searchBtn"
              onSearch={onSearch}
              enterButton
              allowClear
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-2  ms-5   me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <a className="nav-link active" aria-current="page" href="/">
                  Marketplace
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navL" href="/list-nft">
                  List Nft
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navL" href="/balance">
                  Balance Page
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navL" href="/front-money">
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
      </nav> */}

      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <a className=" ms-lg-4 navbar-brand" href="#">
            Marketplace
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
            <i
              className="  fas fa-bars"
              style={{ color: "black !important" }}
            ></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 ms-sm-auto mb-lg-0 ms-auto">
              <li className="nav-item ">
                <Link to="/">
                  <a className="nav-link active">
                    Marketplace
                </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/list_nft">
                  <a className="nav-link navL" >
                    List Nft
                </a>
                </Link>

              </li>
              <li className="nav-item">
                <Link to="/balance">
                  <a className="nav-link navL" >
                    Balance Page
                </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my_collection">
                  <a className="nav-link navL" >
                    front-money Nft
                </a>
                </Link>
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

            <form class="d-flex">
              <input
                className="form-control  search-data "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                className="fas fa-search"
                type="submit"
              ></button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
