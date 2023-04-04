import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ROUTE_URLS from "../../config/routes";
import LocalstorageService from "../../helpers/localstorage-services";
import ToastService from "../../helpers/toast-services";
import { logoutUser } from "../../middlewares/auth";
import {
  resetLogoutState,
  setLoggedInUserForLogout,
} from "../../slices/auth.slice";
import "./logout.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logout = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutMessage, logoutLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!logoutLoading) {
      if (logoutMessage) {
        props.setIsShow(!props.show);
        dispatch(setLoggedInUserForLogout(null));
        LocalstorageService.logoutUser();
        ToastService.success(logoutMessage);
        navigate(ROUTE_URLS.LOGIN, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutMessage]);

  useEffect(() => {
    return () => {
      dispatch(resetLogoutState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    dispatch(logoutUser());
  };

  return (
    <Modal show={props.show} className="logout-modal">
      <Modal.Header>
        <Modal.Title>{t("LOGOUT")}</Modal.Title>
        <FontAwesomeIcon
          icon={`xmark`}
          onClick={() => props.setIsShow(!props.show)}
        />
      </Modal.Header>

      <Modal.Body>{t("ARE_YOU_SURE_YOU_WANT_TO_LOGOUT")}{t("?")}</Modal.Body>

      <Modal.Footer>
        <Button
          className=" btn-outline-secondary btn"
          onClick={() => props.setIsShow(!props.show)}
        >
          {t("CLOSE")}
        </Button>
        <Button className="send-modal  float-end m-sm-2" onClick={() => handleSubmit()}>
          {t("LOGOUT")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Logout;
