import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import trashSquare from '../../assets/images/trash-square.svg'
import refreshSquare from '../../assets/images/refresh-square-2.svg'

const BrandImage = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { setFieldValue } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      setFieldValue("logo", acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div className="modal-picture-uploaded" key={file.name}>
      <div className="pictures">
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="logo"
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFile = () => {
    setFiles([]);
    setFieldValue("logo", undefined);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} name="logo" />
        {files && files.length <= 0 ? (
          <>
            {props.singleBrand &&
              (props.singleBrand.logo || props.singleBrand.image) ? (
              <>
                <div className="modal-picture-uploaded">
                  <div className="pictures">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}${props.singleBrand.logo
                        ? props.singleBrand.logo
                        : props.singleBrand.image
                        }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                      }}
                      alt="profile_pic"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="drop_box">
                <h4>
                  {t("UPLOAD_FILE_FROM_FROM_YOUR_DEVICE")}{" "}
                  <span>{t("OR_DRAG_FILE_HERE")}</span>
                </h4>
                <p>PNG, JPG, GIF up to 1MB</p>
              </div>
            )}
            {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
            {fileRejections && fileRejections.length <= 0 ? null : (
              <span className="invalid-feedback d-block">
                {t("FILE_TYPE_IS_NOT_SUPPORTED")}
              </span>
            )}
          </>
        ) : (
          <aside className="thumbsContainer">{thumbs}</aside>
        )}
      </div>
      {((files &&
        files.length > 0 &&
        props.singleBrand &&
        (props.singleBrand.logo || props.singleBrand.image)) ||
        (files && files.length > 0) ||
        (props.singleBrand &&
          (props.singleBrand.logo || props.singleBrand.image))) && (
          <div className="prive">
            <ul className="flex ul-uploaded">
              <li onClick={removeFile} style={{ cursor: "pointer" }}>
                {/* <a href="#"> */}
                <img src={trashSquare} alt="trashSquare" />
              </li>
              <li onClick={handleClick} style={{ cursor: "pointer" }}>
                <input {...getInputProps()} name="profile_pic" ref={inputRef} />
                <img src={refreshSquare} alt="refreshSquare" />
              </li>
            </ul>
          </div>
        )}
    </section>
  );
};

export default BrandImage;
