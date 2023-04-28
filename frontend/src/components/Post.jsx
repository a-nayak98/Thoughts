import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const Post = ({ data }) => {
  const navigate = useNavigate();

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

  const date = new Date(data.createdAt).toDateString();

  return (
    <div className="post">
      <div className="post-image">
        {data?.image ? (
          <img src={data.image} alt="" />
        ) : (
          <img
            className="demoImgIcon"
            // modalShow={handleCloseCropper}
            src="/images/image-icon.png"
            alt=""
          />
        )}
        <div className="image-overlay" onClick={() => goToPost(data)}></div>
      </div>
      <div className="post-body">
        <p className="postDate">{date}</p>
        <h2>{data?.title}</h2>
        <div
        // className="post-data"
        // dangerouslySetInnerHTML={createMarkup(data.description)}
        />
        <div className="d-flex">
          {data?.tags?.map((el) => {
            return <p className="post-category">{el}</p>;
          })}
        </div>

        {/* <button onClick={() => goToPost(data)}>View Post</button> */}
      </div>
    </div>
  );
};

export default Post;
