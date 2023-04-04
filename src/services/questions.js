import { del, delPayload, get, post, put } from ".";

const URI = "/surveys";

const getQuestions = (select_id, payload) => {
  const URL = `${URI}/${select_id}`;
  return post(URL, payload);
};

const addQuestions = (payload, select_id) => {
  const URL = `${URI}/create-survey/${select_id}`;
  return post(URL, payload);
};

const getOneQuestionToUpdate = (payload, survey_Id) => {
  const URL = `${URI}/get-one-question/${survey_Id}`;
  return post(URL, payload);
};

const updateQuestions = (payload, survey_Id) => {
  const URL = `${URI}/edit-survey/${survey_Id}`;
  return put(URL, payload);
};

const deleteQuestions = (payload, survey_Id) => {
  const URL = `${URI}/${survey_Id}`;
  return delPayload(URL, payload);
};

const disableQuestion = (payload, survey_Id) => {
  const URL = `${URI}/enable-disable-question/${survey_Id}`;
  return delPayload(URL, payload);
};

const addQuestionCategory = (payload, b_id) => {
  const URL = `${URI}/add-product/${b_id}`;
  return post(URL, payload);
};

const getOneCategoryToUpdate = (selectId) => {
  const URL = `${URI}/get-single-product/${selectId}`;
  return get(URL);
};

const updateCategory = (payload, selectId) => {
  const URL = `${URI}/${selectId}`;
  return put(URL, payload);
};

const deleteCategory = (selectId) => {
  const URL = `${URI}/${selectId}`;
  return del(URL);
};

const updateSequence = (payload, survey_Id) => {
  const URL = `${URI}/update-sequence/${survey_Id}`;
  return put(URL, payload);
}


const Questions = {
  getQuestions,
  addQuestions,
  getOneQuestionToUpdate,
  updateQuestions,
  disableQuestion,
  deleteQuestions,
  addQuestionCategory,
  getOneCategoryToUpdate,
  updateCategory,
  deleteCategory,
  updateSequence
};
export default Questions;
