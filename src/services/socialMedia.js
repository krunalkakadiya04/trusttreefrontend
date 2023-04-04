import { get, post } from ".";

const URI = "/brands/social-media";

const getSocialMedia = (select_id) => {
  const URL = `${URI}/${select_id}`;
  return get(URL);
};

const addSocialMedia = (payload, select_id) => {
  const URL = `${URI}/${select_id}`;
  return post(URL, payload);
};

const SocialMedia = {
  getSocialMedia,
  addSocialMedia,
};
export default SocialMedia;
