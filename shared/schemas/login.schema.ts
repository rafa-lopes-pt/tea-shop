import z from "zod";
import { RegExpValidators } from "./regex-validators";

export const LoginSchema = z
	.object({
		email: z
			.string({ required_error: "Required" })
			.min(1, { message: "Required" })
			.regex(RegExpValidators.email, { message: "Invalid" }),

		password: z
			.string({ required_error: "Required" })
			.min(1, { message: "Required" }),
	})
	.required();

export type LoginSchemaType = z.infer<typeof LoginSchema>;
