import React from 'react'
import { useTranslation } from 'react-i18next'

const UnAuthorized = () => {
  const { t } = useTranslation()
  return (
    <div className='unauthorized-page'>
      <h3>
        {t("YOU_DONT_HAVE_PERMISSION_TO_VIEW_THIS_PAGE")}
      </h3>
    </div>
  )
}

export default UnAuthorized