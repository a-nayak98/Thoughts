import React from "react";

const Footer = () => {
  return (
    <footer className="footer-philosophy" id="phi-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <h4 className="footer-links-heading">Quick Links</h4>
                <ul className="footer-links">
                  <li>Quick Links</li>
                  <li>Home</li>
                  <li>Blog</li>
                  <li>Contacts</li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="footer-field">
                  <h4 className="footer-links-heading">Social</h4>
                  <ul className="footer-links">
                    <li className="social">Facebook</li>
                    <li className="social">Instagram</li>
                    <li className="social">Twitter</li>
                    <li className="social">LinkedIn</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <h4 className="footer-links-heading">Our News Letters</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              beatae neque numquam voluptatum perferendis. Velit temporibus
              minima fugit.
            </p>
            <form action="#" className="footer-form">
              <input
                type="text"
                Placeholder="Enter Email"
                className="footer-form-input"
              />
              <button className="footer-frm-btn">Send</button>
            </form>
          </div>
          <div className="col-lg-12">
            <div className="footer-bottom">
              <p>
                @Copyright Philosophy 2023 | Made With Love By
                <a href="#">#Abhishek</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
