import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import disableImg from "../../assets/images/disableQuestion.svg";
import ErrorList from '../../components/error-list/ErrorList';
import { disableUserById } from '../../middlewares/users';

const DisableModal = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { disableUserLoading, disableUserMessage, disableUserError } = useSelector((state) => state.user);

  useEffect(() => {
    if (!disableUserLoading && disableUserMessage) {
      props.setIsShow(!props.show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableUserMessage]);

  const handleDisable = () => {
    const userId = props.userDelete._id;
    dispatch(disableUserById(userId));
    props.setIsShow(!props.show)
  };

  return (
    <Modal show={props.show} className='commanModal'>
      {disableUserError && (
        <ErrorList error={disableUserError} />
      )}
      <Modal.Body className="modal-body">
        <span><img src={disableImg} alt="disable" /></span>
        {props.userDelete.user_status === "de-activated" ?
          <h2>{t("ENABLE")} {t("USER")}{t("?")}</h2>
          : <h2>{t("DISABLE")} {t("USER")}{t("?")}</h2>
        }
        {props.userDelete.user_status === "de-activated" ?
          <p>{t("ARE_YOU_SURE_YOU_WANT")} {t("ENABLE")} <strong>"{props.userDelete.name}"</strong> {t("?")} <br />
            {t("THE_USER_WILL_ENABLE")}</p>
          : <p>{t("ARE_YOU_SURE_YOU_WANT")} {t("DISABLE")} <strong>"{props.userDelete.name}"</strong> {t("?")} <br />
            {t("THE_USER_WILL_DISAPPEAR")}</p>
        }
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={() => handleDisable()}>
            {props.userDelete.user_status === "de-activated" ? t("ENABLE") : t("DISABLE")}
          </Button>
          <Button className="btn lightBDR ml-1" onClick={() => props.setIsShow(!props.show)}>
            {t("CANCEL")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DisableModal