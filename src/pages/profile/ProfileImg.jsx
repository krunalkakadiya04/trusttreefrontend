import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { profile_pic } from "../../helpers/yup.validation.schema";
import * as Yup from "yup";

const ProfileImg = (props) => {
  const { setFieldValue } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      const filesArr = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(filesArr);
      formik.setFieldValue("profile_pic", filesArr);
    },
    maxFiles: 1,
  });

  const thumbs = files.map((file) => (
    <div className="profile m-auto" key={file.name}>
      <img
        src={file.preview}
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
        alt="Profile Pic"
      />
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values) => {
    setFieldValue("profile_pic", values.profile_pic[0]);
    setFiles([]);
    props.setIsShow(!props.show);
  };

  const fileSchema = Yup.object().shape({
    profile_pic: profile_pic,
  });

  const formik = useFormik({
    initialValues: {
      profile_pic: null,
    },
    validationSchema: fileSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Modal show={props.show}  size="">
      <Modal.Header>
        <Modal.Title>Update Profile Image</Modal.Title>
        <div>
          <Button className="close_btn">
            <FontAwesomeIcon
              icon={`xmark`}
              onClick={() => props.setIsShow(!props.show)}
            />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <section className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} name="profile_pic" />
            {files && files.length <= 0 ? (
              <>
                <div className="drop_box">
                  <h4>
                    Upload file from your device <span>Or drag file here</span>
                  </h4>
                  <p>PNG, JPG, GIF up to 1MB</p>
                </div>
                {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                {fileRejections && fileRejections.length <= 0 ? null : (
                  <span className="invalid-feedback d-block">
                    File type is Not Supported
                  </span>
                )}
              </>
            ) : (
              <aside className="thumbsContainer">{thumbs}</aside>
            )}
          </div>
        </section>
        {formik.errors.profile_pic && (
          <div
            className="invalid-feedback d-block"
            style={{ marginLeft: "25px" }}
          >
            {formik.errors.profile_pic}
          </div>
        )}
      </Modal.Body>
      <div className='d-flex justify-content-center mt-3'>
        <Button className="m-sm-2 btn btn-primary"
          onClick={formik.handleSubmit}
          disabled={!(formik.isValid && formik.dirty)}
        >
          Save
        </Button>
        <Button className="m-sm-2 btn btn-outline-secondary " onClick={() => props.setIsShow(!props.show)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileImg;
