import axios from "axios";
import { ElMessage } from "element-plus";

const httpInstance = axios.create({
  baseURL: "https://restapi.amap.com",
  timeout: 5000,
});

// 添加请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
httpInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpInstance;
