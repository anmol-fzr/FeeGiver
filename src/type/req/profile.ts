import { stuOnboardSchema } from "@/schema";
import { z } from "zod";

type IReqCreateProfile = z.infer<typeof stuOnboardSchema>;
type IReqUpdateProfile = IReqCreateProfile;

export type { IReqCreateProfile, IReqUpdateProfile };
