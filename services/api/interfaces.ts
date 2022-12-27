import { AxiosError, AxiosResponse } from 'axios';

//Return

export interface UseApiReturn {
  inProgress: boolean;
  apiGet: ApiBasic;
  apiPost: ApiWithBody;
  apiPut: ApiWithBody;
  apiPatch: ApiWithBody;
  apiDelete: ApiBasic;
}

type ApiBasic = <T>(args: ApiBasicArgs<T>) => Promise<T | void>;
type ApiWithBody = <T, K>(args: ApiWithBodyArgs<T, K>) => Promise<T | void>;

//Args

export type ApiWithBodyArgs<T, K> = {
  body?: K;
} & ApiBasicArgs<T>;

export interface ApiBasicArgs<T> {
  url: string;
  options?: Options;
  callbacks?: Callbacks<T>;
}

interface Options {
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

export interface Callbacks<T> {
  successCallback?: (response: T) => void;
  successMessage?: string;
  errorCallback?: (err: ApiError) => void;
  errorMessage?: string;
  offHandlerNotifications?: boolean;
}

//Response

export enum ApiResult {
  Error,
  Ok,
}

interface ApiPayload<T> {
  result: ApiResult;
  payload: T;
}

export type ApiResponse<T> = AxiosResponse<ApiPayload<T>>;

export type ApiError = AxiosError;
