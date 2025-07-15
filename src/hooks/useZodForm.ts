import type { z } from "zod";
import type { UseFormProps } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type UseZodFormProps<TSchema extends z.ZodSchema, TContext = any> = Omit<
	UseFormProps<z.infer<TSchema>, TContext>,
	"resolver"
> & {
	schema: TSchema;
	schemaOptions?: Parameters<typeof zodResolver>[1];
	factoryOptions?: Parameters<typeof zodResolver>[2];
};

export function useZodForm<
	TSchema extends z.ZodSchema,
	TContext = any,
	TTransformedValues extends TSchema | undefined = undefined,
>({ schema, ...props }: UseZodFormProps<TSchema, TContext>) {
	const form = useForm<z.infer<TSchema>, TContext, TTransformedValues>({
		resolver: zodResolver(schema),
		...props,
	});

	return form;
}
