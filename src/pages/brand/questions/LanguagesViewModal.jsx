import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const LanguagesViewModal = ({ show, setIsShow, data }) => {
  const { t } = useTranslation()
  const { languages } = useSelector((state) => state.questions)
  const { AllLanguages } = useSelector((state) => state.brand)

  const dataArray = Object.keys(data)
  var remainingLangauge = languages && languages.languages && languages.languages.length > 0
    && languages.languages.filter(function (obj) { return dataArray.indexOf(obj) === -1; });

  const languageLable = (o) => {
    const newObj = AllLanguages && AllLanguages.find((obj) => { return obj.key === o })
    return newObj.value
  }

  return (
    <Modal show={show} className="modalImprove">
      <Modal.Header>
        <Modal.Title className="cust-title">
          {t("VIEW_CATEGORY_LANGUAGES")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="languageInner-modal">
          {dataArray && dataArray.map((obj, i) => (
            <li className="d-flex mb-2" key={i}>
              <p >{languageLable(obj)}: <span className={data && data[obj] ? "" : "color-grey"}>
                {data && data[obj] ? data[obj] : `${t("NOT_AVAILABLE_IN")} ${t(languageLable(obj))}`}
              </span>
              </p>
            </li>
          ))}
          {remainingLangauge && remainingLangauge.length > 0 && remainingLangauge.map((o, i) => (
            <li className="d-flex mb-2" key={i}>
              <p >{languageLable(o)}: <span className={data && data[o] ? "" : "color-grey"}>
                {data && data[o] ? data[o] : `${t("NOT_AVAILABLE_IN")} ${t(languageLable(o))}`}
              </span>
              </p>
            </li>
          ))}
        </ul>
        <div className="Experience-btn-modal flex justify-content-center">
          <Button
            className="send-modal"
            onClick={() => setIsShow(!show)}
          >
            {t("CLOSE")}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LanguagesViewModal