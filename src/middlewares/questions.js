import Questions from "../services/questions";
import {
  getQuestionsError, getQuestionsRequest, getQuestionsSuccess,
  addQuestionsError, addQuestionsRequest, addQuestionsSuccess,
  getOneQuestionToUpdateError, getOneQuestionToUpdateRequest, getOneQuestionToUpdateSuccess,
  updateQuestionsError, updateQuestionsRequest, updateQuestionsSuccess,
  disableQuestionError, disableQuestionRequest, disableQuestionSuccess,
  deleteQuestionsError, deleteQuestionsRequest, deleteQuestionsSuccess,
  addQuestionCategoryError, addQuestionCategoryRequest, addQuestionCategorySuccess,
  getOneCategoryToUpdateRequest, getOneCategoryToUpdateSuccess, getOneCategoryToUpdateError,
  updateCategoryRequest, updateCategorySuccess, updateCategoryError,
  deleteCategoryRequest, deleteCategorySuccess, deleteCategoryError,
  updateSequenceRequest, updateSequenceSuccess, updateSequenceError,

} from "../slices/question.slice";


export function getQuestions(select_id, payload) {
  return (dispatch) => {
    dispatch(getQuestionsRequest());
    Questions.getQuestions(select_id, payload)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getQuestionsSuccess(data));
        } else {
          dispatch(getQuestionsError(error));
        }
      })
      .catch((error) => {
        dispatch(getQuestionsError(error));
      });
  };
}


export function addQuestions(payload, select_id) {
  return (dispatch) => {
    dispatch(addQuestionsRequest());
    Questions.addQuestions(payload, select_id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(addQuestionsSuccess(message));
        } else {
          dispatch(addQuestionsError(error));
        }
      })
      .catch((error) => {
        dispatch(addQuestionsError(error));
      });
  };
}

export function getOneQuestionToUpdate(payload, survey_Id) {
  return (dispatch) => {
    dispatch(getOneQuestionToUpdateRequest());
    Questions.getOneQuestionToUpdate(payload, survey_Id)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneQuestionToUpdateSuccess(data));
        } else {
          dispatch(getOneQuestionToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneQuestionToUpdateError(error));
      });
  };
}

export function updateQuestions(payload, survey_Id) {
  return (dispatch) => {
    dispatch(updateQuestionsRequest());
    Questions.updateQuestions(payload, survey_Id)
      .then((response) => {
        const { message, status, error } = response.data;
        if (status === 1) {
          dispatch(updateQuestionsSuccess(message));
        } else {
          dispatch(updateQuestionsError(error));
        }
      })
      .catch((error) => {
        dispatch(updateQuestionsError(error));
      });
  };
}

export function deleteQuestions(payload, survey_Id) {
  return (dispatch) => {
    dispatch(deleteQuestionsRequest());
    Questions.deleteQuestions(payload, survey_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteQuestionsSuccess(message));
        } else {
          dispatch(deleteQuestionsError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteQuestionsError(error));
      });
  };
}

export function disableQuestion(payload, survey_Id) {
  return (dispatch) => {
    dispatch(disableQuestionRequest());
    Questions.disableQuestion(payload, survey_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(disableQuestionSuccess(message));
        } else {
          dispatch(disableQuestionError(error));
        }
      })
      .catch((error) => {
        dispatch(disableQuestionError(error));
      });
  };
}

export function addQuestionCategory(payload, b_id) {
  return (dispatch) => {
    dispatch(addQuestionCategoryRequest());
    Questions.addQuestionCategory(payload, b_id)
      .then((response) => {
        const { message, status, error, data } = response.data;
        if (status === 1) {
          dispatch(addQuestionCategorySuccess({ message, data, b_id }));
        } else {
          dispatch(addQuestionCategoryError(error));
        }
      })
      .catch((error) => {
        dispatch(addQuestionCategoryError(error));
      });
  };
}

export function getOneCategoryToUpdate(selectId) {
  return (dispatch) => {
    dispatch(getOneCategoryToUpdateRequest());
    Questions.getOneCategoryToUpdate(selectId)
      .then((response) => {
        const { data, status, error } = response.data;
        if (status === 1) {
          dispatch(getOneCategoryToUpdateSuccess(data));
        } else {
          dispatch(getOneCategoryToUpdateError(error));
        }
      })
      .catch((error) => {
        dispatch(getOneCategoryToUpdateError(error));
      });
  };
}

export function updateCategory(payload, selectId, previousCatId) {
  return (dispatch) => {
    dispatch(updateCategoryRequest());
    Questions.updateCategory(payload, selectId)
      .then((response) => {
        const { message, status, error, data } = response.data;
        if (status === 1) {
          dispatch(updateCategorySuccess({ message, data, previousCatId }));
        } else {
          dispatch(updateCategoryError(error));
        }
      })
      .catch((error) => {
        dispatch(updateCategoryError(error));
      });
  };
}

export function deleteCategory(staff_Id) {
  return (dispatch) => {
    dispatch(deleteCategoryRequest());
    Questions.deleteCategory(staff_Id)
      .then((response) => {
        const { status, error, message } = response.data;
        if (status === 1) {
          dispatch(deleteCategorySuccess(message));
        } else {
          dispatch(deleteCategoryError(error));
        }
      })
      .catch((error) => {
        dispatch(deleteCategoryError(error));
      });
  };
}

export function updateSequence(payload, survey_Id) {
  return (dispatch) => {
    dispatch(updateSequenceRequest());
    Questions.updateSequence(payload, survey_Id)
      .then((response) => {
        const { status, error, message, data } = response.data;
        if (status === 1) {
          dispatch(updateSequenceSuccess({ message, payload, data }));
        } else {
          dispatch(updateSequenceError(error));
        }
      })
      .catch((error) => {
        dispatch(updateSequenceError(error));
      });
  };
}