import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import disableImg from "../../assets/images/disableQuestion.svg";
import ToastService from "../../helpers/toast-services";

const DisableModal = ({
  show,
  setIsShow,
  name,
  objDisabled,
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
      {/* {disableError && (
        <ErrorList error={disableError} />
      )} */}
      <Modal.Body className="modal-body">
        <span className="disableImg">
          <img src={disableImg} alt="disable" />
        </span>
        {objDisabled ? (
          <h2>
            {t("ENABLE")} {t(title)}
            {t("?")}
          </h2>
        ) : (
          <h2>
            {t("DISABLE")} {t(title)}
            {t("?")}
          </h2>
        )}
        {objDisabled ? (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("ENABLE")}{" "}
            <strong>"{typeof name === "string" ? name : name[t("language")] ? name[t("language")] : name[t("en")]}"</strong> {t("?")} <br />
            {t("THE")} {t(title)} {t("WILL")} {t("ENABLE")}
          </p>
        ) : (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("DISABLE")}{" "}
            <strong>"{typeof name === "string" ? name : name[t("language")] ? name[t("language")] : name[t("en")]}"</strong> {t("?")} <br />
            {t("THE")} {t(title)} {t("WILL")} {t("DISAPPEAR")}
          </p>
        )}
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={click}>
            {objDisabled ? t("ENABLE") : t("DISABLE")}
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

export default DisableModal;
