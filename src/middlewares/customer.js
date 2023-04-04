import Customer from "../services/customer";
import { getCustomerDataError, getCustomerDataRequest, getCustomerDataSuccess, getcustomerFeedbackDataError, getcustomerFeedbackDataRequest, getcustomerFeedbackDataSuccess } from "../slices/customer.slice";

export function getCustomerData(brand_id) {
  return (dispatch) => {
    dispatch(getCustomerDataRequest());
    Customer.getCustomerData(brand_id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getCustomerDataSuccess(data));
        } else {
          dispatch(getCustomerDataError(error));
        }
      })
      .catch((error) => {
        dispatch(getCustomerDataError(error));
      });
  };
}

export function getcustomerFeedbackData(payload) {
  return (dispatch) => {
    dispatch(getcustomerFeedbackDataRequest());
    Customer.getcustomerFeedbackData(payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getcustomerFeedbackDataSuccess(data));
        } else {
          dispatch(getcustomerFeedbackDataError(error));
        }
      })
      .catch((error) => {
        dispatch(getcustomerFeedbackDataError(error));
      });
  };
}