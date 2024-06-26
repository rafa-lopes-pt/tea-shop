import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";
import { BillingInfoSchema } from "./billing-info.schema";
import { SignupSchema } from "./signup.schema";
export const UserSchema = SignupSchema.omit({ password: true }).merge(
	z
		.object({
			//FIX: image probably should be validated like this...
			image: ZodValidatorSchema.requiredNonEmptyString.optional(),
			notifyByEmail: ZodValidatorSchema.boolean,
			notifyBySms: ZodValidatorSchema.boolean,
		})
		.merge(BillingInfoSchema)
);
export type UserSchemaType = z.infer<typeof UserSchema>;
