import React, { useRef, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import ImageCropper from "../components/ImageCropper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ModalContext } from "../context/ModalContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// import { validation } from "../helpers/formValidation";

const CreatePost = () => {
  // this state is for open and close image cropper Modal
  const [show, setShow] = useState(false);
  // this state is for setting image which is taken from local
  const [file, setFile] = useState(null);

  // state is for showing error on client for form validation
  const [errorMessage, setErrorMessage] = useState("");

  const [hasError, setError] = useState(false);
  // state is for setting the loader at api call
  const [isLoading, setIsLoading] = useState(false);

  const { handleShow, formData, setFormData } = useContext(ModalContext);
  const navigate = useNavigate();
  // const ApiUrl = import.meta.env.VITE_API_BASE_URL;
  const ApiUrl = "https://thoughts-b9rq.onrender.com";


  // this is for taking the reference of the current element using useRef
  const inputFile = useRef(null);
  const form_title = useRef(null);
  const form_image = useRef(null);
  const form_description = useRef(null);

  // for opening and closing of Image cropper modals
  const handleCloseCropper = () => setShow(false);
  const handleShowCropper = () => setShow(true);

  // for go-to specific section of the error fields
  const scrollToSection = (refElement) => {
    window.scrollTo({
      top: refElement.current.offsetTop,
      behavior: "smooth",
    });
    console.log(refElement, "reference element clicked");
  };

  // readfile for getting the image from local
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  // base64 string
  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const file = await readFile(e.target.files[0]);
      setFile(file);
      handleShowCropper();
    }
  };

  // clientSide validate the form
  const validation = () => {
    if (
      !formData.image ||
      formData.title.length < 15 ||
      errorMessage.length > 1
    ) {
      setError(true);

      // scroll to title error section
      if (formData.title.length == 0) {
        toast.error("Enter title!!!");
        return scrollToSection(form_title);
      }
      if (formData.title.length < 15) {
        toast.error("Title Must Be 15 charters length.");
        return scrollToSection(form_title);
      }
      //scroll to image error section
      if (!formData.edit && !formData.image) {
        toast.error("Kindly Select an Image.");
        return scrollToSection(form_image);
      }
      // scroll to description error section
      if (formData.description < 1) {
        toast.error("Yuu are missing out Something Here.");
        return scrollToSection(form_description);
      }
    } else setError(false);
  };

  // saving form data to the current page through State.
  const saveData = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      validation();

      //! make api call
      // for checking the user is logged in or not so we have to sent the token from client
      let token = localStorage.getItem("userToken");
      if (token && !hasError) {
        // getting image url to store at database
        const uploadFile = new FormData();
        uploadFile.append("image", formData.image);
        setIsLoading(true);

        const resUrl = await axios.post(
          `${ApiUrl}api/upload-image`,
          uploadFile
        );

        let imageUrl = resUrl.data.data;
        // console.log(imageUrl);
        if (imageUrl) {
          //for saving the user data we have to take the user details from our clients state
          const payload = {
            title: formData.title,
            desc: formData.description,
            image: imageUrl,
          };

          //loader start =========

          let res = await axios.post(`${ApiUrl}api/posts`, payload, {
            headers: {
              token: token,
            },
          });
          if (res.status === 200) {
            // lodaer end ======
            setIsLoading(false);
            toast.success("Post Has been saved Successfully.");
            navigate("/");
          }
        } else {
          setIsLoading(false);
          toast.error("Got some Error.");
        }
        // reset the form fields
        setFormData({ title: "", description: "", image: null });
      } else {
        // lodaer end ======
        setIsLoading(false);
        toast.error(
          "You are Logged Out, Kindly LogIn Again To Post something."
        );
        handleShow();
      }
    } catch (error) {
      setIsLoading(false);
      // navigate("/");
      console.log(error);
      if (error.response.status === 500) {
        toast.error(error.response.data);
      }
      if (error.response.data.err === "jwt expired") {
        toast.error(
          "You are Logged Out, Kindly LogIn Again To Post something."
        );
        handleShow();
      }
    }
  };

  const editData = async (e) => {
    try {
      e.preventDefault();
      // client side validation
      validation();
      // check if client has no error then make a api call
      if (!hasError) {
        if (formData.image === null) {
          const imageUrl = formData.croppedFile;
          const payload = {
            title: formData.title,
            desc: formData.description,
            image: imageUrl,
            postId: formData.id,
          };
          //  loader start =========
          setIsLoading(true);
          const res = await axios.patch(`${ApiUrl}api/edit-post`, payload);
          console.log(res);
          if (res.status === 202) {
            // loader end ======
            setIsLoading(false);
            toast.success("Post Has been updated Successfully.");
            navigate("/");
          }
        } else {
          // getting image url to store at database
          const uploadFile = new FormData();
          uploadFile.append("image", formData.image);

          const resUrl = await axios.post(
            `${ApiUrl}api/upload-image`,
            uploadFile
          );
          let imageUrl = resUrl.data.data;
          if (imageUrl) {
            //for saving the user data we have to take the user details from our clients state
            const payload = {
              title: formData.title,
              desc: formData.description,
              image: imageUrl,
              postId: formData.id,
            };

            //loader start =========
            setIsLoading(true);
            let res = await axios.patch(`${ApiUrl}api/edit-post`, payload);
            if (res.status === 202) {
              // lodaer end ======
              setIsLoading(false);
              toast.success("Post Has been saved Successfully.");
              navigate("/");
            }
          } else toast.error("Got some Error.");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        toast.error(error.response.data);
        // loader end ======
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar color={"#000"} />
      <section className="post-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page3_form_section">
                {/* <div className="row">
                  <div className="col-lg-12"> */}
                <div className="page3_form_container">
                  <form
                    className="page3_form"
                    action=""
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div
                          className="form_field"
                          id="form-title"
                          ref={form_title}
                        >
                          <input
                            type="text"
                            placeholder="Enter Post Title"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={(e) => {
                              let title = e.target.value;
                              if (title.length == 0) {
                                setErrorMessage("");
                              } else if (title.length < 15) {
                                setErrorMessage(
                                  "Title must be 15 charters to begin with."
                                );
                              } else {
                                setErrorMessage("");
                              }
                              setFormData({ ...formData, title: title });
                              // changeFormData();
                            }}
                          />
                          {formData.title.length < 15 && hasError ? (
                            <p className="error"> {errorMessage} </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_field" ref={form_image}>
                          <div
                            className="demoImageContainer"
                            onClick={() => inputFile.current.click()}
                          >
                            {!formData.croppedFile ? (
                              <img
                                className="demoImgIcon"
                                // modalShow={handleCloseCropper}
                                src="/images/image-icon.png"
                                alt=""
                              />
                            ) : (
                              <img src={formData.croppedFile} />
                            )}
                          </div>
                          <input
                            type="file"
                            onChange={handleChange}
                            ref={inputFile}
                            style={{ display: "none" }}
                            accept="image/*"
                            name="image"
                          />
                          {!formData.image && hasError ? (
                            <p className="error">
                              Kindly Select Image to continue Posting
                            </p>
                          ) : null}

                          {show ? (
                            <ImageCropper
                              show={show}
                              onHide={handleCloseCropper}
                              data={file}
                              setFile={(file, preview) => {
                                console.log(file, preview, "previewss");
                                // const imageData = new File([file], fileName);
                                setFormData({
                                  ...formData,
                                  image: file,
                                  croppedFile: preview,
                                });
                              }}
                            />
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_field" ref={form_description}>
                          <CKEditor
                            className="postDescription"
                            editor={ClassicEditor}
                            data={formData.description}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              // console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFormData({
                                ...formData,
                                description: data,
                              });

                              // console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                              console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log("Focus.", editor);
                            }}
                          />
                          {formData.description.length < 10 && hasError ? (
                            <p className="error">
                              Hey! you seem to be missing something here
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_field">
                          {!formData.edit ? (
                            <input
                              type="submit"
                              value={"Submit"}
                              onClick={saveData}
                            />
                          ) : (
                            <input
                              type="submit"
                              value={"Edit Data"}
                              onClick={editData}
                            />
                          )}
                          {/* This is for making the react hot tost */}
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
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default CreatePost;

// Integrate create post backend api call
// learn to integrate "react hot tost"
