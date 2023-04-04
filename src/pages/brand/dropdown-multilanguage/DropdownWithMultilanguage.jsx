import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import minus from '../../../assets/images/minus.svg'
import right from '../../../assets/images/rightbtn.svg'

const DropdownWithMultilanguage = ({ changeLan, default_language, languageOptions, setFieldValue, language }) => {
  const { t } = useTranslation()

  const handleChange = (e) => {
    setFieldValue("language", e)
  }

  const showSelectedLanguageFormFiledStatus = () => {
    const selectedLanguageOption = languageOptions.find(o => o.key === language)
    if (selectedLanguageOption && selectedLanguageOption.isFormFilled) {
      return <img src={right} alt="right" />
    }
    return <img src={minus} alt="minus" />
  }

  const showSelectedLanguageFormFiledStatusForOptions = (e) => {
    const selectedLanguageOption = languageOptions.find(o => o.key === e)
    if (selectedLanguageOption && selectedLanguageOption.isFormFilled) {
      return <img src={right} alt="right" />
    }
    return <img src={minus} alt="minus" />
  }

  return (
    <Dropdown className='ellipsis'>
      <Dropdown.Toggle
        className="form-control"
      >
        <div className='d-flex justify-content-between w-100 align-items-center'>
          <div>
            {language &&
              showSelectedLanguageFormFiledStatus()
            }
            <span className='dropdown-value'>{changeLan ? t(changeLan.value) : t("SELECT_LANGUAGE")}</span>
            <span className="dropdown-defalut">{changeLan && changeLan.key === default_language && `-${t("DEFAULT")}`}</span>
          </div>
          <span className='dropdown-badge'>
            {languageOptions.filter(o => o.isFormFilled).length}
          </span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={'span'} value="" onClick={() => handleChange("")} disabled>{t("SELECT_LANGUAGE")}</Dropdown.Item>
        {languageOptions && languageOptions.map((o, index) => (
          <Dropdown.Item as={"span"} key={index} value={o.key} onClick={() => handleChange(o.key)}>
            {showSelectedLanguageFormFiledStatusForOptions(o.key)}
            <span>{t(o.value)}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownWithMultilanguage