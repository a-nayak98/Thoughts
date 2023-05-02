import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ModalContext } from "../context/ModalContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const CurrentUserPostsPage = () => {
  const [userPosts, setCurrentUserPosts] = useState([]);
  const { user, formData, setFormData, handleShow } = useContext(ModalContext);
  const navigate = useNavigate();

  // const ApiUrl = import.meta.env.VITE_API_BASE_URL;
  const ApiUrl = "https://thoughts-b9rq.onrender.com";

  var userId = user._id;
  // console.log(userId);
  const getPosts = async () => {
    try {
      console.log(userId, "user ra id.. ");
      const res = await axios.get(`${ApiUrl}/api/current-user-post/${userId}`);
      // console.log(res.data.data, "line 23 -cupp");
      var myData = res.data.data;
      setCurrentUserPosts(myData);
    } catch (error) {
      // console.log(error.message, "line-27 - catch");
    }
  };
  // deleting the single post
  const deletePost = async (data) => {
    try {
      const id = data._id;
      console.log(id, "user ra id.");
      const res = await axios.delete(`${ApiUrl}/api/delete-post/${id}`);
      console.log(res);
      if (res.status === 204) {
        toast.success("Post Deleted Successfully.");
        // setCurrentUserPosts(myData);
        getPosts();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // deleting the single post
  const editPost = (elem) => {
    const editingData = {
      title: elem.title,
      description: elem.description,
      croppedFile: elem.image,
      image: null,
      edit: true,
      id: elem._id,
    };
    setFormData({ ...editingData });
    navigate("/create_post");
    console.log(editingData);
    // let id = elem._id;

    // api call

    // const response = axios.pa
  };

  // useEffect
  useEffect(() => {
    if (userId) {
      getPosts();
    } else {
      toast.error("Please log in");
      handleShow();
    }
  }, [userId]);

  console.log(userPosts);
  const createMarkup = (content) => {
    return { __html: content };
  };

  const goToPost = (elem) => {
    const postId = elem._id;
    // sending a single postId to that particular post page
    navigate({
      pathname: "/single-post",
      search: createSearchParams({
        id: postId,
      }).toString(),
    });
    console.log(postId);
  };

  return (
    <>
      <Navbar color={"#333"} />
      <section id="current-user-posts" className="sec-current-user-post">
        <div className="user-posts-container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {userPosts.length === 0 ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "1.5em",
                      fontWeight: "700",
                      margin: "0",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    You Have Not Posted Anything Yet !!!! Click On Create Post
                    To Post Anything.
                  </p>
                ) : (
                  userPosts?.map((el) => {
                    return (
                      <div
                        className="container-post"
                        onClick={() => goToPost(el)}
                      >
                        <div className="image-post">
                          <img src={el.image} alt="no image" />
                        </div>
                        <div className="desc-post">
                          <h3 className="title-post">{el.title}</h3>
                          <div
                            dangerouslySetInnerHTML={createMarkup(
                              el.description
                            )}
                          />
                          <div className="icons">
                            <MdDelete onClick={() => deletePost(el)} />
                            <FiEdit onClick={() => editPost(el)} />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
        toastOptions={{
          className: "",
          success: {
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
};

export default CurrentUserPostsPage;
