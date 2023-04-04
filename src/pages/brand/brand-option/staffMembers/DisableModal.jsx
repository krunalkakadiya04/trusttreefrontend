import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import disableImg from "../../../../assets/images/disableQuestion.svg";
import ErrorList from '../../../../components/error-list/ErrorList';
import { disableStaffMember } from '../../../../middlewares/staffMembers';

const DisableModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { disableLoading, disableMessage, disableError } = useSelector((state) => state.staff);

  useEffect(() => {
    if (!disableLoading && disableMessage) {
      props.setIsShow(!props.show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableMessage]);

  const handleDisable = () => {
    const staffId = props.staffDelete._id;
    dispatch(disableStaffMember(staffId));
  };

  return (
    <Modal show={props.show} className='commanModal'>
      {disableError && (
        <ErrorList error={disableError} />
      )}
      <Modal.Body className="modal-body">
        <span className='disableImg'><img src={disableImg} alt="disable" /></span>
        {props.staffDelete.is_disabled ?
          <h2>{t("ENABLE")} {t("USER")}{t("?")}</h2>
          : <h2>{t("DISABLE")} {t("USER")}{t("?")}</h2>
        }
        {props.staffDelete.is_disabled ?
          <p>{t("ARE_YOU_SURE_YOU_WANT")} {t("ENABLE")} <strong>"{props.staffDelete.name[t("language")]}"</strong> {t("?")} <br />
            {t("THE_USER_WILL_ENABLE")}</p>
          : <p>{t("ARE_YOU_SURE_YOU_WANT")} {t("DISABLE")} <strong>"{props.staffDelete.name[t("language")]}"</strong> {t("?")} <br />
            {t("THE_USER_WILL_DISAPPEAR")}</p>
        }
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={() => handleDisable()}>
            {props.staffDelete.is_disabled ? t("ENABLE") : t("DISABLE")}
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