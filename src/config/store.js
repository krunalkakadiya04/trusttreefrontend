import authSlice from "../slices/auth.slice";
import branchesSlice from "../slices/branches.slice";
import brandSlice from "../slices/brands.slice";
import experienceTypeSlice from "../slices/experienceType.slice";
import ratingSlice from "../slices/ratings.slice";
import socialMediaSlice from "../slices/socialMedia.slice";
import staffMembersSlice from "../slices/staffMembers.slice";
import rewardsSlice from "../slices/rewards.slice";
import usersSlice from "../slices/users.slice";
import designSlice from "../slices/brandDesign.slice";
import productCatalogueSlice from "../slices/productCatalogue.slice";
import serviceCatalogueSlice from "../slices/services.slice";
import questionSlice from "../slices/question.slice";
import catalogueSlice from "../slices/catalogue.slice";
import feedbackSlice from "../slices/feedbacks";
import customerSlice from "../slices/customer.slice";

const { configureStore } = require("@reduxjs/toolkit");
const { ENV_PRODUCTION, ENV_DEVELOPMENT } = require("./constants");

function configStore() {
  const currentEnv = process.env.REACT_APP_ENV || ENV_DEVELOPMENT;
  const store = configureStore({
    reducer: {
      auth: authSlice,
      user: usersSlice,
      brand: brandSlice,
      branch: branchesSlice,
      experience: experienceTypeSlice,
      staff: staffMembersSlice,
      social: socialMediaSlice,
      ratings: ratingSlice,
      rewards: rewardsSlice,
      design: designSlice,
      product: productCatalogueSlice,
      service: serviceCatalogueSlice,
      questions: questionSlice,
      catalogue: catalogueSlice,
      feedbacks: feedbackSlice,
      customer: customerSlice
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: currentEnv !== ENV_PRODUCTION,
  });
  return store;
}

export default configStore;
