// ====================================================
// IMPORTS
import { getCodes } from "./dataReducer";
// ====================================================
// Types

const SET_INITIALIZED = "SET_INITIALIZED";

// ====================================================
// Initial state

let initialState = {
  initialized: false,
};

// ====================================================
// Reducer

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

// ====================================================
// Action creators

export const initializeSuccess = (payload) => ({
  type: SET_INITIALIZED,
  payload,
});

// ====================================================
// Thunks

export const initializeApp = () => {
  return (dispatch) =>
    new Promise((resolve) => {
      resolve(dispatch(initializeSuccess()));
    })
      .then(() => {
        return new Promise((resolve) => {
          resolve(dispatch(getCodes()));
        });
      })
      .catch((error) => {
        throw error;
      });
};

// ====================================================
// Exports

export default appReducer;
