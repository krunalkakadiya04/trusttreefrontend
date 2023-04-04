import { del, get, post, postFormData, putFormData } from ".";

const URI = "/brands/staff-members";

const getStaffMembers = (payload, id) => {
  const URL = `${URI}/${id}`;
  return post(URL, payload);
};

const addStaffMember = (payload, b_id) => {
  const URL = `${URI}/create/${b_id}`;
  return postFormData(URL, payload);
};

const getOneStaffMemberToUpdate = (selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return get(URL);
};

const updateStaffMember = (payload, staff_Id) => {
  const URL = `${URI}/update/${staff_Id}`;
  return putFormData(URL, payload);
};

const deleteStaffMember = (staff_Id) => {
  const URL = `${URI}/delete/${staff_Id}`;
  return del(URL,);
};

const disableStaffMember = (userId) => {
  const URL = `${URI}/disable/${userId}`;
  return del(URL);
};


const StaffMembers = {
  getStaffMembers,
  addStaffMember,
  getOneStaffMemberToUpdate,
  updateStaffMember,
  deleteStaffMember,
  disableStaffMember
};
export default StaffMembers;
