import { AxiosInstance, AxiosRequestConfig } from "axios";
import { SignState } from "@/store/sign/types";
import { sign } from "@/store/sign/index";

export function setInterceptors(instance: AxiosInstance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config: AxiosRequestConfig) {
      // Do something before request is sent
      // console.log(config);
      console.log(
        "(sign.state as SignState).token;",
        (sign.state as SignState).token
      );

      config.headers.Authorization = (sign.state as SignState).token;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
}