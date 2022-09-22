// ====================================================
// IMPORTS

import { API } from "../api/API";

// ====================================================
// Types

const SET_CONVERSION_RESULT = "SET_CONVERSION_RESULT";
const SET_CODES = "SET_CODES";

// ====================================================
// Initial state

let initialState = {
  conversionResult: {},
  codes: [],
};

// ====================================================
// Reducer

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONVERSION_RESULT: {
      return {
        ...state,
        conversionResult: action.payload,
      };
    }
    case SET_CODES: {
      return {
        ...state,
        codes: action.payload,
      };
    }

    default:
      return state;
  }
};

// ====================================================
// Action creators

export const convertSuccess = (payload) => ({
  type: SET_CONVERSION_RESULT,
  payload,
});
export const getCodesSuccess = (payload) => ({
  type: SET_CODES,
  payload,
});

// ====================================================
// Thunks

export const convertCurrency = (from, to) => {
  return (dispatch) => {
    API.convertCurrency(from, to)
      .then((data) => {
        dispatch(convertSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const getCodes = () => {
  return (dispatch) => {
    API.getCodes()
      .then((data) => {
        dispatch(getCodesSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
};

// ====================================================
// Exports

export default dataReducer;
