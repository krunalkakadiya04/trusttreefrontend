import { post } from ".";

const URI = "/brands/customer-feedback";

const getCustomerData = (payload) => {
  const URL = `${URI}/all-feedbacks`;
  return post(URL, payload);
};

const getcustomerFeedbackData = (payload) => {
  const URL = `${URI}/customer-feedback-data`;
  return post(URL, payload);
};

const Customer = {
  getCustomerData,
  getcustomerFeedbackData,
};
export default Customer;
