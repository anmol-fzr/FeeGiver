import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, Link } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services";

const HomePage = () => {
  const { data } = useQuery({
    queryFn: API.PROFILE.GET,
    queryKey: ["PROFILE"],
    refetchOnWindowFocus: false,
  });

  const name = data?.data.details.name;

  return (
    <div className="w-full">
      <Alert
        variant="caution"
        className="w-full flex items-end justify-between gap-6 flex-wrap animate-in fade-in"
      >
        <div>
          <AlertTitle> 📢 Attention {name}!</AlertTitle>
          <AlertDescription>
            <p>
              The university is now accepting fee forms. Don’t miss out—fill out
              your form today!
            </p>
          </AlertDescription>
        </div>
        <Link to="/fee/add" variant="outline">
          Fill Now
        </Link>
      </Alert>
    </div>
  );
};

export { HomePage };
