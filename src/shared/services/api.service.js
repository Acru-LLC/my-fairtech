import Vue from 'vue'
import axios from "axios";
import { TokenService } from "./storage.service";
import store from "@/state/store";

// import UserService from "./user.service";

// FUNCTION FOR CHECKING IF STRING IS JSON PARSABLE
function isJson (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const ApiService = {
  // Stores the 401 interceptor position so that it can be later ejected when needed
  _401interceptor: null,
  _requestInterceptor: null,

  init (baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader () {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },

  removeHeader () {
    axios.defaults.headers.common = {};
  },

  all (resource, withLoader) {
    return axios.all(resource, { withLoader: withLoader });
  },

  spread (...args) {
    return axios.spread(...args);
  },

  get (resource, withLoader) {
    return axios.get(resource, { withLoader: withLoader });
  },

  post (resource, data, withLoader = false, config = {}) {
    return axios.post(resource, data, { withLoader: withLoader, ...config });
  },
  postFile (resource, data, withLoader = false) {
    return axios.post(resource, data, {
      responseType: "blob",
      withLoader: withLoader
    });
  },
  postFileProfile (resource, data, withLoader = false) {
    return axios.put(resource, data, {
      responseType: "blob",
      withLoader: withLoader
    });
  },
  getFile (resource, withLoader = false) {
    return axios.get(resource, {
      responseType: "blob",
      withLoader: withLoader
    });
  },
  formDataFile (resource, data, withLoader = false) {
    return axios.post(resource, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withLoader: withLoader
    });
  },
  formDataPut (resource, data) {
    return axios.put(resource, data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
  },
  put (resource, data, withLoader = false) {
    return axios.put(resource, data, { withLoader: withLoader });
  },

  delete (resource, withLoader = false) {
    return axios.delete(resource, { withLoader: withLoader });
  },

  /**
   * Perform a custom axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest (data) {
    return axios(data);
  },

  mount401Interceptor () {
    let requestCount = 0;
    let messages = [];
    this._401interceptor = axios.interceptors.response.use(
      response => {
        if (requestCount > 0)
          /* DECREMENT REQUEST COUNT */
          requestCount--;
        /* GLOBAL LOADING OVERLAY PART */
        if (requestCount === 0) {
          // CHECK IF THERE WERE ANY ERRORS
          if (messages.length > 0) {
            store.commit("SET_GLOBAL_SNACKBAR", messages);
            messages.forEach(msg => {
              Vue.$toast(msg.message, { type: msg.type })
            })
            messages = [];
          }

          store.commit("SET_GLOBAL_LOADING", false);
        }
        return response;
      },
      async error => {
        /* DECREMENT REQUEST COUNT */
        if (requestCount > 0)
          requestCount--;
        /* GLOBAL LOADING OVERLAY AND SHOWING ERROR MESSAGES PART */
        let alertPayload = {
          show: true,
          message: error.request.response
            ? (isJson(error.request.response)
              ? JSON.parse(error.request.response).message.substring(0, 120)
              : error.request.response)
            : `(${error.request.status}) - Something wrong, please try again`,
          description: error.request.response
            ? isJson(error.request.response)
              ? JSON.parse(error.request.response).details
              : error.request.response
            : [],
          type: "error"
        };
        /* ADD ERROR MESSAGE TO GLOBAL MESSAGES STATE */
        messages.push(alertPayload);
        if (requestCount === 0) {
          store.commit("SET_GLOBAL_LOADING", false);
          store.commit("SET_GLOBAL_SNACKBAR", messages);
          messages.forEach(msg => {
            if (error.request.status === 417) {
              Vue.$toast('Ushbu harakatni amalga oshirish uchun sizda ruxsat yo\'q', { type: msg.type });
            } else {
              Vue.$toast(msg.message, { type: msg.type })
            }
          })
          messages = [];
        }
        /* ------------------------------------------- */
        if (error.request) {
          if (error.request.status === 401) {
            store.dispatch("auth/logout");
          }
        }
        // If error was not 401 just reject as is
        throw error;
      }
    );
    this._requestInterceptor = axios.interceptors.request.use(
      function (config) {
        if (config.withLoader) {
          /* GLOBAL LOADING OVERLAY PART */
          store.commit("SET_GLOBAL_LOADING", true);
          /* INCREMENT REQUEST COUNT */
          requestCount++;
        }

        return config;
      },
      function (error) {
        if (requestCount > 0)
          /* DECREMENT REQUEST COUNT */
          requestCount--;
        return Promise.reject(error);
      }
    );
  },
  unmount401Interceptor () {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor);
    axios.interceptors.request.eject(this._requestInterceptor);
  },
  responseTypeBlob(url, withLoader) {
    return axios.get(url, {
      withLoader: withLoader,
      responseType: 'blob'
    });
  }
};

export default ApiService;
