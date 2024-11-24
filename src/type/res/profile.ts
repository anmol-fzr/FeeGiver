import { IRes } from ".";
import { StudentProfileDetails } from "./auth";

type IResGetProfile = IRes<{
	email: string;
	name: string;
	mobile: number;
	admissionNo: number;
	rollNo: number;
	batch: number;
}>;
type IResUpdateProfile = IRes<StudentProfileDetails>;

export type { IResGetProfile, IResUpdateProfile };
