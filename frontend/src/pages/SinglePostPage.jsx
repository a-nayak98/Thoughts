import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { ModalContext } from "../context/ModalContext";
import { AiOutlineDelete } from "react-icons/ai";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { GrFacebookOption } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri";
import { AiTwotoneHeart } from "react-icons/ai";

const SinglePostPage = () => {
  // for the every single comment body text before submit
  let [localComment, setLocalComment] = useState({
    edit: false,
    body: "",
  });
  // for the every single post
  const [postData, setPostData] = useState({});

  const { handleShow, user } = useContext(ModalContext);

  const myComment = useRef(null);

  const navigate = useNavigate();

  // state for like icon bg change
  const [isLiked, setIsLiked] = useState(false);

  const ApiUrl = import.meta.env.VITE_API_BASE_URL;

  const saveFormData = async (e) => {
    try {
      e.preventDefault();
      //api call for comment
      var token = localStorage.getItem("userToken");
      if (token === null) {
        toast.error("Kindly Login to comment on the post.");
        handleShow();
      } else {
        const payload = {
          body: localComment.body,
          postId: postData._id,
          userId: user._id,
          createdAt: new Date(),
        };
        const res = await axios.post(`${ApiUrl}api/save-comment`, payload, {
          headers: {
            token: token,
          },
        });
        const savedComment = res.data.data;
        const newState = { ...postData };
        newState.comments.push(savedComment);
        setPostData(newState);
        if (res.status === 201) {
          toast.success("Comment Added.");
          // resetting the value of comment body value
          localComment.body = "";
          setLocalComment(localComment);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error("Kindly Login to comment on the post.");
        handleShow();
      }
    }
  };

  // console.log(postData, "state in local");

  //! get the id of the current post
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramField = query.get("id");
  // console.log(paramField);

  // calling api using paramField as id
  const getSinglePost = async () => {
    try {
      const res = await axios.get(`${ApiUrl}api/single-post/${paramField}`);
      // console.log(res.data.data);

      const myPost = res.data.data;
      // myPost.comments.reverse();
      setPostData({ ...myPost });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createMarkup = (content) => {
    return { __html: content };
  };

  // Edit Comment
  const commentEdit = (commentId) => {
    // api call for edit comment
    const token = user.token;
    // console.log(token);
    if (token === null) {
      toast.error("Kindly Login to comment on the post.");
      handleShow();
    } else {
      const commentData = postData.comments.find((el) => {
        if (el._id === commentId) {
          return el;
        }
      });
      console.log(commentData);
      setLocalComment({ edit: true, ...commentData });
    }
  };
  // console.log(localComment);
  // save edited comment
  const saveEditedComment = async (data) => {
    try {
      const token = user.token;
      console.log(data);
      if (token) {
        const payload = {
          body: data.body,
          id: data._id,
        };
        const res = await axios.patch(`${ApiUrl}api/edit-comment`, payload, {
          headers: {
            token: token,
          },
        });
        console.log(res.data.data);
        // clear the comment form field
        setLocalComment({ edit: false, body: "" });
        navigate("/");
      } else {
        toast.error("You are logged out, Kindly Login To Edit Your Comment.");
        handleShow();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // delete comment
  const commentDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        console.log(token);

        const axiosConfig = {
          headers: {
            token: token,
            id: commentId,
            postId: postData._id,
          },
        };
        console.log(axiosConfig);

        const res = await axios.delete(
          `${ApiUrl}api/delete-comment`,
          axiosConfig
          // payload
        );
        if (res.status === 200) {
          getSinglePost();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // ....... likes functionality .......
  const handleLikeChange = () => {
    const token = localStorage.getItem("userToken");
    // console.log(token);
    if (token === null) {
      toast.error("LogIn to Like the post.");
      handleShow();
    } else {
      setIsLiked(!isLiked);

      if (isLiked === false) {
        // api call
        const payload = {
          liked: true,
          postId: postData._id,
          userId: postData.user._id,
        };
        console.log(payload);

        setTimeout(() => {
          axios
            .post(`${ApiUrl}api/liked`, payload, {
              headers: { token: token },
            })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1000);
      } else if (isLiked) {
        //api call for delete like
        const axiosConfig = {
          headers: {
            token: token,
            postId: postData._id,
            userId: postData.user._id,
          },
        };

        axios
          .delete(`${ApiUrl}api/unLiked`, axiosConfig)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  console.log(user);
  console.log(postData);
  useEffect(() => {
    getSinglePost();
    document.title = "Single Post | Blog | Bombastic";
    (document.getElementsByTagName("meta")[2].name = "description"),
      (document.getElementsByTagName("META")[2].content =
        "Your description about the page or site here to set dynamically For the post i think this is correct way to do it.");
    document.getElementsByTagName(
      "META"
    )[4].content = `http://blogBabu.com/single-post?id=${postData._id}`;
  }, []);

  return (
    <>
      <Navbar color={"#000"} />
      <section id="post" className="single-post-sec">
        <div className="container">
          <div className="col-lg-12">
            <div className="single-post-heading">
              <h1>{postData?.title}</h1>
              <p className="single-post-heading-bottom">
                December 16, 2017
                <span>
                  In <a href="#">Lifestyle</a>, <a href="#">Travel</a>{" "}
                </span>
              </p>
            </div>
            <div className="single-post-banner">
              <img src={postData.image} alt="" />
            </div>
            <div className="single-post-body">
              <div
                className="post-body-top-text"
                dangerouslySetInnerHTML={createMarkup(postData?.description)}
              />
            </div>
            <div className="single-post-user">
              <div className="user-photo">
                {!postData?.user?.avatar ? (
                  <img src={"../../public/images/profile.jpg"} />
                ) : (
                  <img src={postData?.user?.avatar} alt="" />
                )}
              </div>
              <div className="user-details">
                {!postData?.user?.name ? (
                  <h3>Babuli Nahak</h3>
                ) : (
                  <h3>{postData?.user?.name}</h3>
                )}
                <p>
                  {`Hi there, I am ${postData?.user?.name}. Thank you for visiting my post. Please like share and leave your feedbacks in the comments.`}
                </p>
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/sharer/sharer.php?u=example.org"
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      <GrFacebookOption className="icon" />
                    </a>
                  </li>
                  <li>
                    <RiShareForwardFill className="icon" />
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/send?text=Please%20Visit%20http://blogBabu.com/single-post?id=${postData._id}`}
                      rel="nofollow noopener"
                      target="_blank"
                    >
                      <RiWhatsappFill className="icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/sharer/sharer.php?u=example.org"
                      target="_blank"
                    >
                      <AiOutlineInstagram className="icon" />
                    </a>
                  </li>
                  <li>
                    <AiTwotoneHeart
                      style={{ color: isLiked === true ? "red" : "gray" }}
                      onClick={() => handleLikeChange()}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="single-post-comment-sec">
        <div className="mysize">
          <div className="container">
            <div className="user-comment-container">
              <div className="user-comment-heading">
                <h2>{`${postData?.comments?.length} Comments`}</h2>
              </div>
              <div className="all-comments">
                {postData?.comments?.map((el) => {
                  const date = new Date(el.createdAt);
                  const localDate = date.toDateString();
                  const localTime = date.toLocaleTimeString();
                  // console.log(date.toTimeString())

                  return (
                    <div className="user-comment-details">
                      <div className="comment-user">
                        <img src={el.user.avatar} alt="" />
                      </div>
                      <div className="comment-body">
                        <div ref={myComment}>
                          <h4 className="user-name">{el.user.name}</h4>
                          {el.createdAt ? (
                            <p>{localDate + "  @  " + localTime}</p>
                          ) : (
                            <p className="comment-date">Dec 16, 2017 @ 23.05</p>
                          )}
                          <p className="comment-text">{el.body}</p>
                        </div>
                        {user?._id === postData?.user?._id ? (
                          <div className="icon-comment">
                            <BiMessageRoundedEdit
                              className="icon"
                              onClick={() => commentEdit(el._id)}
                            />
                            <AiOutlineDelete
                              className="icon"
                              onClick={() => commentDelete(el._id)}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {user?._id !== postData?.user?._id ? (
              <div className="comment-add">
                <h2> Add Comment</h2>
                <form method="post">
                  <textarea
                    name="cmt"
                    id="cmt-id"
                    cols="30"
                    rows="10"
                    required
                    onChange={(e) => {
                      var myData = e.target.value;
                      {
                        localComment.edit
                          ? setLocalComment({ edit: true, body: myData })
                          : setLocalComment({ edit: false, body: myData });
                      }
                      // saveFormData(myData);
                    }}
                    value={localComment.body}
                    placeholder="Your Message"
                  ></textarea>
                  {localComment.edit ? (
                    <input
                      type="submit"
                      value={"Edit Comment"}
                      onClick={() => saveEditedComment(localComment)}
                    />
                  ) : (
                    <input
                      type="submit"
                      value={"submit"}
                      onClick={saveFormData}
                    />
                  )}
                </form>
              </div>
            ) : (
              ""
            )}
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

export default SinglePostPage;
