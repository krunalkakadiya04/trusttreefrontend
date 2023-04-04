import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import AllImages from "./AllImages";
import BackArrow from "./BackArrow";
import ProgressiveBar from "./ProgressiveBar";

const SpecificRating = ({
  previewData,
  type,
  object,
  questionClick,
  show,
  setIsShow,
}) => {
  const { buttonColor, buttonTextColor, previewLanguage } = useSelector(
    (state) => state.feedbacks
  );
  const { t } = useTranslation();
  const findQuestion = previewData?.question?.find((o) => o.type === type);

  const handleClick = () => {
    questionClick();
    setIsShow(!show);
  };

  const handleRateMoreClick = () => {
    setIsShow(!show);
  };

  return (
    <>
      <BackArrow
        previewData={previewData}
        backClick={() => handleRateMoreClick()}
      />
      <ProgressiveBar />
      <div className="specificRating">
        <p>{findQuestion?.name?.[previewLanguage]}</p>
        <ul className="mx-2 mb-2">
          <li>
            {type === "staff" ? (
              previewData.staff_members &&
              previewData.staff_members.length > 0 &&
              previewData.staff_members.map((staff, i) => {
                return (
                  <div key={i}>
                    {staff._id === object._id ? (
                      staff.profile_pic || !staff.profile_pic ? (
                        <div>
                          <AllImages logo={staff.profile_pic} id={staff._id} />
                          <p>
                            {staff.name[previewLanguage]
                              ? staff.name[previewLanguage]
                              : staff.name[t("en")]}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <AllImages logo={staff.profile_pic} id={staff._id} />
                          <p>
                            {staff.name[previewLanguage]
                              ? staff.name[previewLanguage]
                              : staff.name[t("en")]}
                          </p>
                        </div>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            ) : type === "product" ? (
              previewData.product_category &&
              previewData.product_category.length > 0 &&
              previewData.product_category.map((data) => {
                return data.products.map((product, i) => {
                  return (
                    <div key={i}>
                      {product._id === object._id ? (
                        product.logo === null ? (
                          <div>
                            <AllImages logo={product.logo} id={product._id} />
                            <p>
                              {product.name[previewLanguage]
                                ? product.name[previewLanguage]
                                : product.name[t("en")]}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <AllImages logo={product.logo} id={product._id} />
                            <p>
                              {product.name[previewLanguage]
                                ? product.name[previewLanguage]
                                : product.name[t("en")]}
                            </p>
                          </div>
                        )
                      ) : null}
                    </div>
                  );
                });
              })
            ) : type === "service" ? (
              previewData.service_category &&
              previewData.service_category.length > 0 &&
              previewData.service_category.map((data, i) => {
                return data.services.map((service, i) => {
                  return (
                    <div key={i}>
                      {service._id === object._id ? (
                        service.image === null ? (
                          <div>
                            <AllImages logo={service.image} id={service._id} />
                            <p>
                              {service.name[previewLanguage]
                                ? service.name[previewLanguage]
                                : service.name[t("en")]}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <AllImages logo={service.image} id={service._id} />
                            <p>
                              {service.name[previewLanguage]
                                ? service.name[previewLanguage]
                                : service.name[t("en")]}
                            </p>
                          </div>
                        )
                      ) : null}
                    </div>
                  );
                });
              })
            ) : (
              <>Data Not Found</>
            )}
          </li>
          <li>
            <StarRatings rating={0} />
          </li>
        </ul>
        <div className="paddingTextarea">
          <textarea
            className="mob_input-textarea form-control"
            as="textarea"
            rows={8}
            placeholder={t("SHARE_YOUR_OPINION")}
            disabled
          />
        </div>
        <div className="Nestbtn mt-5">
          <Button
            type="button"
            className="btn btn-primary mb-2 mob_Btn"
            style={{
              backgroundColor: buttonColor
                ? buttonColor
                : previewData?.brand_design?.button_colour,
              color: buttonTextColor
                ? buttonTextColor
                : previewData?.brand_design?.button_text_colour,
              borderColor: buttonColor
                ? buttonColor
                : previewData?.brand_design?.button_colour,
            }}
            onClick={() => handleClick()}
          >
            {t("NEXT")}
          </Button>
          <div>
            {findQuestion && findQuestion.choice === "multiple" && (
              <Button
                className="btn mob_Btn hoverRateBtn"
                style={{
                  background: "transparent",
                  color: "black",
                }}
                onClick={() => handleRateMoreClick()}
              >
                {t("RATE_ONE_MORE")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecificRating;
