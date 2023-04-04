import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import expImg from "../../../assets/images/exp-img.png";
import { useDispatch, useSelector } from "react-redux";
import { getExperienceTypeByBrandId } from "../../../middlewares/experienceType";
import { getBranchesByBrandId } from "../../../middlewares/branches";
import "./qr.scss";
import QRCode from "qrcode.react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { genrateQr } from "../../../middlewares/feedbacks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCodePdf from "./QRCodePdf";
import trusTree from "../../../assets/images/new-logo.svg";
import trusTreeWhite from "../../../assets/images/logo.svg";
import men from "../../../assets/images/men_code.svg";
import chat from "../../../assets/images/chatCode.png";
import downArrow from "../../../assets/images/downArrow.svg";
import { getRewards } from "../../../middlewares/rewards";
import { setOffSet } from "../../../slices/rewards.slice";
import html2canvas from "html2canvas";
import IFrame from "../../../components/iFrame/IFrame";

const QrCodes = ({ selectBrand, brandDetails }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [expId, setExpId] = useState("");
  const [offset, setOffset] = useState(0);
  const [isUrl, setIsUrl] = useState("");
  const [isStickerUrl, setIsStickerUrl] = useState("");
  const [text, setText] = useState("");
  const [branchId, setbranchId] = useState("");
  const { experienceTypeData } = useSelector((state) => state.experience);
  const { branches } = useSelector((state) => state.branch);
  const { QrCodeData } = useSelector((state) => state.feedbacks);
  const { rewards } = useSelector((state) => state.rewards);

  // useEffect(() => {
  //   const jqueryScript = document.createElement("script");
  //   const arcTextScript = document.createElement("script");

  //   jqueryScript.id = "jQuery";
  //   jqueryScript.src = "../../../public/scripts/jquery.min.js";
  //   // jqueryScript.src = "%PUBLIC_URL%/scripts/jquery.min.js";

  //   arcTextScript.id = "jQuery-curve";
  //   arcTextScript.src = "../../../public/scripts/jquery.arctext.js";
  //   // arcTextScript.src = "../../scripts/jquery.arctext.js";
  //   document.body.append(jqueryScript);
  //   document.body.append(arcTextScript);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     if (
  //       document.getElementById("jQuery") &&
  //       document.getElementById("jQuery-curve")
  //     ) {
  //       document.getElementById("jQuery").remove();
  //       document.getElementById("jQuery-curve").remove();
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    dispatch(getExperienceTypeByBrandId(selectBrand));
    dispatch(getBranchesByBrandId(selectBrand));
    setbranchId("");
    setExpId("");
    setOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectBrand]);

  useEffect(() => {
    if (branchId && expId) {
      const payload = {
        branch_id: branchId,
        experience_type_id: expId,
      };
      dispatch(genrateQr(payload, selectBrand));
      dispatch(getRewards(selectBrand, expId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchId, expId]);

  useEffect(() => {
    if (
      rewards &&
      rewards.is_reward_on === true &&
      rewards.title &&
      rewards.experience_type_id === expId
    ) {
      setText(
        rewards.title[t("language")]
          ? rewards.title[t("language")]
          : rewards.title[t("en")]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rewards, expId]);

  useEffect(() => {
    if (text) {
      const textWidth =
        document.querySelector(".ok")?.textLength?.baseVal?.value;
      const calculatedOffset = (800 - textWidth) / 2 + 33;
      const val = Math.ceil(calculatedOffset);
      dispatch(setOffSet(val));
      window.$("#curved").arctext({ radius: 50, dir: -1 });
      document.querySelector("#pdf-canvas")?.remove();
      html2canvas(document.querySelector(".slide.selected"), {
        allowTaint: true,
        useCORS: true,
        logging: true,
      })
        .then(function (canvas) {
          canvas.style.display = "none";
          canvas.setAttribute("id", "pdf-canvas");
          document.body.appendChild(canvas);
          let png = canvas
            ?.toDataURL("image/pdf", 1.0)
            .replace("image/pdf", "image/octet-stream");
          setIsStickerUrl(png);
        })
        .catch((err) => console.log("err", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // useEffect(() => {
  //   if (offSet && text) {

  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [offSet]);

  const handleBranchChange = (e, name) => {
    if (name === "branches") {
      setbranchId(e);
    } else {
      setExpId(e);
    }
  };
  const branchName = branches && branches.find((o) => o._id === branchId);
  const expName =
    experienceTypeData && experienceTypeData.find((o) => o._id === expId);

  const copyFunction = () => {
    var copyText = document.getElementById("copyLink");
    navigator.clipboard.writeText(copyText.innerHTML);
  };

  useEffect(() => {
    if (QrCodeData && QrCodeData !== null) {
      const canvas = document.getElementById("qr-gen");
      const pngUrl = canvas
        ?.toDataURL("image/pdf")
        .replace("image/pdf", "image/octet-stream");
      setIsUrl(pngUrl);
    }
  }, [QrCodeData]);

  const branches_label =
    branches &&
    branches.find((obj) => {
      return obj._id === branchId;
    });

  const experience_label =
    experienceTypeData &&
    experienceTypeData.find((obj) => {
      return obj._id === expId;
    });

  const stickerChange = (i) => {
    document.querySelector("#pdf-canvas")?.remove();
    setTimeout(() => {
      html2canvas(document.querySelector(".slide.selected"), {
        allowTaint: true,
        useCORS: true,
        logging: true,
      })
        .then(function (canvas) {
          canvas.style.display = "none";
          canvas.setAttribute("id", "pdf-canvas");
          document.body.appendChild(canvas);
          let png = canvas
            ?.toDataURL("image/pdf", 1.0)
            .replace("image/pdf", "image/octet-stream");
          setIsStickerUrl(png);
        })
        .catch((err) => console.log("err", err));
    }, 0);
  };

  return (
    <div>
      <Form className="ratings-form">
        <div className="qr-select">
          <div className="d-flex link-qr-code">
            <Dropdown className="ellipsis">
              <Dropdown.Toggle className="form-control customSelect select-link-QR-code mb-3">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <span className="dropdown-value">
                    {branches_label ? branches_label.name : t("SELECT_BRANCH")}
                  </span>
                  <span>
                    <img src={downArrow} alt="downArrow" />
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={"span"} disabled>
                  {t("SELECT_BRANCH")}
                </Dropdown.Item>
                {branches &&
                  branches.map((o, i) => (
                    <Dropdown.Item
                      as={"span"}
                      key={i}
                      onClick={() => handleBranchChange(o._id, "branches")}
                    >
                      {o.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="ellipsis">
              <Dropdown.Toggle className="form-control mb-3 ms-2 customSelect select-link-QR-code">
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <span className="dropdown-value">
                    {experience_label
                      ? experience_label.title
                      : t("SELECT_EXPERIENCE_TYPE")}
                  </span>
                  <span>
                    <img src={downArrow} alt="downArrow" />
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={"span"} disabled>
                  {t("SELECT_EXPERIENCE_TYPE")}
                </Dropdown.Item>
                {experienceTypeData &&
                  experienceTypeData.map((o, i) => (
                    <Dropdown.Item
                      as={"span"}
                      key={i}
                      onClick={() =>
                        handleBranchChange(o._id, "experienceTypeData")
                      }
                    >
                      {o.title}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="flex brand-wpr">
            <div
              className="accordion brandAccordion"
              id="accordionExample"
              style={{ width: "70%" }}
            >
              {branchId && expId ? (
                <div>
                  <div className="container code-border">
                    <div className="row">
                      <div className="col-md-3 QR&bar-code">
                        <div className="QR-img">
                          {QrCodeData && QrCodeData !== null && (
                            <QRCode
                              id="qr-gen"
                              value={`${process.env.REACT_APP_FRONTEND_PANEL_URL}/${QrCodeData.brand_name}/${QrCodeData.code}`}
                            />
                          )}
                        </div>
                      </div>
                      <div className="col-md-9 QR-Code-Settlement">
                        <h5>
                          {t("QR_CODE")} {branchName && branchName.name} -{" "}
                          {expName && expName.title}
                        </h5>
                        <p>{t("YOU_CAN_DOWNLOAD_THE_QR_CODE")}</p>
                        <div className="QR-Btn">
                          {QrCodeData && QrCodeData !== null && (
                            <PDFDownloadLink
                              document={<QRCodePdf isUrl={isUrl} />}
                              fileName={`${branchId}&&${expId}.pdf`}
                            >
                              {({ loading }) => (
                                <>
                                  <Button disabled={loading ? true : false}>
                                    {loading
                                      ? t("LOAD_DOWNLOAD_LINK")
                                      : t("DOWNLOAD_QR_CODE")}
                                  </Button>
                                </>
                              )}
                            </PDFDownloadLink>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="survey-link ">
                      <label className="mb-2">{t("SURVEY_LINK")}</label>
                      <div className="QRcodeInput flex">
                        <div className="form-group exp-input">
                          {QrCodeData && QrCodeData !== null && (
                            <div
                              className="form-control input-box-profile"
                              id="copyLink"
                              style={{ overflow: "hidden" }}
                            >
                              {`${process.env.REACT_APP_FRONTEND_PANEL_URL}/${QrCodeData.brand_name}/${QrCodeData.code}`}
                            </div>
                          )}
                        </div>
                        <button
                          className=" btn btn-outline-primary  filter-btn"
                          type="button"
                          onClick={() => copyFunction()}
                        >
                          {t("COPY")}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Carousel
                      showThumbs={false}
                      autoPlay={false}
                      centerSlidePercentage={35}
                      centerMode={true}
                      showStatus={false}
                      showIndicators={false}
                      infiniteLoop={true}
                      onChange={(e) => {
                        stickerChange(e);
                      }}
                    >
                      <div className="circleBox " id="circleBox">
                        <ul>
                          <li>
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                          <h4 className="rateText" style={{ color: "#fff" }}>
                            {t("RATE_US")}
                          </h4>
                        </ul>

                        <div className="barCode">
                          {QrCodeData && QrCodeData !== null && (
                            <QRCode
                              // id="qr-gen"
                              value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                              size={500}
                              viewBox={`500 500 500 500`}
                            />
                          )}

                          <div className="logoBarcode">
                            <img src={trusTreeWhite} alt="barcodeLogo" />
                          </div>
                        </div>

                        <h6 id="curved" className="sliderText">
                          {/* {rewards?.title && (
                            <ReactCurvedText
                              width={250}
                              height={250}
                              cx={148}
                              cy={300}
                              rx={140}
                              ry={140}
                              startOffset={offSet}
                              reversed={false}
                              text={text}
                              textProps={{
                                style: {
                                  fontSize: 16,
                                  fill: "#fff",
                                  fontWeight: "bold",
                                },
                              }}
                              textPathProps={null}
                              tspanProps={{
                                dy: 4,
                                className: "ok",
                              }}
                              ellipseProps={null}
                              svgProps={{
                                className: "svg-text",
                                style: {
                                  transform: `rotate(86deg)`,
                                  position: "absolute",
                                  top: "-10px",
                                  left: "50%",
                                  overflow: "visible",
                                  height: "100%",
                                  width: "100%",
                                },
                              }}
                            />
                          )} */}
                          {text}
                        </h6>
                      </div>

                      <div className="whiteborderSquare ">
                        <ul>
                          <li>
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                          <h4 className="rateText" style={{ color: "#fff" }}>
                            {t("RATE_US")}
                          </h4>
                        </ul>
                        <div className="barCode">
                          {QrCodeData && QrCodeData !== null && (
                            <QRCode
                              // id="qr-gen"
                              value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                              size={500}
                              viewBox={`500 500 500 500`}
                            />
                          )}
                        </div>
                        <div className="barCodeFTR">
                          <h6
                            className="sliderText"
                            style={{ color: "#fff", fontSize: "10" }}
                          >
                            {text}
                          </h6>
                          <img
                            className="trustreeLogo"
                            src={trusTreeWhite}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="redborderSquare">
                        <ul>
                          <li>
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                          <h4 className="rateText" style={{ color: "red" }}>
                            {t("RATE_US")}
                          </h4>
                        </ul>
                        <div className="barCode">
                          {QrCodeData && QrCodeData !== null && (
                            <QRCode
                              // id="qr-gen"
                              value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                              size={500}
                              viewBox={`500 500 500 500`}
                            />
                          )}
                        </div>
                        <div className="barCodeFTR">
                          <h6 className="sliderText">{text}</h6>
                          <img className="trustreeLogo" src={trusTree} alt="" />
                        </div>
                      </div>

                      <div className="redborderSquare ">
                        <ul>
                          <li>
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                          <h4 className="rateText" style={{ color: "red" }}>
                            {t("RATE_US")}
                          </h4>
                          <h6 className="sliderText mt-2">{text}</h6>
                        </ul>
                        <div className="mens_QrCode">
                          <ul>
                            <li className="flex">
                              <div className="QrCode">
                                {QrCodeData && QrCodeData !== null && (
                                  <QRCode
                                    // id="qr-gen"
                                    value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                                    size={500}
                                    viewBox={`500 500 500 500`}
                                  />
                                )}
                                <img
                                  className="trustreeLogo"
                                  src={trusTree}
                                  alt=""
                                />{" "}
                              </div>
                              <div className="menChat">
                                <img src={men} alt="" />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="redborderSquare ">
                        <ul>
                          <li>
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                          <li
                            className="flex"
                            style={{
                              width: "180px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <h4 className="rateText"> {t("RATE_US")}</h4>
                            <img src={chat} alt="" style={{ width: "60px" }} />
                          </li>
                          <h6 className="sliderText">{text}</h6>
                        </ul>
                        <div className="chatboxQr">
                          <ul>
                            <li>
                              <div className="centerQrCode">
                                {QrCodeData && QrCodeData !== null && (
                                  <QRCode
                                    // id="qr-gen"
                                    value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                                    size={500}
                                    viewBox={`500 500 500 500`}
                                  />
                                )}
                                <img
                                  className="trustreeLogo mt-2"
                                  src={trusTree}
                                  alt=""
                                />{" "}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="rectangleBox">
                        <ul className="flex">
                          <li className="rectangleQrcode">
                            {QrCodeData && QrCodeData !== null && (
                              <QRCode
                                className="barCode"
                                // id="qr-gen"
                                value={`trustree.com/${QrCodeData.brand_name}/${QrCodeData.code}`}
                                size={500}
                                viewBox={`500 500 500 500`}
                              />
                            )}
                            <img
                              className="trustreeLogo"
                              src={trusTree}
                              alt=""
                            />{" "}
                          </li>
                          <li className="rect-Flex">
                            <div>
                              <h4 className="rateText" style={{ color: "red" }}>
                                {t("RATE_US")}
                              </h4>
                              <img src={chat} alt="" />
                            </div>
                            <div className="barCodeFTR">
                              <h6 className="sliderText">{text}</h6>
                            </div>
                          </li>
                          <li className="reactLogo__chickinWorx">
                            <img
                              src={
                                `${process.env.REACT_APP_BASE_URL}${brandDetails.logo}` ||
                                require("../../../assets/images/noProfile.webp")
                              }
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                              }}
                              alt="logo"
                            />
                          </li>
                        </ul>
                      </div>
                    </Carousel>
                    <div className="slider_btn">
                      <PDFDownloadLink
                        document={
                          <QRCodePdf
                            isUrl={isStickerUrl ? isStickerUrl : null}
                          />
                        }
                        fileName={`${branchId}&&${expId}B@r(()|)e$t|(|(er.pdf`}
                      >
                        {({ loading }) => (
                          <>
                            <Button disabled={loading ? true : false}>
                              {loading
                                ? t("LOAD_DOWNLOAD_LINK")
                                : t("DOWNLOAD_STICKER")}
                            </Button>
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="experience-wpr flex">
                  <div className="experience-inner">
                    <img src={expImg} alt="loadding" />
                    <p>{t("PLEASE_SELECT_BRANCH_AND_EXPERIENCE_TYPE")}</p>
                    <div className="exper-btn"></div>
                  </div>
                </div>
              )}
            </div>
            <div className="brand-mobile-phone" style={{ marginTop: "-95px" }}>
              <IFrame selectBrand={selectBrand} expId={expId} />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default QrCodes;
