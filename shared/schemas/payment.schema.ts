import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const PaymentInfoSchema = z.object({
	cardHolderName: ZodValidatorSchema.requiredNonEmptyString,
	cc: ZodValidatorSchema.requiredNonEmptyString,
	expireDate: ZodValidatorSchema.requiredNonEmptyString,
	ccv: ZodValidatorSchema.requiredNonEmptyString,
	zipCode: ZodValidatorSchema.zipCode,
});
export type PaymentInfoSchemaType = z.infer<typeof PaymentInfoSchema>;
