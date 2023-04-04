import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import disableImg from "../../assets/images/disableQuestion.svg";
import ErrorList from "../../components/error-list/ErrorList";
import ToastService from "../../helpers/toast-services";
import { disableEnableBrand } from "../../middlewares/brands";

const DisableBrandModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { disEnableLoading, disEnableMessage, disEnableError } = useSelector(
    (state) => state.brand
  );
  const { brandDisable, show, setIsShow } = props;

  useEffect(() => {
    if (!disEnableLoading && disEnableMessage) {
      ToastService.success(disEnableMessage);
      setIsShow(!show);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disEnableMessage]);

  const handleDisable = () => {
    const b_id = brandDisable._id;
    dispatch(disableEnableBrand(b_id));
  };

  return (
    <Modal show={show} className="commanModal">
      {disEnableError && <ErrorList error={disEnableError} />}
      <Modal.Body className="modal-body">
        <span>
          <img src={disableImg} alt="disable" />
        </span>
        <h2>
          {brandDisable.is_disable ?
            `${t("ENABLE")} ${t("BRAND")}${t("?")}`
            :
            `${t("DISABLE")} ${t("BRAND")}${t("?")}`
          }
        </h2>
        {brandDisable.is_disable ? (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("ENABLE")} <strong>"{brandDisable.name}"</strong>{" "}
            {t("?")} <br />
            {t("THE_BRAND_WILL_ENABLE")}
          </p>
        ) : (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("DISABLE")} <strong>"{brandDisable.name}"</strong>{" "}
            {t("?")} <br />
            {t("THE_BRAND_WILL_DISAPPEAR")}
          </p>
        )}
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={() => handleDisable()}>
            {brandDisable.is_disable ? t("ENABLE") : t("DISABLE")}
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

export default DisableBrandModal;
