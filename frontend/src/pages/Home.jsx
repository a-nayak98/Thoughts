import React, { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
import Placeholders from "../components/Placeholders";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";

// import UserModal from "../components/UserModal";

const Home = () => {
  const [myPostData, setMyPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  // const baseApiUrl = process.env.REACT_APP_API_BASE_URL;
  // const ApiUrl = import.meta.env.VITE_API_BASE_URL;
  const ApiUrl = "https://thoughts-b9rq.onrender.com";
  // console.log(ApiUrl, "Enviornment variable");

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`${ApiUrl}/api/posts-all`);
      // console.log(res.data.data);
      var myData = res.data.data;
      setMyPostData(myData);
    };
    getPosts();
    document.title = "Home | Blog | Bombastic";
  }, []);

  // const heroPost = myPostData
  const fakePost = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // get current Post for the Pagination section ---start
  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const records = myPostData?.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(myPostData?.length / postPerPage);
  const numbers = [...Array(nPages + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  // get current Post for the Pagination section --end
  // console.log(myPostData);

  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <div className="hero-size">
            <Navbar color={"#0000"} />
            <Hero data={myPostData} />
          </div>
        </div>
      </section>
      <section className="posts-section" id="posts">
        <div className="container" id="gallery">
          {records?.map((el) => (
            // <Link className="a-tag" to={"/single-post"}>
            <Post data={el} />
            // </Link>
          ))}
          {!myPostData?.length ? fakePost.map((el) => <Placeholders />) : null}
        </div>
        <nav className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#posts"
                tabindex="-1"
                // aria-disabled="true"
                onClick={prePage}
              >
                <TbPlayerTrackPrevFilled />
              </a>
            </li>
            {numbers?.map((n, i) => {
              return (
                <li className="page-item" key={i}>
                  <a
                    href="#posts"
                    className={`page-link ${currentPage === n ? "active" : ""}`}
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              );
            })}
            <li
              className={`page-item ${
                currentPage === numbers.length ? "disabled" : ""
              }`}
            >
              <a className="page-link" href="#posts" onClick={nextPage}>
                <TbPlayerTrackNextFilled />
              </a>
            </li>
          </ul>
        </nav>
      </section>
      {/* modal for post  */}
      <section className="create-post-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-md-12">
              <div className="create-post">
                {/* <p>Hey there Welcome & try to post something here.</p> */}
                <Link to="/create_post">
                  <button>Create Your Story</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Modal for Login user */}
      {/* <UserModal /> */}
      {/* <!--Mobile Menu Modal Start --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content myModalContent">
            <div className="modal-header myModalHeader">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Site Navigation
              </h1>
              <button
                type="button"
                className="btn-close myBtnClose"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul>
                <li>Home</li>
                <li>Blog</li>
                <li>Contact</li>
                <li>Post</li>
                <li>Category</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!--Mobile Menu Modal End --> */}
    </main>
  );
};

export default Home;
