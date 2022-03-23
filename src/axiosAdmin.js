import Axios from "axios"; 
const configInterceptor = (API_URL) => {
  const axios = Axios.create({
    baseURL: API_URL,
    headers: {
      Accept:
        "application/json,application/x-www-form-urlencoded,text/plain,*/*",
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") || null;
      if (token) {
        config.headers["Authorization"] = token;
      } 
      return config;
    },
    (error) => { 
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => { 
      return res.data;
    },
    (error) => { 
      return Promise.reject(error);
    }
  );
  return axios;
};

export const axiosAdmin = configInterceptor(process.env.REACT_APP_API_BASE);
