import { Link, PageHeader } from "@/components";
import { TriangleAlert } from "lucide-react";

const NotFoundPage = () => (
  <div className="flex flex-col items-center gap-2">
    <TriangleAlert size={96} />
    <PageHeader title="Page Not Found" desc="Looks like you are lost" />
    <div className="mt-8">
      <Link to="/">Back to Home</Link>
    </div>
  </div>
);

export { NotFoundPage };
