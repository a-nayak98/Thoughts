import React, { useContext, useRef } from "react";
import { TfiFacebook, TfiTwitterAlt } from "react-icons/tfi";
import { ImInstagram } from "react-icons/im";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import { ModalContext } from "../context/ModalContext";
import UserModal from "../components/UserModal";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = (props) => {
  const { handleShow, user } = useContext(ModalContext);

  return (
    <>
      <header className="mainHeader" style={{ backgroundColor: props.color }}>
        <div className="container">
          <div className="row header-margin">
            <div className="col-lg-3 d-lg-block d-md-none d-sm-none">
              <div className="nav-social">
                <a
                  href="https://www.facebook.com/profile.php?id=100025740585752"
                  target="_blank"
                >
                  <TfiFacebook />
                </a>
                <a
                  href="https://www.instagram.com/avi_the_grueeee/"
                  target="_blank"
                >
                  <ImInstagram />
                </a>
                <a
                  href="#"
                  
                >
                  <TfiTwitterAlt />
                </a>
              </div>
            </div>
            <div className="col-2 col-md-2 d-lg-none">
              <div className="mobileMenu">
                {/* <!-- Button trigger modal --> */}
                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <img src="/images/menu.png" alt="" />
                </button>
              </div>
            </div>
            <div className="col-8 col-md-7 col-lg-6">
              <div className="nav-logo">
                <Link className="a-tag" to={"/"}>
                  <img
                    src="/images/logo1-removebg-preview.png"
                    alt=""
                  />
                  {/* <h1 style={{fontWeight:"900", fontSize:'2em'}}>Thoughts!</h1> */}
                </Link>
              </div>
            </div>
            <div className="col-2 col-md-2 col-lg-2">
              <div className="nav-search">
                <p>Search</p>
                <GoSearch className="search-logo" />
              </div>
            </div>
            <div className="col-md-1 col-lg-1">
              <div className="nav-user">
                <div className="imageContainer">
                  {!user.avatar ? (
                    <img src="/images/user.png" alt="" onClick={handleShow} />
                  ) : (
                    <img src={`${user.avatar}`} onClick={handleShow} />
                  )}
                </div>
                <div className="drop-down">
                  <IoMdArrowDropdown />
                </div>
                {user.token === null ? (
                  ""
                ) : (
                  <div className="drop-down-box">
                    <Link to={"/current-user-post"}>
                      <p>My Posts</p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="sub-menu">
                <ul>
                  <Link className="a-tag" to={"/"}>
                    <li>Home</li>
                  </Link>
                  <li>Blog</li>
                  <li>Contact</li>
                  <Link className="a-tag" to={"/create_post"}>
                    <li>Create Post</li>
                  </Link>
                  <li>Category</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <UserModal />
    </>
  );
};

export default Navbar;
