import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";
import { BillingInfoSchema } from "./billing-info.schema";
export const UserSchema = z.object({
	//FIX: image probably should be validated like this...
	image: ZodValidatorSchema.requiredNonEmptyString,
	email: ZodValidatorSchema.email,
	name: ZodValidatorSchema.alphabeticOnly,
	notifyByEmail: ZodValidatorSchema.boolean,
	notifyBySms: ZodValidatorSchema.boolean,
	billingInfo: BillingInfoSchema,
});
export type UserSchemaType = z.infer<typeof UserSchema>;
