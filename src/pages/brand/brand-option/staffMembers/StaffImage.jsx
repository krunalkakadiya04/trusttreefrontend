import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import trashSquare from '../../../../assets/images/trash-square.svg'
import refreshSquare from '../../../../assets/images/refresh-square-2.svg'

const StaffImage = (props) => {
  const { t } = useTranslation()
  const { setFieldValue } = props;
  const [files, setFiles] = useState([]);
  const inputRef = useRef(null);
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
      setFieldValue("profile_pic", acceptedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div className="modal-picture-uploaded" key={file.name}>
      <div className="pictures">
        <img
          // className="thumbImg"
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt="Staff_Pic"
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
    setFieldValue("profile_pic", undefined);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone ms-4" })}>
        <input {...getInputProps()} name="profile_pic" />
        <>
          {files && files.length <= 0 ? (
            <>
              {props.singleStaffMember &&
                props.singleStaffMember.profile_pic ? (
                <>
                  <div className="modal-picture-uploaded">
                    <div className="pictures">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}${props.singleStaffMember.profile_pic}`}
                        alt="profile_pic"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="drop_box">
                  <h4>
                    {t("UPLOAD_FILE_FROM_FROM_YOUR_DEVICE")} <span>{t("OR_DRAG_FILE_HERE")}</span>
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
            <>
              <aside className="upload-picture">{thumbs}</aside>
            </>
          )}
        </>
      </div>
      {((files &&
        files.length > 0 &&
        props.singleStaffMember &&
        props.singleStaffMember.profile_pic) ||
        (files && files.length > 0) ||
        (props.singleStaffMember && props.singleStaffMember.profile_pic)) && (
          <div className="prive">
            <ul className="flex ul-uploaded">
              <li onClick={removeFile} style={{ cursor: "pointer" }}>
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

export default StaffImage;
