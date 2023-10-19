import { AxiosResponse, AxiosError } from "axios";
// ResponseModel에 들어가는 <T>가 data의 type이 된다.
// TODO: 다양한 타입을 일반화
export interface ResponseModel<T> {
  data?: T | null;
  errorName?: string | null;
  errorMessage?: string | null;
  statusCode: number;
}

interface ErrorResponseModel {
  data?: null;
  errorName: string;
  errorMessage: string;
  statusCode: number;
  errorCode: number;
}

// export type AxiosResponseModel = AxiosResponse<ErrorResponseModel>;
// err.response.data.errorName;
export type AxiosErrorModel = AxiosError<ErrorResponseModel>;

// examples
//
// ResponseModel<TokenModel>
// {
//   data?: TokenModel;
//   error?: string;
//   statusCode: number;
// }

// ResponseModel<AuthUserModel>
// {
//   data?: AuthUserModel;
//   error?: string;
//   statusCode: number;
// }

// export type AxiosResponseModel<T> = AxiosResponse<ResponseModel<T>>;
// 원래 1번과 같이 사용해야 되는 것을 2번을 사용해도 동일한 효과
// 축약 효과
// 1. AxiosResponse<ResponseModel<AuthTokenModel>>
// 2. AxiosResponse<AuthTokenModel>
