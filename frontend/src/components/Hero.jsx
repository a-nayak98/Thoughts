import React from "react";

const Hero = ({ data }) => {
  const date1 = new Date(data[0]?.createdAt).toDateString();
  const date2 = new Date(data[1]?.createdAt).toDateString();
  const date3 = new Date(data[2]?.createdAt).toDateString();

  console.log(date1);

  // console.log(data);
  return (
    <>
      <div className="home-pg-hero-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 myPadding">
              <div className="myCards-left">
                <div className="myCard post-one">
                  <div className="image-overlay"></div>
                  <div className="card-image">
                    <img src={data[0]?.image} alt="" />
                  </div>
                  <div className="card-bottom">
                    {/* <p className="card-category">Music</p> */}
                    <h1>{data[0]?.title}</h1>
                    <ul>
                      <li className="post-user-image">
                        <img src={data[0]?.user.avatar} alt="" />
                      </li>
                      <li className="post-user-name">{data[0]?.user.name}</li>
                      <li className="post-date">{date1}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 myPadding">
              <div className="myCards-right">
                <div className="myCard post-two">
                  <div className="image-overlay"></div>
                  <div className="card-image">
                    <img src={data[1]?.image} alt="" />
                  </div>
                  <div className="card-bottom">
                    {/* <p className="card-category">Music</p> */}
                    <h1>{data[1]?.title}</h1>
                    <ul>
                      <li className="post-user-image">
                        <img src="/images/profile.jpg" alt="" />
                      </li>
                      <li className="post-user-name">{data[1]?.user.name}</li>
                      <li className="post-date">{date2}</li>
                    </ul>
                  </div>
                </div>
                <div className="myCard post-two d-md-none d-lg-block display-mob">
                  <div className="image-overlay"></div>
                  <div className="card-image">
                    <img src={data[2]?.image} alt="" />
                  </div>
                  <div className="card-bottom">
                    {/* <p className="card-category">Music</p> */}
                    <h1>{data[2]?.title}</h1>
                    <ul>
                      <li className="post-user-image">
                        <img src="/images/profile.jpg" alt="" />
                      </li>
                      <li className="post-user-name">{data[2]?.user.name}</li>
                      <li className="post-date">{date3}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
