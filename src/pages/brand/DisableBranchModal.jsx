import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import disableImg from "../../assets/images/disableQuestion.svg";
import ErrorList from "../../components/error-list/ErrorList";
import ToastService from "../../helpers/toast-services";
import { disableEnableBranch } from "../../middlewares/branches";
import { resetMessage } from "../../slices/branches.slice";
// import { disableEnableBrand } from "../../middlewares/brands";

const DisableBranchModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { disEnableLoading, disEnableBranchMessage, disEnableError } = useSelector(
    (state) => state.branch
  );
  const { branchDisable, show, setIsShow } = props;

  useEffect(() => {
    if (!disEnableLoading && disEnableBranchMessage) {
      ToastService.success(disEnableBranchMessage);
      setIsShow(!show);
      dispatch(resetMessage())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disEnableBranchMessage]);

  const handleDisable = () => {
    const br_id = branchDisable._id;
    dispatch(disableEnableBranch(br_id));
  };

  return (
    <Modal show={show} className="commanModal">
      {disEnableError && <ErrorList error={disEnableError} />}
      <Modal.Body className="modal-body">
        <span>
          <img src={disableImg} alt="disable" />
        </span>
        <h2>
          {branchDisable.is_disable
            ? `${t("ENABLE")} ${t("Branch")}${t("?")}`
            : `${t("DISABLE")} ${t("Branch")}${t("?")}`}
        </h2>
        {branchDisable.is_disable ? (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("ENABLE")}{" "}
            <strong>"{branchDisable.name}"</strong> {t("?")} <br />
            {t("THE_BRANCH_WILL_ENABLE")}
          </p>
        ) : (
          <p>
            {t("ARE_YOU_SURE_YOU_WANT")} {t("DISABLE")}{" "}
            <strong>"{branchDisable.name}"</strong> {t("?")} <br />
            {t("THE_BRANCH_WILL_DISAPPEAR")}
          </p>
        )}
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={() => handleDisable()}>
            {branchDisable.is_disable ? t("ENABLE") : t("DISABLE")}
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

export default DisableBranchModal;
