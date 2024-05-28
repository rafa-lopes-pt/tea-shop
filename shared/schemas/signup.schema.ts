import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const SignupSchema = z
	.object({
		name: ZodValidatorSchema.alphabeticOnly,
		email: ZodValidatorSchema.email,
		password: ZodValidatorSchema.requiredNonEmptyString,
	})
	.required();

export type SignupSchemaType = z.infer<typeof SignupSchema>;
