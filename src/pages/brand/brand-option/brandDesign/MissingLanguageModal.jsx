import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ROUTE_URLS from "../../../../config/routes";
import edit from '../../../../assets/images/edit.svg'

const MissingLanguageModal = ({
  show,
  setIsShow,
  languageObj,
  remainingLanguage,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(ROUTE_URLS.QUESTIONS);
  };

  return (
    <Modal show={show} className="commanModal frenchModal" size="xl">
      <Modal.Header>
        <Modal.Title className="cust-title">
          {remainingLanguage.value} {t("LANGUAGE_EMPTY_FIELDS")}
        </Modal.Title>
      </Modal.Header>
      <p>{t("MUST_FILL_THESE_FIELDS")}</p>
      <Modal.Body>
        <div className="check__boxx">
          <h6>{t("QUESTIONS_")}</h6>
        </div>
        <ul className='missing-lang-modal'>
          {languageObj && languageObj.length > 0 &&
            languageObj.map((o, i) => (
              <li className="d-flex" key={i}>
                <div className="dashedBorder" onClick={() => handleEdit(o)}>
                  <span>
                    <img src={edit} alt='edit' />
                  </span>
                  {t("EDIT")}
                </div>
                <div className="contentWpr">
                  <div>
                    <h6>{o.name[t("language")] ? o.name[t("language")] : o.name[t("en")]} -
                      <span className='color-grey'> {t("NOT_AVAILABLE_IN")} {remainingLanguage.value}</span>
                    </h6>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div className="Experience-btn-modal flex justify-content-center">
          <Button className="send-modal" onClick={() => setIsShow(!show)}>
            {t("OK")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MissingLanguageModal;
