import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import ErrorList from '../../../../components/error-list/ErrorList';
import { deleteStaffMember } from '../../../../middlewares/staffMembers';
import deleteImg from "../../../../assets/images/delete.svg";
import { useTranslation } from 'react-i18next';

const DeleteModal = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { deleteLoading, deleteMessage, deleteError } = useSelector((state) => state.staff);

  useEffect(() => {
    if (!deleteLoading && deleteMessage) {
      props.setIsShow(!props.show)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMessage]);

  const handleDelete = () => {
    const staff_id = props.staffDelete._id;
    dispatch(deleteStaffMember(staff_id))
    props.setIsShow(!props.show)
  };

  return (
    <Modal show={props.show} className="commanModal">
      {deleteError && (
        <ErrorList error={deleteError} />
      )}
      <Modal.Body>
        <span>
          <img src={deleteImg} alt="" />
        </span>
        <h2>{t("DELETE")} {t("USER")}{t("?")}</h2>
        <p>
          {t("ARE_YOU_SURE_YOU_WANT")} {t("DELETE")}{" "}
          <strong>"{props.staffDelete.name[t("language")]}"</strong> {t("?")} <br />
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
  )
}

export default DeleteModal