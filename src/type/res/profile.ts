import { IRes } from ".";
import { StudentProfile, StudentProfileDetails } from "./auth";

type IResGetProfile = StudentProfile;
type IResUpdateProfile = IRes<StudentProfileDetails>;

export type { IResGetProfile, IResUpdateProfile };
