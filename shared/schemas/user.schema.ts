import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const UserSchema = z.object({
	//FIX: image probably should be validated like this...
	image: ZodValidatorSchema.requiredNonEmptyString,
	email: ZodValidatorSchema.email,
	name: ZodValidatorSchema.alphabeticOnly,
	notifyByEmail: ZodValidatorSchema.bool,
	notifyBySms: ZodValidatorSchema.bool,
	billingInfo: z.object({
		country: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		city: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		street: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		zipCode: ZodValidatorSchema.zipCode,
	}),
});
export type UserSchemaType = z.infer<typeof UserSchema>;
