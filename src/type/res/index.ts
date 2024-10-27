import { AxiosError } from "axios";

interface IRes<Data> {
  data: Data;
  message: string;
  success: boolean;
}

type ITimeStamps = {
  createdAt: string;
  updatedAt: string;
};

type ServerError = AxiosError<IRes<never>>;

export type { IRes, ITimeStamps, ServerError };

export * from "./auth";
export * from "./profile";
export * from "./fee";
