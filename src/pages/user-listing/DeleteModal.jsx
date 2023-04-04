import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal.scss";
import deleteImg from "../../assets/images/delete.svg";
import { deleteUserById } from "../../middlewares/users";
import { useDispatch, useSelector } from "react-redux";
import ErrorList from "../../components/error-list/ErrorList";
import { useTranslation } from "react-i18next";

const DeleteModal = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { deleteUserLoading, deleteUserMessage, deleteUserError } = useSelector((state) => state.user);

  useEffect(() => {
    if (!deleteUserLoading && deleteUserMessage) {
      props.setIsShow(!props.show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteUserMessage]);

  const handleDelete = () => {
    const userId = props.userDelete._id;
    dispatch(deleteUserById(userId));
    props.setIsShow(!props.show)
  };

  return (
    <Modal show={props.show} className="commanModal">
      {deleteUserError && (
        <ErrorList error={deleteUserError} />
      )}
      <Modal.Body>
        <span>
          <img src={deleteImg} alt="" />
        </span>
        <h2>{t("DELETE")} {t("USER")}{t("?")}</h2>
        <p>
          {t("ARE_YOU_SURE_YOU_WANT")} {t("DELETE")}{" "}
          <strong>"{props.userDelete.name}"</strong> {t("?")} <br />
          {t("THE_USER_WILL_PERMANENTLY_DELETED")}
        </p>
        <div className="centerBTN">
          <Button className="btn redButton mr-1" onClick={() => handleDelete()}>
            {t("DELETE")}
          </Button>
          <Button className="btn lightBDR ml-1" onClick={() => props.setIsShow(!props.show)}>
            {t("CANCEL")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
