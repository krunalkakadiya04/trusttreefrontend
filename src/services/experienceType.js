import { del, get, post, put } from ".";

const URI = "/brands/experience-type";

const getExperienceType = (id) => {
  const URL = `${URI}/${id}`;
  return get(URL);
};

const addExperienceType = (payload) => {
  const URL = `${URI}`;
  return post(URL, payload);
};

const getOneExperienceTypeToUpdate = (selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return get(URL);
};

const updateExperienceType = (payload, experienceType_Id) => {
  const URL = `${URI}/update/${experienceType_Id}`;
  return put(URL, payload);
};

const getExperienceTypeByBrandId = (brand_id) => {
  const URL = `${URI}/brand/${brand_id}`;
  return get(URL);
};

const addExperienceTypeByBrandId = (payload, exp_id) => {
  const URL = `${URI}/${exp_id}`;
  return post(URL, payload);
};

const deleteExperienceType = (exp_id) => {
  const URL = `${URI}/delete/${exp_id}`;
  return del(URL);
};

const disableExperienceType = (exp_id) => {
  const URL = `${URI}/${exp_id}`;
  return del(URL);
};

const getAllExperienceType = (exp_id) => {
  const URL = `${URI}`;
  return get(URL);
};

const Experience = {
  getExperienceType,
  addExperienceType,
  getOneExperienceTypeToUpdate,
  updateExperienceType,
  getExperienceTypeByBrandId,
  addExperienceTypeByBrandId,
  deleteExperienceType,
  disableExperienceType,
  getAllExperienceType,
};
export default Experience;
