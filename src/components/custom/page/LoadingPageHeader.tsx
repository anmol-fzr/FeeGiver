import Skeleton from "react-loading-skeleton";

export function LoadingPageHeader() {
	return (
		<div className="space-y-0.5">
			<Skeleton className="animate-in fade-in text-3xl font-bold tracking-tight max-w-60" />
			<Skeleton className="text-muted-foreground max-w-80" />
		</div>
	);
}
