import Branches from "../services/branches";
import {
  addBranchError,
  addBranchRequest,
  addBranchSuccess,
  disableEnableBranchError,
  disableEnableBranchRequest,
  disableEnableBranchSuccess,
  getAllBranchesError,
  getAllBranchesRequest,
  getAllBranchesSuccess,
  getBranchesByBrandIdError,
  getBranchesByBrandIdRequest,
  getBranchesByBrandIdSuccess,
  getBranchGraphError,
  getBranchGraphRequest,
  getBranchGraphSuccess,
  getOneBranchToUpdateError,
  getOneBranchToUpdateRequest,
  getOneBranchToUpdateSuccess,
  updateBranchError,
  updateBranchRequest,
  updateBranchSuccess,
} from "../slices/branches.slice";
import {
  getBranchesListingError,
  getBranchesListingRequest,
  getBranchesListingSuccess,
} from "../slices/brands.slice";

export function getBranchesListing(payload) {
  const brand_id = payload.brand_id;
  return (dispatch) => {
    dispatch(getBranchesListingRequest());
    Branches.getBranchesListing(payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getBranchesListingSuccess({ data, brand_id }));
        } else {
          dispatch(getBranchesListingError(error));
        }
      })
      .catch((error) => {
        dispatch(getBranchesListingError(error));
      });
  };
}

export function addBranch(payload) {
  return (dispatch) => {
    dispatch(addBranchRequest());
    Branches.addBranch(payload)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addBranchSuccess(message));
        } else {
          dispatch(addBranchError(error));
        }
      })
      .catch((error) => {
        dispatch(addBranchError(error));
      });
  };
}

export function getOneBranchToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneBranchToUpdateRequest());
    Branches.getOneBranchToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneBranchToUpdateSuccess(data));
        } else {
          dispatch(getOneBranchToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneBranchToUpdateError(error));
      });
  };
}

export function getBranchesByBrandId(brand_id) {
  return (dispatch) => {
    dispatch(getBranchesByBrandIdRequest());
    Branches.getBranchesByBrandId(brand_id)
      .then((response) => {
        const { status, error, data } = response.data;
        if (status === 1) {
          dispatch(getBranchesByBrandIdSuccess(data));
        } else {
          dispatch(getBranchesByBrandIdError(error));
        }
      })
      .catch((error) => {
        dispatch(getBranchesByBrandIdError(error));
      });
  };
}

export function updateBranch(payload, brand_id) {
  return (dispatch) => {
    dispatch(updateBranchRequest());
    Branches.updateBranch(payload, brand_id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(updateBranchSuccess(message));
        } else {
          dispatch(updateBranchError(error));
        }
      })
      .catch((error) => {
        dispatch(updateBranchError(error));
      });
  };
}

export function getBranchGraphByBranchID(branch_id, payload) {
  return (dispatch) => {
    dispatch(getBranchGraphRequest());
    Branches.getBranchGraph(branch_id, payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getBranchGraphSuccess(data));
        } else {
          dispatch(getBranchGraphError(error));
        }
      })
      .catch((error) => {
        dispatch(updateBranchError(error));
      });
  };
}

export function disableEnableBranch(br_id) {
  return (dispatch) => {
    dispatch(disableEnableBranchRequest());
    Branches.disEnableBranchByID(br_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(disableEnableBranchSuccess(message));
        } else {
          dispatch(disableEnableBranchError(error));
        }
      })
      .catch((error) => {
        dispatch(disableEnableBranchError(error));
      });
  };
}

export function getAllBranches() {
  return (dispatch) => {
    dispatch(getAllBranchesRequest());
    Branches.getAllBranches()
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getAllBranchesSuccess(data));
        } else {
          dispatch(getAllBranchesError(error));
        }
      })
      .catch((error) => {
        dispatch(getAllBranchesError(error));
      });
  };
}
