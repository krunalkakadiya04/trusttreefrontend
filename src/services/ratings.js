import { get, post } from ".";

const URI = "/brands/ratings";

const getRatings = (select_id) => {
  const URL = `${URI}/rating-options/${select_id}`;
  return get(URL);
};

const addRatings = (payload, select_id) => {
  const URL = `${URI}/brand-rating-options/${select_id}`;
  return post(URL, payload);
};

const Ratings = {
  getRatings,
  addRatings,
};
export default Ratings;
