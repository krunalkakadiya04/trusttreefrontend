import React, { useEffect, useRef, useState } from "react";
import "./questions.scss";
import { Dropdown, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ellipsis from "../../../assets/images/Ellipsis.svg";
import disableButton from "../../../assets/images/disable.svg";
import enableButton from "../../../assets/images/enable.svg";
import editButton from "../../../assets/images/brand-edit.svg";
import trash from "../../../assets/images/trash.svg";
import global from "../../../assets/images/global.svg";
import plus from "../../../assets/images/Plus.svg";
import expImg from "../../../assets/images/exp-img.png";
import circleDownArrow from "../../../assets/images/circleDownArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getExperienceTypeByBrandId } from "../../../middlewares/experienceType";
import QuestionsAddModal from "./QuestionsAddModal";
import {
  deleteQuestions,
  getQuestions,
  getOneQuestionToUpdate,
  disableQuestion,
  updateSequence,
} from "../../../middlewares/questions";
import { isOpenModalById } from "../../../slices/question.slice";
import randomColor from "randomcolor";
import CategoriesAddModal from "./CategoriesAddModal";
import LanguagesViewModal from "./LanguagesViewModal";
import DeleteModal from "../../../components/confirmation-modal/DeleteModal";
import QuestionOptionalModal from "./QuestionOptionalModal";
import QuestionRatingModal from "./QuestionRatingModal";
import DisableModal from "../../../components/confirmation-modal/DisableModal";
import downArrow from "../../../assets/images/downArrow.svg";
import { getIncomplateLanguage } from "../../../middlewares/brandDesign";
import messageQuestion from "../../../assets/images/message-question.svg";
import menu from "../../../assets/images/menu.svg";
import IFrame from "../../../components/iFrame/IFrame";

const Questions = ({ selectBrand }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragItemCategories = useRef();
  const dragOverItemCategories = useRef();
  const [expId, setExpId] = useState("");
  const [isLanguage, setIsLanguage] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOptionalModal, setIsOptionalModal] = useState(false);
  const [isRatingModal, setIsRatingModal] = useState(false);
  const [isLanguageModal, setIsLanguageModal] = useState(false);
  const [isNameForLanguage, setIsNameForLangauge] = useState();
  const [surveyId, setSurveyId] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isDisableModal, setIsDisableModal] = useState(false);
  const [deleteObj, setDeleteObj] = useState(null);
  const [deleteObjTitle, setDeleteObjTitle] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const { experienceTypeData } = useSelector((state) => state.experience);
  const {
    languages,
    questions,
    saveMessage,
    questionUpdateMessage,
    deleteMessage,
    deleteLoading,
    saveUpdateMessage,
    disableLoading,
    disableMessage,
  } = useSelector((state) => state.questions);
  const { userProfile } = useSelector((state) => state.user);
  const { AllLanguages } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getExperienceTypeByBrandId(selectBrand));
    dispatch(getIncomplateLanguage(selectBrand));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectBrand]);

  useEffect(() => {
    if (expId) {
      const payload = { ex_id: expId };
      dispatch(getQuestions(selectBrand, payload));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    expId,
    saveMessage,
    deleteMessage,
    saveUpdateMessage,
    disableMessage,
    questionUpdateMessage,
  ]);

  useEffect(() => {
    if (
      languages &&
      languages.languages &&
      languages.languages.length !== null
    ) {
      const selected_languages =
        languages.languages &&
        languages.languages.length > 0 &&
        languages.languages.map((o) => {
          const newId =
            AllLanguages &&
            AllLanguages.find((obj) => {
              return obj.key === o;
            });
          return newId;
        });
      setIsLanguage(selected_languages);
    } else {
      setIsLanguage([{ key: "en", value: "English" }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languages]);

  useEffect(() => {
    if (experienceTypeData && experienceTypeData.length > 0) {
      setExpId(experienceTypeData[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceTypeData]);

  const handleChange = (e) => {
    setExpId(e);
  };

  const handleToggle = (e) => {
    const payload = e.target.id;
    dispatch(isOpenModalById(payload));
  };

  const handleLanguageViewModalOpen = (e) => {
    setIsNameForLangauge(e);
    setIsLanguageModal(true);
  };

  const handleCategoryModalOpen = (e) => {
    setSurveyId(e.target.id);
    setIsOpenModal(true);
  };

  const handleQuestionModalOpen = () => {
    setSurveyId("");
    setIsEditMode(true);
  };

  const handleDeleteCategory = (e, id, title) => {
    setDeleteObj(e);
    setDeleteObjTitle(title);
    setIsDeleteModal(true);
    setDeleteQuestionId(id);
  };

  const handleDelete = (id) => {
    const survey_Id = questions && questions[0] && questions[0]._id;
    let payload = {};
    if (deleteObjTitle === "QUESTION") {
      payload.question_type = "question";
      payload.question_id = deleteQuestionId;
    } else {
      payload.question_type = "category_option";
      payload.question_id = deleteQuestionId;
      payload.category_option_id = id;
    }
    dispatch(deleteQuestions(payload, survey_Id));
  };

  const handleDisableCategory = (e, id, title) => {
    setDeleteObj(e);
    setDeleteObjTitle(title);
    setIsDisableModal(true);
    setDeleteQuestionId(id);
  };

  const handleDisable = (id) => {
    const survey_Id = questions && questions[0] && questions[0]._id;
    let payload = {};
    if (deleteObjTitle === "QUESTION") {
      payload.question_type = "question";
      payload.question_id = deleteQuestionId;
      if (deleteObj && deleteObj.is_disable) {
        payload.disable = false;
      } else {
        payload.disable = true;
      }
    } else {
      payload.question_type = "category_option";
      payload.question_id = deleteQuestionId;
      payload.category_option_id = id;
      if (deleteObj && deleteObj.is_disable) {
        payload.disable = false;
      } else {
        payload.disable = true;
      }
    }
    dispatch(disableQuestion(payload, survey_Id));
  };

  const handleUpdateQuestion = (e) => {
    const survey_Id = questions && questions[0] && questions[0]._id;
    const payload = {
      question_type: "question",
      question_id: e._id,
    };
    if (e.sequence < 3) {
      setIsOptionalModal(true);
    }
    if (e.sequence > 2 && e.deletable === false) {
      setIsRatingModal(true);
    }
    if (e.deletable === true) {
      setIsEditMode(true);
    }
    dispatch(getOneQuestionToUpdate(payload, survey_Id));
  };

  const handleUpdateQuestionCategories = (e, category) => {
    const survey_Id = questions && questions[0] && questions[0]._id;
    const payload = {
      question_type: "category_option",
      question_id: e._id,
      category_option_id: category._id,
    };
    dispatch(getOneQuestionToUpdate(payload, survey_Id));
    setSurveyId(e._id);
    setIsOpenModal(true);
  };

  const dragStart = (e, position) => {
    // e.dataTransfer.clearData()
    // e.dataTransfer.setData("number", e.target.id)
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // e.dataTransfer.effectAllowed = "move"
    // e.dataTransfer.dataTransfer = "move"
  };

  const dragStartCategories = (e, position) => {
    // e.dataTransfer.clearData()
    // e.dataTransfer.setData("number", e.target.id)
    dragItemCategories.current = position;
  };

  const dragEnterCategories = (e, position) => {
    dragOverItemCategories.current = position;
    // e.dataTransfer.effectAllowed = "move"
    // e.dataTransfer.dataTransfer = "move"
  };

  const drop = (e, title, Q_id) => {
    if (
      questions &&
      questions[0] &&
      questions[0].question &&
      questions[0].question
    ) {
      const survey_Id = questions && questions[0] && questions[0]._id;
      const payload = {};
      if (title === "Question") {
        payload.question_id = Q_id;
        if (dragOverItem.current > 5) {
          payload.new_sequence = dragOverItem.current;
        } else {
          payload.new_sequence = dragItem.current;
        }
        dragItem.current = null;
        dragOverItem.current = null;
      } else {
        payload.question_id = Q_id;
        payload.category_option_id = e.target.id;
        if (dragOverItemCategories.current > 0) {
          payload.new_sequence = dragOverItemCategories.current;
        } else {
          payload.new_sequence = dragItemCategories.current;
        }
      }
      dispatch(updateSequence(payload, survey_Id));
    }
  };

  const exp_id_label =
    experienceTypeData &&
    experienceTypeData.find((obj) => {
      return obj._id === expId;
    });

  return (
    <>
      <div>
        {experienceTypeData && experienceTypeData.length > 0 ? (
          <Form className="ratings-form">
            <div className="questionsWapper flex brand-wpr">
              <div className="question__inner">
                <div className="Questions">
                  <Dropdown className="ellipsis">
                    <Dropdown.Toggle className="form-control form-select mb-3">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        {exp_id_label && (
                          <span className="dropdown-value">
                            {t(exp_id_label.title)}
                          </span>
                        )}
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
                            value={o._id}
                            key={i}
                            onClick={() => handleChange(o._id, "exp_id")}
                          >
                            {o.title}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="accordion brandAccordion" id="accordionExample">
                  {questions &&
                    questions[0] &&
                    questions[0].question &&
                    questions[0].question.map((o, index) => (
                      <div
                        id={o._id}
                        className={`card ${
                          o.is_disable ? "disable-row " : ""
                        } ${o.isOpen ? "active" : ""}`}
                        key={index}
                        onDragOverCapture={(e) => e.preventDefault()}
                        onDragStart={(e) => dragStart(e, o.sequence)}
                        onDragEnter={(e) => dragEnter(e, o.sequence)}
                        onDragEnd={(e) => {
                          o.draggable
                            ? drop(e, "Question", o._id)
                            : e.preventDefault();
                        }}
                        draggable={o.draggable ? true : false}
                      >
                        <div className="card-header" id={o._id}>
                          <h2 className="mb-0">
                            <div
                              className="btn"
                              id={o._id}
                              onClick={(e) => index < 1 && handleToggle(e)}
                            >
                              <div className="brandTitle" id={o._id}>
                                {index <= 2 ? (
                                  <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        <li>{o.description}</li>
                                      </Tooltip>
                                    }
                                  >
                                    <li>
                                      <span id={o._id}>
                                        <img
                                          src={messageQuestion}
                                          alt="messageQuestion"
                                        />
                                      </span>
                                    </li>
                                  </OverlayTrigger>
                                ) : (
                                  <li
                                    className={`${o.draggable && "draggable"}`}
                                  >
                                    <span>
                                      <img src={menu} alt="menu" />
                                    </span>
                                  </li>
                                )}
                                <strong id={o._id}>
                                  {index + 1}.{" "}
                                  {o.name[t("language")]
                                    ? o.name[t("language")]
                                    : o.name[t("en")]}
                                </strong>
                                {index > 2 && o.deletable === false && (
                                  <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        {o.description}
                                      </Tooltip>
                                    }
                                  >
                                    <li>
                                      <span className="ms-2">
                                        <img
                                          src={messageQuestion}
                                          alt="messageQuestion"
                                        />
                                      </span>
                                    </li>
                                  </OverlayTrigger>
                                )}
                              </div>
                              <div className="brandIcons edit-exper  sidebar-dropdown user-dropdown">
                                {index > 0 ? (
                                  <>
                                    {userProfile &&
                                      userProfile.permission !== "viewer" && (
                                        <div className="overall__content">
                                          <ul className="content-flex">
                                            <li
                                              className="global__img"
                                              onClick={() =>
                                                handleLanguageViewModalOpen(
                                                  o.name
                                                )
                                              }
                                            >
                                              <img src={global} alt="Global" />
                                              <span
                                                className="m-0"
                                                style={{
                                                  fontSize: "16px",
                                                  color: "#164665",
                                                  fontWeight: "500",
                                                }}
                                              >
                                                {Object.keys(o.name).length}
                                              </span>
                                            </li>
                                            <li
                                              onClick={() =>
                                                handleDisableCategory(
                                                  o,
                                                  o._id,
                                                  "QUESTION"
                                                )
                                              }
                                            >
                                              {o.is_disable ? (
                                                <img
                                                  src={enableButton}
                                                  alt="enable"
                                                />
                                              ) : (
                                                <img
                                                  src={disableButton}
                                                  alt="disable"
                                                />
                                              )}
                                            </li>
                                            <Dropdown className="dis-dropdown">
                                              <Dropdown.Toggle>
                                                <img
                                                  src={ellipsis}
                                                  alt="loadding"
                                                />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu
                                                style={{ margin: 0 }}
                                              >
                                                <li className="exper-drop-ul-li">
                                                  <Dropdown.Item
                                                    id={o._id}
                                                    onClick={() =>
                                                      handleUpdateQuestion(o)
                                                    }
                                                  >
                                                    <img
                                                      src={editButton}
                                                      alt="edit"
                                                    />
                                                    {t("EDIT")}
                                                  </Dropdown.Item>
                                                </li>
                                                {o.deletable && (
                                                  <li>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleDeleteCategory(
                                                          o,
                                                          o._id,
                                                          "QUESTION"
                                                        )
                                                      }
                                                    >
                                                      <img
                                                        src={trash}
                                                        alt="trash"
                                                      />
                                                      <span className="del">
                                                        {t("DELETE")}
                                                      </span>
                                                    </Dropdown.Item>
                                                  </li>
                                                )}
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </ul>
                                        </div>
                                      )}
                                  </>
                                ) : (
                                  <span id={o._id}>
                                    {o.isOpen ? (
                                      <img
                                        className="upArrow"
                                        src={circleDownArrow}
                                        alt=""
                                        id={o._id}
                                      />
                                    ) : (
                                      <img
                                        src={circleDownArrow}
                                        alt=""
                                        id={o._id}
                                      />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </h2>
                        </div>
                        {o.isOpen && (
                          <div className="card-body">
                            <div className="brandTable mb-0">
                              <table
                                className="table"
                                style={{ marginBottom: "20px" }}
                              >
                                <tbody>
                                  {o.category_option &&
                                    o.category_option.length > 0 &&
                                    o.category_option[0] !== null &&
                                    o.category_option.map((obj, i) => (
                                      <tr
                                        id={obj._id}
                                        key={i}
                                        onDragOverCapture={(e) =>
                                          e.preventDefault()
                                        }
                                        onDragStart={(e) =>
                                          dragStartCategories(e, obj.sequence)
                                        }
                                        onDragEnter={(e) =>
                                          dragEnterCategories(e, obj.sequence)
                                        }
                                        onDragEnd={(e) => {
                                          obj.draggable
                                            ? drop(e, "Category_option", o._id)
                                            : e.preventDefault();
                                        }}
                                        draggable={obj.draggable ? true : false}
                                      >
                                        <td
                                          style={{
                                            padding: "10px 5px",
                                            width: "40px",
                                          }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          } ${obj.draggable && "draggable "}`}
                                        >
                                          <span>
                                            <img src={menu} alt="menu" />
                                          </span>
                                        </td>
                                        <td
                                          style={{
                                            width: "190px",
                                            padding: "10px 0",
                                          }}
                                          className={`overall-inner ${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        >
                                          <ul className="flex buffalo">
                                            <li
                                              className="buffalo-img small-box"
                                              style={{
                                                background: `${
                                                  obj.colour
                                                    ? obj.colour
                                                    : randomColor()
                                                }`,
                                              }}
                                            ></li>
                                            <li
                                              className="width"
                                              style={{ paddingLeft: "5px" }}
                                            >
                                              <p>
                                                {" "}
                                                {obj.name[t("language")]
                                                  ? obj.name[t("language")]
                                                  : obj.name[t("en")]}
                                              </p>
                                            </li>
                                          </ul>
                                        </td>
                                        <td
                                          style={{ padding: "10px 5px" }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        ></td>
                                        <td
                                          style={{ padding: "10px 5px" }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        ></td>
                                        <td
                                          style={{ padding: "10px 5px" }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        ></td>
                                        <td
                                          style={{ padding: "10px 5px" }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        ></td>
                                        <td
                                          style={{ padding: "10px 5px" }}
                                          className={`${
                                            obj.is_disable ? "disable-row " : ""
                                          }`}
                                        >
                                          <div className="overall__content">
                                            <div className="content-flex">
                                              <div
                                                className="global__img"
                                                onClick={() =>
                                                  handleLanguageViewModalOpen(
                                                    obj.name
                                                  )
                                                }
                                              >
                                                <img
                                                  src={global}
                                                  alt="Global"
                                                />
                                                <span
                                                  style={{
                                                    fontSize: "16px",
                                                    color: "#164665",
                                                    fontWeight: "500",
                                                  }}
                                                >
                                                  {Object.keys(obj.name).length}
                                                </span>
                                              </div>
                                              <div>
                                                {i > 0 && (
                                                  <div
                                                    onClick={() =>
                                                      handleDisableCategory(
                                                        obj,
                                                        o._id,
                                                        "QUESTION_CATEGORY"
                                                      )
                                                    }
                                                  >
                                                    {obj.is_disable ? (
                                                      <img
                                                        src={enableButton}
                                                        alt="enable"
                                                      />
                                                    ) : (
                                                      <img
                                                        src={disableButton}
                                                        alt="disable"
                                                      />
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <div className="edit-exper  sidebar-dropdown user-dropdown">
                                                <ul>
                                                  {i > 0 && (
                                                    <Dropdown className="dis-dropdown ">
                                                      <Dropdown.Toggle>
                                                        <img
                                                          src={ellipsis}
                                                          alt="loadding"
                                                        />
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu
                                                        style={{ margin: 0 }}
                                                      >
                                                        <li className="exper-drop-ul-li">
                                                          <Dropdown.Item
                                                            id={o._id}
                                                            onClick={(e) =>
                                                              handleUpdateQuestionCategories(
                                                                o,
                                                                obj
                                                              )
                                                            }
                                                          >
                                                            <img
                                                              src={editButton}
                                                              alt="edit"
                                                            />
                                                            {t("EDIT")}
                                                          </Dropdown.Item>
                                                        </li>
                                                        <li>
                                                          <Dropdown.Item
                                                            onClick={() =>
                                                              handleDeleteCategory(
                                                                obj,
                                                                o._id,
                                                                "QUESTION_CATEGORY"
                                                              )
                                                            }
                                                          >
                                                            <img
                                                              src={trash}
                                                              alt="trash"
                                                            />
                                                            <span className="del">
                                                              {t("DELETE")}
                                                            </span>
                                                          </Dropdown.Item>
                                                        </li>
                                                      </Dropdown.Menu>
                                                    </Dropdown>
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                              <div className="addBranch">
                                <button
                                  type="button"
                                  className="plainBTN"
                                  id={o._id}
                                  onClick={(e) => handleCategoryModalOpen(e)}
                                >
                                  <span id={o._id}>
                                    <img src={plus} alt="" id={o._id} />
                                  </span>
                                  <strong id={o._id}>
                                    {t("ADD_NEW_CATEGORY")}
                                  </strong>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div className="addBranch">
                    <button
                      type="button"
                      className="plainBTN"
                      onClick={() => handleQuestionModalOpen()}
                    >
                      <span>
                        <img src={plus} alt="" />
                      </span>
                      <strong>{t("ADD_NEW_QUESTIONS")}</strong>
                    </button>
                  </div>
                </div>
              </div>
              <div className="brand-mobile-phone">
                {expId && <IFrame selectBrand={selectBrand} expId={expId} />}
              </div>
            </div>
          </Form>
        ) : (
          <div className="experience-wpr flex">
            <div className="experience-inner">
              <img src={expImg} alt="loadding" />
              <p>{t("THERE_IS_NO_EXPERIENECE_TYPE_YET")}</p>
            </div>
          </div>
        )}
      </div>
      <QuestionsAddModal
        show={isEditMode}
        setIsShow={(flag) => setIsEditMode(flag)}
        lng={isLanguage}
        questionId={surveyId}
      />
      <CategoriesAddModal
        show={isOpenModal}
        setIsShow={(flag) => setIsOpenModal(flag)}
        lng={isLanguage}
        selectBrand={selectBrand}
        expId={expId}
        questionId={surveyId}
      />
      {isLanguageModal && (
        <LanguagesViewModal
          show={isLanguageModal}
          setIsShow={(flag) => setIsLanguageModal(flag)}
          data={isNameForLanguage}
        />
      )}
      {isDeleteModal && (
        <DeleteModal
          show={isDeleteModal}
          setIsShow={(flag) => setIsDeleteModal(flag)}
          name={deleteObj?.name}
          title={deleteObjTitle}
          click={() => handleDelete(deleteObj._id)}
          Loading={deleteLoading}
          Message={deleteMessage}
        />
      )}
      {isDisableModal && (
        <DisableModal
          show={isDisableModal}
          setIsShow={(flag) => setIsDisableModal(flag)}
          name={deleteObj?.name}
          objDisabled={deleteObj?.is_disable}
          title={deleteObjTitle}
          click={() => handleDisable(deleteObj._id)}
          Loading={disableLoading}
          Message={disableMessage}
        />
      )}
      {isOptionalModal && (
        <QuestionOptionalModal
          show={isOptionalModal}
          setIsShow={(flag) => setIsOptionalModal(flag)}
        />
      )}
      {isRatingModal && (
        <QuestionRatingModal
          show={isRatingModal}
          setIsShow={(flag) => setIsRatingModal(flag)}
        />
      )}
    </>
  );
};

export default Questions;
