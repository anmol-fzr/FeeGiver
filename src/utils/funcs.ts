import { create } from "zustand";
import { envs } from "./envs";

const guessCurrSem = (collegeYear: number) => {
	const currentDate = new Date();
	const month = currentDate.getMonth();
	const isEvenSemester = month >= 7 && month <= 11; // August to December
	const semesterNumber = collegeYear * 2 + (isEvenSemester ? 1 : 2);

	return semesterNumber;
};

const enOrdinalRules = new Intl.PluralRules("en-US", { type: "ordinal" });

const suffixes = new Map([
	["one", "st"],
	["two", "nd"],
	["few", "rd"],
	["other", "th"],
]);

const formatOrdinals = (n: number) => {
	const rule = enOrdinalRules.select(n);
	const suffix = suffixes.get(rule);
	return `${n}${suffix}`;
};

const formatCurrency = (n: number) => {
	const formatter = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	});
	return formatter.format(n);
};

function formatDateTime(dateTime: Date | string): string {
	return new Intl.DateTimeFormat("en-IN", {
		dateStyle: "full",
		timeStyle: "medium",
		timeZone: "Asia/Kolkata",
	})
		.format(new Date(dateTime))
		.toString();
}

const getRand = (a: number, b: number) =>
	Math.floor(Math.random() * (b - a + a) + a);

function registerStore(store: ReturnType<typeof create>, name: string) {
	if (
		typeof window !== "undefined" &&
		window.__REDUX_DEVTOOLS_EXTENSION__?.connect &&
		envs.isDev
	) {
		const connection = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect({
			name,
		});
		connection?.init(store.getState());
		store.subscribe((newState) => connection?.send(name, newState));
		//console.info(`${name} Registered & Subscribed in Redux DevTools 🔧`);
	}
}

export {
	guessCurrSem,
	formatOrdinals,
	formatCurrency,
	formatDateTime,
	getRand,
	registerStore,
};
