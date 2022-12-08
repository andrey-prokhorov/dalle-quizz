/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequestType {
  url: string;
  baseURL?: string;
  apiVersion?: string;
  fullUrl?: string;
  initiated: any;
  fulfilled: any;
  rejected: any;
  aborted?: any;
  body?: object | boolean;
  _fetch?: any;
  queryParams?: URLSearchParams;
  isBlob?: boolean;
  fileName?: string;
  multipart?: boolean;
}

export interface IFetchRequestType {
  url?: string;
  baseURL?: string;
  id_token?: string;
  method?: string;
  fullURL?: string;
  body?: object | boolean | string;
  fullUrl?: string;
  queryParams?: unknown;
  isBlob?: boolean;
  fileName?: string;
  multipart?: boolean;
  apiVersion?: string;
  _fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
