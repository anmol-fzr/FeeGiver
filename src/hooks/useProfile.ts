import { API } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
	const data = useQuery({
		queryFn: API.PROFILE.GET,
		queryKey: ["PROFILE"],
		refetchOnWindowFocus: false,
	});
	return data;
};

export { useProfile };
