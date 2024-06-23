import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const BillingInfoSchema = z
	.object({
		country: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		city: ZodValidatorSchema.alphabeticWithWhiteSpaces,
		street: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		zipCode: ZodValidatorSchema.zipCode,
	})
	.partial();
export type BillingInfoSchemaType = z.infer<typeof BillingInfoSchema>;
