import type { IRes } from "@/type/res";

type Root =
  | ({
      isProfileComplete: true;
      token: string;
      email: string;
    } & StudentProfile)
  | {
      isProfileComplete: false;
      email: string;
      token: string;
    };

interface StudentProfile {
  _id: string;
  email: string;
  avatar: string;
  isVerified: boolean;
  details: Details;
}

interface Details {
  name: string;
  mobile: number;
  admissionNo: number;
  rollNo: number;
  batch: number;
}

type IResLogin = IRes<Root>;
type IResSignUp = IRes<{ token: string }>;
type IResOnBoard = IRes<Details>;

export type { IResLogin, IResOnBoard, IResSignUp };
export type { StudentProfile, Details as StudentProfileDetails };
