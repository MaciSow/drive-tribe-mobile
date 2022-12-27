import { ApiBasicArgs, ApiError, ApiResponse, ApiWithBodyArgs, Callbacks } from './interfaces';
import axiosInstance from '../../config/axiosInstance';
import { errorNotification, successNotification } from '../notifications';

const onSuccess = <T>(res: ApiResponse<T>, callbacks?: Callbacks<T>): T => {
  if (callbacks) {
    const { successMessage, successCallback } = callbacks;
    if (typeof successCallback === 'function') {
      successCallback(res.data.payload);
    }
    if (typeof successMessage === 'string' && successMessage !== '') {
      successNotification(successMessage);
    }
  }

  return res.data.payload;
};

const onError = <T>(err: ApiError, callbacks?: Callbacks<T>) => {
  if (callbacks) {
    const { errorMessage, errorCallback } = callbacks;
    if (typeof errorCallback === 'function') {
      errorCallback(err);
    }
    if (typeof errorMessage === 'string' && errorMessage !== '') {
      errorNotification(errorMessage);
    }
  }

  // handleError(err, Boolean(callbacks?.offHandlerNotifications)); //todo add error handler
  throw err;
};

export const apiGet = <T>({ url, options, callbacks }: ApiBasicArgs<T>) =>
  axiosInstance
    .get<T, ApiResponse<T>>(url, options)
    .then((res) => onSuccess<T>(res, callbacks))
    .catch((err) => onError(err, callbacks));

export const apiPost = <T, K>({ url, body, options, callbacks }: ApiWithBodyArgs<T, K>) =>
  axiosInstance
    .post<T, ApiResponse<T>, K>(url, body, options)
    .then((res) => onSuccess<T>(res, callbacks))
    .catch((err) => onError(err, callbacks));

export const apiPut = <T, K>({ url, body, options, callbacks }: ApiWithBodyArgs<T, K>) =>
  axiosInstance
    .put<T, ApiResponse<T>, K>(url, body, options)
    .then((res) => onSuccess<T>(res, callbacks))
    .catch((err) => onError(err, callbacks));

export const apiPatch = <T, K>({ url, body, options, callbacks }: ApiWithBodyArgs<T, K>) =>
  axiosInstance
    .patch<T, ApiResponse<T>, K>(url, body, options)
    .then((res) => onSuccess<T>(res, callbacks))
    .catch((err) => onError(err, callbacks));

export const apiDelete = <T>({ url, options, callbacks }: ApiBasicArgs<T>) =>
  axiosInstance
    .delete<T, ApiResponse<T>>(url, options)
    .then((res) => onSuccess<T>(res, callbacks))
    .catch((err) => onError(err, callbacks));
