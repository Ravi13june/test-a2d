import Axios from "axios";

const config = {
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
};

const axiosInstance = Axios.create(config);
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token');
  if (config.headers === undefined) {
    config.headers = {};
  }
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

// // set to for axios refresh token
// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response) {
//       if (err?.response?.status === 401) {
//         const refreshToken = localStorage.getItem("refreshToken");
//         try {
//           const tokenResponse = await axiosInstance.post("/refresh-token", {
//             refreshToken: refreshToken,
//           });
//           const { data: accessToken } = tokenResponse.data;
//           localStorage.setItem("token", accessToken);
//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//       return Promise.reject(err);
//     }
//   }
// );

export default axiosInstance;
