import React, { useRef, useState } from "react";
import ImageCropper from "./ImageCropper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostMyForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [originalFile, setOriginalFile] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);

  // this is for taking the reference of the current element using useRef
  const inputFile = useRef(null);

  // readfile for getting the image from local
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      const file = await readFile(e.target.files[0]);
      setOriginalFile(file);
      handleShow();
    }
  };

  // saving form data to the current page through State.
  const saveData = (e) => {
    e.preventDefault();
    // api call
  };

  return (
    <section className="post-form">
      <div className="container">
        <div className="row">
          <div className="col-lg-12"></div>
          <div className="col-lg-12">
            <div className="page3_form_section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="page3_form_container">
                    <form className="page3_form" action="" method="POST">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form_field">
                            <input
                              type="text"
                              placeholder="Enter Post Title"
                              name="title"
                              id="title"
                              required
                              onChange={(e) => {
                                let title = e.target.value;
                                setFormData({ ...formData, title: title });
                              }}
                            />
                          </div>
                          <div className="form_field_err">
                            <p>Total 150 character left.</p>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_field">
                            <div className="demoImageContainer">
                              {!croppedPreview ? (
                                <img
                                  className="demoImgIcon"
                                  onClick={() => inputFile.current.click()}
                                  modalShow={handleClose}
                                  src="/images/image-icon.png"
                                  alt=""
                                />
                              ) : (
                                <img src={croppedPreview} />
                              )}
                            </div>
                            <input
                              type="file"
                              onChange={handleChange}
                              ref={inputFile}
                              style={{ display: "none" }}
                            />
                            {show ? (
                              <ImageCropper
                                show={show}
                                onHide={handleClose}
                                data={originalFile}
                                setFile={(file, fileName) => {
                                  setCroppedPreview(file);
                                  const imageData = new File([file], fileName);
                                  setFormData({
                                    ...formData,
                                    image: imageData,
                                  });
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_field">
                            <CKEditor
                              className="postDescription"
                              editor={ClassicEditor}
                              data={formData.description}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                              }}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData({ ...formData, description: data });
                              }}
                              onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                              }}
                              onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form_field">
                            <input
                              type="submit"
                              value={"Submit"}
                              onClick={saveData}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostMyForm;
