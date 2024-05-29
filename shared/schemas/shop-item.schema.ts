import z from "zod";
import ZodValidatorSchema from "./zod-validator-schema";

export const ShopItemSchema = z
	.object({
		image: ZodValidatorSchema.requiredNonEmptyString,
		name: ZodValidatorSchema.alphanumericWithWhiteSpaces,
		price: ZodValidatorSchema.price,
		text: z.array(ZodValidatorSchema.alphanumericWithWhiteSpaces),
	})
	.required();

export type ShopItemSchemaType = z.infer<typeof ShopItemSchema>;
