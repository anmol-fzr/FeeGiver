import { IRes } from ".";
import { StudentProfile, StudentProfileDetails } from "./auth";

type IResGetProfile = IRes<StudentProfile>;
type IResUpdateProfile = IRes<StudentProfileDetails>;

export type { IResGetProfile, IResUpdateProfile };
