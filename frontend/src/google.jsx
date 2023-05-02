import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useContext } from "react";
import { ModalContext } from "./context/ModalContext";

const google = () => {
  const { handleUser, handleClose } = useContext(ModalContext);
  const ApiUrl = "https://thoughts-b9rq.onrender.com";

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const userDetails = jwt_decode(credentialResponse.credential);
        console.log(userDetails, "milila user details");
        const payload = {
          name: userDetails.name,
          email: userDetails.email,
          avatar: userDetails.picture,
        };
        // api call
        let response = await axios.post(`${ApiUrl}/api/user`, payload);
        // saving the user on client
        const userData = response.data.data;
        handleUser(userData);
        console.log(userData);
        localStorage.setItem("userToken", userData.token);
        // handleModal(false)
        handleClose();
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default google;
