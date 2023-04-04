import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import deleteImg from "../../assets/images/delete.svg";
import ToastService from "../../helpers/toast-services";

const DeleteModal = ({
  show,
  setIsShow,
  name,
  title,
  click,
  Loading,
  Message,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!Loading && Message) {
      ToastService.success(Message);
      setIsShow(!show);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Message]);

  return (
    <Modal show={show} className="commanModal">
      {/* {deleteError && (
        <ErrorList error={deleteError} />
      )} */}
      <Modal.Body>
        <span>
          <img src={deleteImg} alt="deleteImg" />
        </span>
        <h2>
          {t("DELETE")} {t(title)}
          {t("?")}
        </h2>
        <p>
          {t("ARE_YOU_SURE_YOU_WANT")} {t("DELETE")}{" "}
          <strong>"{typeof name === "string" ? name : name[t("language")] ? name[t("language")] : name[t("en")]}"</strong> {t("?")} <br />
          {t("THE")} {t(title)} {t("WILL")} {t("PERMANENTLY")} {t("DELETED")}
        </p>
        <div className="centerBTN">
          <Button className="btn redButton mr-1" onClick={click}>
            {t("DELETE")}
          </Button>
          <Button
            className="btn lightBDR ml-1"
            onClick={() => setIsShow(!show)}
          >
            {t("CANCEL")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
