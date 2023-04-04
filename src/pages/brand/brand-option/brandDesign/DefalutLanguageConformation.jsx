import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import defalutImg from "../../../../assets/images/defalut.svg";

const DefalutLanguageConformation = (props) => {
  const { t } = useTranslation()
  const { setFieldValue } = props;
  const { AllLanguages } = useSelector((state) => state.brand);

  const newdefalutLan = AllLanguages && AllLanguages.find((obj) => {
    return obj.key === props.default_language && props.default_language
  })

  const changeLan = AllLanguages && AllLanguages.find((obj) => {
    return obj.key === props.selectedLan && props.selectedLan
  })

  const handleChange = (e) => {
    setFieldValue("default_language", e)
    props.setIsShow(!props.show)
  }


  return (
    <Modal show={props.show} className="commanModal">
      <Modal.Body>
        <span>
          <img src={defalutImg} alt="" />
        </span>
        <h2>{t("CHANGE_THE_BRAND_DEFAULT_LANGUAGE")}{t("?")}</h2>
        <p>
          {t("ARE_YOU_SURE_YOU_WANT_TO_CHANGE")} <span className='defalut-span'>{newdefalutLan === undefined ? "" : t(newdefalutLan.value)}</span> {t("WITH")}
          <span className='defalut-span'>{t(changeLan.value)}</span> {t("AS_A_DEFAULT_LANGUAGE")}{t("?")}
        </p>
        <div className="centerBTN">
          <Button className="btn btnBG mr-1" onClick={() => handleChange(changeLan.value)}>
            {t("CHANGE")}
          </Button>
          <Button className="btn lightBDR ml-1" onClick={() => props.setIsShow(!props.show)}>
            {t("CANCEL")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DefalutLanguageConformation