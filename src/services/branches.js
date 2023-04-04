import { del, get, post, put } from ".";

const URI = "/brands/branches";

const getBranchesListing = (payload) => {
  const URL = `${URI}/filter`;
  return post(URL, payload);
};

const addBranch = (payload) => {
  const URL = `${URI}`;
  return post(URL, payload);
};

const getOneBranchToUpdate = (selectId) => {
  const URL = `${URI}/update/${selectId}`;
  return get(URL);
};

const updateBranch = (payload, brand_id) => {
  const URL = `${URI}/update/${brand_id}`;
  return put(URL, payload);
};

const getBranchesByBrandId = (brand_id) => {
  const URL = `${URI}/brand/${brand_id}`;
  return get(URL);
};

const getBranchGraph = (branch_id, payload) => {
  const URL = `${URI}/chart/${branch_id}`;
  return post(URL, payload);
};

const disEnableBranchByID = (br_id) => {
  const URL = `${URI}/disable-enable/${br_id}`;
  return del(URL);
};

const getAllBranches = () => {
  const URL = `${URI}`;
  return get(URL);
};

const Branches = {
  getBranchesListing,
  addBranch,
  getBranchGraph,
  getOneBranchToUpdate,
  updateBranch,
  getBranchesByBrandId,
  disEnableBranchByID,
  getAllBranches,
};
export default Branches;
