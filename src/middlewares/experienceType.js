import Experience from "../services/experienceType";
import {
  getExperienceTypeError,
  getExperienceTypeRequest,
  getExperienceTypeSuccess,
  addExperienceTypeError,
  addExperienceTypeRequest,
  addExperienceTypeSuccess,
  getOneExperienceTypeToUpdateRequest,
  getOneExperienceTypeToUpdateSuccess,
  getOneExperienceTypeToUpdateError,
  updateExperienceTypeRequest,
  updateExperienceTypeSuccess,
  updateExperienceTypeError,
  getExperienceTypeByBrandIdRequest,
  getExperienceTypeByBrandIdSuccess,
  getExperienceTypeByBrandIdError,
  addExperienceTypeByBrandIdRequest,
  addExperienceTypeByBrandIdSuccess,
  addExperienceTypeByBrandIdError,
  disableExperienceTypeRequest,
  disableExperienceTypeSuccess,
  disableExperienceTypeError,
  deleteExperienceTypeRequest,
  deleteExperienceTypeSuccess,
  deleteExperienceTypeError,
  getAllExperienceTypeRequest,
  getAllExperienceTypeSuccess,
  getAllExperienceTypeError,
} from "../slices/experienceType.slice";

export function getExperienceType(b_id) {
  return (dispatch) => {
    dispatch(getExperienceTypeRequest());
    Experience.getExperienceType(b_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getExperienceTypeSuccess(data));
        } else {
          dispatch(getExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(getExperienceTypeError(error));
      });
  };
}

export function getAllExperienceType() {
  return (dispatch) => {
    dispatch(getAllExperienceTypeRequest());
    Experience.getAllExperienceType()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getAllExperienceTypeSuccess(data));
        } else {
          dispatch(getAllExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(getExperienceTypeError(error));
      });
  };
}

export function addExperienceType(payload) {
  return (dispatch) => {
    dispatch(addExperienceTypeRequest());
    Experience.addExperienceType(payload)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addExperienceTypeSuccess(message));
        } else {
          dispatch(addExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(addExperienceTypeError(error));
      });
  };
}

export function getOneExperienceTypeToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneExperienceTypeToUpdateRequest());
    Experience.getOneExperienceTypeToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneExperienceTypeToUpdateSuccess(data));
        } else {
          dispatch(getOneExperienceTypeToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneExperienceTypeToUpdateError(error));
      });
  };
}

export function updateExperienceType(payload, experienceType_Id) {
  return (dispatch) => {
    dispatch(updateExperienceTypeRequest());
    Experience.updateExperienceType(payload, experienceType_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateExperienceTypeSuccess(message));
        } else {
          dispatch(updateExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(updateExperienceTypeError(error));
      });
  };
}

export function getExperienceTypeByBrandId(brand_id) {
  return (dispatch) => {
    dispatch(getExperienceTypeByBrandIdRequest());
    Experience.getExperienceTypeByBrandId(brand_id)
      .then((response) => {
        const { status, error, data } = response.data;
        if (status === 1) {
          dispatch(getExperienceTypeByBrandIdSuccess(data));
        } else {
          dispatch(getExperienceTypeByBrandIdError(error));
        }
      })
      .catch((error) => {
        dispatch(getExperienceTypeByBrandIdError(error));
      });
  };
}

export function addExperienceTypeByBrandId(payload, exp_id) {
  return (dispatch) => {
    dispatch(addExperienceTypeByBrandIdRequest());
    Experience.addExperienceTypeByBrandId(payload, exp_id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(addExperienceTypeByBrandIdSuccess(message));
        } else {
          dispatch(addExperienceTypeByBrandIdError(error));
        }
      })
      .catch((error) => {
        dispatch(addExperienceTypeByBrandIdError(error));
      });
  };
}

export function deleteExperienceType(exp_Id) {
  return (dispatch) => {
    dispatch(deleteExperienceTypeRequest());
    Experience.deleteExperienceType(exp_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteExperienceTypeSuccess(message));
        } else {
          dispatch(deleteExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteExperienceTypeError(error));
      });
  };
}

export function disableExperienceType(staffId) {
  return (dispatch) => {
    dispatch(disableExperienceTypeRequest());
    Experience.disableExperienceType(staffId)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableExperienceTypeSuccess(message));
        } else {
          dispatch(disableExperienceTypeError(error));
        }
      })
      .catch((error) => {
        dispatch(disableExperienceTypeError(error));
      });
  };
}
