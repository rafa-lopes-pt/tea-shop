import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";
import { LoginSchema } from "./login.schema";

export const SignupSchema = LoginSchema.merge(
	z
		.object({
			name: ZodValidatorSchema.alphabeticOnly,
		})
		.required()
);

export type SignupSchemaType = z.infer<typeof SignupSchema>;
