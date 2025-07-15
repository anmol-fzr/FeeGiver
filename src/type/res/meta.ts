import { IRes } from ".";

type IFeeType = {
	label: string;
	value: string;
};

type IResGetFeeTypes = IRes<IFeeType[]>;

export type { IResGetFeeTypes };
