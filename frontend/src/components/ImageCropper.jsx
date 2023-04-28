import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils";

const ImageCropper = ({ show, onHide, data, setFile }) => {
  let cropperImage = data;
  console.log(cropperImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const getFileNameWithExt = (file) => {
    console.log(typeof file, file, "inside Image Cropper-l23");
    const name = file.name;
    console.log(name);
    const lastDot = name.lastIndexOf(".");
    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);

    return `${fileName}.${ext}`;
  };

  // generating the image url
  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(data, croppedAreaPixels);
    // console.log(typeof croppedImageUrl, croppedImageUrl + "    img uRLLL");
    const preview = URL.createObjectURL(croppedImageUrl);
    setFile(croppedImageUrl, preview);
    onHide();
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header>
          <button className="cropper-close-btn" onClick={onCrop}>
            Done
          </button>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <div className="crop-container crop-height">
            <Cropper
              className="cropper-image-holder"
              image={cropperImage}
              crop={crop}
              zoom={zoom}
              rotation={rotate}
              aspect={aspectRatio}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="controls">
            {/* <button
              type="button"
              className="cropper-btns"
              onClick={() => setAspectRatio(16 / 9)}
            >
              16 : 9
            </button> */}
            {/* <button
              type="button"
              className="cropper-btns"
              onClick={() => setAspectRatio(4 / 5)}
            >
              4 : 5
            </button> */}
            {/* <input
              type="range"
              value={rotate}
              min={1}
              max={360}
              step={1}
              aria-labelledby="range"
              onChange={(e) => {
                setRotate(rotate + 1);
              }}
              className="zoom-range"
            /> */}
            <img
              onClick={() => setRotate(rotate + 30)}
              src="/images/rotate.png"
              className="cropper-btn-rotate"
            />
            <img
              style={{ width: "25px", height: "25px", margin: "10px 0" }}
              src="/images/rotate-right.png"
              alt=""
            />
            <img
              style={{ width: "25px", height: "25px", margin: "10px 0" }}
              src="/images/rotate-left.png"
              alt=""
            />
            {/* <img
              onClick={() => setRotate(rotate + 30)}
              src="/images/rotate.png"
              className="cropper-btn-rotate"
            /> */}
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageCropper;
