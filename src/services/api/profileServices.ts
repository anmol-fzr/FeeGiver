import { axiosInst } from "@/config/axiosConfig";
import { IResGetProfile } from "@/type/res";

const PROFILE = {
  GET: () => axiosInst.get<IResGetProfile>(`/student`),
};

export { PROFILE };
