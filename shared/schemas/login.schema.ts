import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const LoginSchema = z.object({
	email: ZodValidatorSchema.email,
	password: ZodValidatorSchema.requiredNonEmptyString,
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
