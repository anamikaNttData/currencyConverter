// ====================================================
// IMPORTS
import axios from "axios";

// ====================================================
// Instance

const api = {
  key: "382d555418b3e5f66981fc03",
  base: "https://v6.exchangerate-api.com/v6",
};

// ====================================================
// Requests

export const API = {
  convertCurrency: (from, to) => {
    return axios
      .get(`${api.base}/${api.key}/pair/${from}/${to}`)
      .then((result) => result.data);
  },

  getCodes: () => {
    return axios
      .get(`${api.base}/${api.key}/codes`)
      .then((result) => result.data.supported_codes);
  },
};
