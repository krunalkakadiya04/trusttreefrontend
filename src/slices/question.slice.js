import { createSlice, current } from "@reduxjs/toolkit";
import { QUESTIONS } from "./slice-names";

export const questionSlice = createSlice({
  name: QUESTIONS,
  initialState: {
    loading: false,
    questions: [],
    languages: null,
    message: "",
    error: "",

    saveLoading: false,
    saveMessage: null,
    saveError: null,

    updateLoading: false,
    singleQuestion: null,
    updateError: "",

    saveUpdateLoading: false,
    saveUpdateMessage: null,
    saveUpdateError: null,

    deleteLoading: false,
    deleteMessage: null,
    deleteError: null,

    disableLoading: false,
    disableMessage: null,
    disableError: null,

    categorySaveLoading: false,
    categorySaveMessage: null,
    categorySaveError: null,

    categoryUpdateLoading: false,
    singleCategory: null,
    categoryUpdateError: "",

    categorySaveUpdateLoading: true,
    categorySaveUpdateMessage: null,
    categorySaveUpdateError: null,

    categoryDeleteLoading: false,
    categoryDeleteMessage: null,
    categoryDeleteError: null,

    sequenceLoading: false,
    sequenceMessage: null,
    sequenceError: null,
    questionUpdateMessage: null
  },
  reducers: {
    getQuestionsRequest: (state) => {
      state.loading = true;
      state.error = "";
      state.saveMessage = null;
      state.deleteMessage = null;
      state.saveUpdateMessage = null;
      state.disableMessage = null;
      state.questionUpdateMessage = null;
    },
    getQuestionsSuccess: (state, action) => {
      state.loading = false;
      state.ratings = action.payload;
      const data = action.payload && action.payload.getSurvey &&
        action.payload.getSurvey.map((o) => {
          const questions = [...o.question];
          const questionObj = questions && questions.map((obj) => {
            // const cat = obj.category_options.map(p => p["colour"] = randomColor())
            return { isOpen: false, ...obj }
            // return { isOpen: false, category_options: cat, ...obj }
          })
          return { ...o, question: questionObj };
        });
      state.questions = data
      state.languages = action.payload.lang_det;
    },
    getQuestionsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    isOpenModalById: (state, action) => {
      const prevCatalogue = current(state.questions);
      state.questions = prevCatalogue.map((o) => {
        const arr = { ...o }
        const obj = o.question && o.question.map((obj) => {
          const newObj = { ...obj };
          if (obj._id === action.payload) {
            newObj.isOpen = !newObj.isOpen;
          }
          return newObj
        })
        arr.question = obj;
        return arr
      });
    },
    addQuestionsRequest: (state) => {
      state.saveLoading = true;
      state.saveError = null;
    },
    addQuestionsSuccess: (state, action) => {
      state.saveLoading = false;
      state.saveMessage = action.payload;
    },
    addQuestionsError: (state, action) => {
      state.saveLoading = false;
      state.saveError = action.payload;
      state.saveMessage = null;
    },
    getOneQuestionToUpdateRequest: (state) => {
      state.updateLoading = true;
      state.updateError = "";
      state.singleQuestion = null;
    },
    getOneQuestionToUpdateSuccess: (state, action) => {
      state.updateLoading = false;
      state.singleQuestion = action.payload;
    },
    getOneQuestionToUpdateError: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    updateQuestionsRequest: (state) => {
      state.saveUpdateLoading = true;
      state.saveUpdateMessage = null;
      state.saveUpdateError = null;
    },
    updateQuestionsSuccess: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateMessage = action.payload;
    },
    updateQuestionsError: (state, action) => {
      state.saveUpdateLoading = false;
      state.saveUpdateError = action.payload;
    },
    deleteQuestionsRequest: (state) => {
      state.deleteLoading = true;
      state.deleteMessage = null;
      state.deleteError = null;
    },
    deleteQuestionsSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteMessage = action.payload;
    },
    deleteQuestionsError: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
    disableQuestionRequest: (state) => {
      state.disableLoading = true;
      state.disableMessage = null;
      state.disableError = null;
    },
    disableQuestionSuccess: (state, action) => {
      state.disableLoading = false;
      state.disableMessage = action.payload;
    },
    disableQuestionError: (state, action) => {
      state.disableLoading = false;
      state.disableError = action.payload;
    },
    addQuestionCategoryRequest: (state) => {
      state.categorySaveLoading = true;
      state.categorySaveError = null;
    },
    addQuestionCategorySuccess: (state, action) => {
      state.categorySaveMessage = action.payload;
    },
    addQuestionCategoryError: (state, action) => {
      state.categorySaveLoading = false;
      state.categorySaveError = action.payload;
      state.categorySaveMessage = null;
    },
    getOneCategoryToUpdateRequest: (state) => {
      state.categoryUpdateLoading = true;
      state.categoryUpdateError = "";
      state.singleCategory = null;
    },
    getOneCategoryToUpdateSuccess: (state, action) => {
      state.categoryUpdateLoading = false;
      state.singleCategory = action.payload;
    },
    getOneCategoryToUpdateError: (state, action) => {
      state.categoryUpdateLoading = false;
      state.categoryUpdateError = action.payload;
    },
    updateCategoryRequest: (state) => {
      state.categorySaveUpdateLoading = true;
      state.categorySaveUpdateMessage = null;
      state.categorySaveUpdateError = null;
    },
    updateCategorySuccess: (state, action) => {
      state.categorySaveUpdateMessage = action.payload.message;
    },
    updateCategoryError: (state, action) => {
      state.categorySaveUpdateLoading = false;
      state.categorySaveUpdateError = action.payload;
    },
    deleteCategoryRequest: (state) => {
      state.categoryDeleteLoading = true;
      state.categoryDeleteMessage = null;
      state.categoryDeleteError = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.categoryDeleteLoading = false;
      state.categoryDeleteMessage = action.payload;
    },
    deleteCategoryError: (state, action) => {
      state.categoryDeleteLoading = false;
      state.categoryDeleteError = action.payload;
    },
    updateSequenceRequest: (state) => {
      state.sequenceLoading = true;
      state.sequenceMessage = null;
      state.sequenceError = null;
    },
    updateSequenceSuccess: (state, action) => {
      state.sequenceLoading = false;
      state.sequenceMessage = action.payload.message;
      const prevQuestions = current(state.questions);
      if (action.payload.payload && action.payload.payload.category_option_id) {
        state.questions = prevQuestions.map((o) => {
          const arr = { ...o }
          const obj = o.question && o.question.map((obj) => {
            const newObj = { ...obj }
            if (newObj._id === action.payload.payload.question_id) {
              newObj.category_option = action.payload.data
            }
            return newObj
          })
          arr.question = obj;
          return arr
        });
      } else {
        state.questionUpdateMessage = "Updated"
      }
    },
    updateSequenceError: (state, action) => {
      state.sequenceLoading = false;
      state.sequenceError = action.payload;
    },
    resetQuestionData: (state, action) => {
      state.singleQuestion = null
    }
  },
});

export const {
  getQuestionsRequest,
  getQuestionsSuccess,
  getQuestionsError,
  addQuestionsRequest,
  addQuestionsSuccess,
  addQuestionsError,
  isOpenModalById,
  getOneQuestionToUpdateRequest,
  getOneQuestionToUpdateSuccess,
  getOneQuestionToUpdateError,
  updateQuestionsRequest,
  updateQuestionsSuccess,
  updateQuestionsError,
  disableQuestionRequest,
  disableQuestionSuccess,
  disableQuestionError,
  deleteQuestionsRequest,
  deleteQuestionsSuccess,
  deleteQuestionsError,
  addQuestionCategoryRequest,
  addQuestionCategorySuccess,
  addQuestionCategoryError,
  getOneCategoryToUpdateRequest,
  getOneCategoryToUpdateSuccess,
  getOneCategoryToUpdateError,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryError,
  updateSequenceRequest,
  updateSequenceSuccess,
  updateSequenceError,
  resetQuestionData
} = questionSlice.actions;

export default questionSlice.reducer;
