import StaffMembers from "../services/staffmembers";
import {
  addStaffMemberError,
  addStaffMemberRequest,
  addStaffMemberSuccess,
  deleteStaffMemberError,
  deleteStaffMemberRequest,
  deleteStaffMemberSuccess,
  disableStaffMemberError,
  disableStaffMemberRequest,
  disableStaffMemberSuccess,
  getOneStaffMemberToUpdateError,
  getOneStaffMemberToUpdateRequest,
  getOneStaffMemberToUpdateSuccess,
  getStaffMembersError,
  getStaffMembersRequest,
  getStaffMembersSuccess,
  updateStaffMemberError,
  updateStaffMemberRequest,
  updateStaffMemberSuccess,
} from "../slices/staffMembers.slice";

export function getStaffMembers(payload, id) {
  return (dispatch) => {
    dispatch(getStaffMembersRequest());
    StaffMembers.getStaffMembers(payload, id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getStaffMembersSuccess(data));
        } else {
          dispatch(getStaffMembersError(error));
        }
      })
      .catch((error) => {
        dispatch(getStaffMembersError(error));
      });
  };
}

export function addStaffMember(payload, b_id) {
  return (dispatch) => {
    dispatch(addStaffMemberRequest());
    StaffMembers.addStaffMember(payload, b_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addStaffMemberSuccess(message));
        } else {
          dispatch(addStaffMemberError(error));
        }
      })
      .catch((error) => {
        dispatch(addStaffMemberError(error));
      });
  };
}

export function getOneStaffMemberToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneStaffMemberToUpdateRequest());
    StaffMembers.getOneStaffMemberToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneStaffMemberToUpdateSuccess(data));
        } else {
          dispatch(getOneStaffMemberToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneStaffMemberToUpdateError(error));
      });
  };
}

export function updateStaffMember(payload, staff_Id) {
  return (dispatch) => {
    dispatch(updateStaffMemberRequest());
    StaffMembers.updateStaffMember(payload, staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateStaffMemberSuccess(message));
        } else {
          dispatch(updateStaffMemberError(error));
        }
      })
      .catch((error) => {
        dispatch(updateStaffMemberError(error));
      });
  };
}

export function deleteStaffMember(staff_Id) {
  return (dispatch) => {
    dispatch(deleteStaffMemberRequest());
    StaffMembers.deleteStaffMember(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteStaffMemberSuccess(message));
        } else {
          dispatch(deleteStaffMemberError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteStaffMemberError(error));
      });
  };
}

export function disableStaffMember(staffId) {
  return (dispatch) => {
    dispatch(disableStaffMemberRequest());
    StaffMembers.disableStaffMember(staffId)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableStaffMemberSuccess(message));
        } else {
          dispatch(disableStaffMemberError(error));
        }
      })
      .catch((error) => {
        dispatch(disableStaffMemberError(error));
      });
  };
}
