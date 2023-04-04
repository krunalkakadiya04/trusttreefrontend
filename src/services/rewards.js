import { get, post } from ".";

const URI = "/brands/rewards";

const getRewards = (brand_id, exp_id) => {
  const URL = `${URI}/${brand_id}/${exp_id}`;
  return get(URL);
};

const addRewards = (payload, brand_id, exp_id) => {
  const URL = `${URI}/${brand_id}/${exp_id}`;
  return post(URL, payload);
};

const Rewards = {
  getRewards,
  addRewards,
};
export default Rewards;
