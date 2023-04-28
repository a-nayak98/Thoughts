import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../google";
import { ModalContext } from "../context/ModalContext";

const UserModal = () => {
  const { show, handleClose } = useContext(ModalContext);
  const GoogleClientUrl = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <Modal show={show} onHide={handleClose} keyboard={false} centered>
      <Modal.Body className="user-modal-body">
        <center>
          <GoogleOAuthProvider clientId={`${GoogleClientUrl}`}>
            <Google />
          </GoogleOAuthProvider>
        </center>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
